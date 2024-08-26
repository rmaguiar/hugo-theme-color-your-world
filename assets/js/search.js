const searchResults = document.querySelector('#search-results');

const windowLocation = window.location;

const pageNumberQueryName = 'p';


// Sanitize
function getUrlParameter(key) {
  const urlParams = new URLSearchParams(windowLocation.search);
  return urlParams.get(key);
}

// Page number query string
function getCurrentPageNumber() {
  // Make sure it's an integer or null
  let pageNumber = parseInt(getUrlParameter(pageNumberQueryName));

  // Make sure it returns an interger
  return pageNumber || 1;
}


// A function to query them all
function getAll(selectors) {
  return Array.prototype.slice.call(
    document.querySelectorAll(selectors), 0
  );
}

// Capture input
const searchQuery = getUrlParameter('q');

// Capture page number parameter
const pageNumber = getCurrentPageNumber();

// URL without page number
// This should preserve characters like "+"
const searchQueryPermalink = new URL(
  windowLocation.origin + windowLocation.pathname
);

searchQueryPermalink.searchParams.append('q', searchQuery);


// DRY
const pageNumberQueryString = '&' + pageNumberQueryName + '=';


// Search info section
const searchInfo = document.querySelector('#search-info');

// Show message
function report(message, type) {
  const el = document.createElement('p');

  el.textContent = message;

  if (type) {
    el.classList.add(type);
  }

  searchInfo.appendChild(el);
}


if (searchQuery) {

  // Transfer text to search field
  document.querySelector('.search-box input')
    .value = searchQuery;

  executeSearch(searchQuery);
  report('{{ T "searchProcessing" }}');

} else {
  report('{{ T "searchAwaitingSearch" }}');
}


// Populate results
function populateResults(output, matches) {

  // Split search results for pagination
  const pageSize = {{ .Site.Params.Search.pageResults | default 10 }};
  const paginatorPagers = [];

  for (let i = 0; i < matches; i += pageSize) {
    paginatorPagers.push(output.slice(i,i+pageSize));
  }

  const totalPages = paginatorPagers.length;

  // Make sure the requested page is available
  if (
    pageNumber > 0 &&
    pageNumber < totalPages + 1
  ) {
    renderPage(paginatorPagers, pageNumber - 1, totalPages);
  } else {
    if (pageNumber > totalPages) {
      windowLocation.replace(
        searchQueryPermalink + pageNumberQueryString + totalPages
      );
    } else {
      windowLocation.replace(searchQueryPermalink);
    }

  }
}

// Remember "index" and "number" are different things
function renderPage(pagers, index, totalPages) {
  pagers[index].forEach((value, index) => {

    const el = value.meta;

    const postTitle = el.title;
    const postDate = el.date;

    const htmlPostTitle = document.createElement('p');
    htmlPostTitle.textContent = postTitle;

    // Pull HTML template
    const resultsTemplate = document.querySelector('#search-results-template')
      .content.cloneNode(true);

    const postLink = resultsTemplate.querySelector('.btn');

    // Replace values
    postLink.setAttribute('href', value.url);
    postLink.setAttribute('title', postTitle);

    if (postDate) {
      const htmlPostDate = document.createElement('time');
      htmlPostDate.setAttribute('datetime', postDate);
      htmlPostDate.textContent = postDate;

      const htmlPostWithDate = document.createDocumentFragment();
      htmlPostWithDate.appendChild(htmlPostTitle);
      htmlPostWithDate.appendChild(htmlPostDate);

      postLink.setAttribute('title', postTitle + ' (' + postDate + ')');
      postLink.appendChild(htmlPostWithDate);
    } else {
      postLink.setAttribute('title', postTitle);
      postLink.appendChild(htmlPostTitle);
    }

    searchResults.appendChild(resultsTemplate);
  });


  // DRY
  const buttonPrevious = document.querySelector('.prev a');
  const paginationClass = 'pagination';

  // Check if navigation buttons are necessary
  if (totalPages > 1) {

    // If navigation is necessary, remove "hidden" class from nav
    document.querySelector('.' + paginationClass)
      .className = paginationClass;

    // Shows current page number
    document.querySelector('.current p')
      .textContent = pageNumber;

    // Check if not in the first page
    if (pageNumber !== 1) {
      document.querySelector('.first a').setAttribute(
        'href',
        searchQueryPermalink
      );

      // Check if not in the second page
      if (pageNumber !== 2) {
        buttonPrevious.setAttribute(
          'href',
          searchQueryPermalink + pageNumberQueryString + (pageNumber - 1)
        );

      } else {
        buttonPrevious.setAttribute('href', searchQueryPermalink);
      }

    } else {
      // Remove unnecessary buttons
      // Avoid simply hiding, since it could cause a11y issues
      getAll('.back').forEach(function(el) {
        el.remove();
      });
    }

    // Check if not in the last page
    if (pageNumber !== totalPages) {
      document.querySelector('.next a').setAttribute(
        'href',
        searchQueryPermalink + pageNumberQueryString + (pageNumber + 1)
      );

      document.querySelector('.last a').setAttribute(
        'href',
        searchQueryPermalink + pageNumberQueryString + totalPages
      );

    } else {
      // Remove unnecessary buttons
      // Avoid simply hiding, since it could cause a11y issues
      getAll('.advance').forEach(function(el) {
        el.remove();
      });
    }

  }
}


async function executeSearch(searchQuery) {
  const pagefind = await import('/pagefind/pagefind.js');
  const search = await pagefind.search(searchQuery);
  return await Promise.all(search.results.map(r => r.data()))

  .then((output) => {
    const limit = {{ .Site.Params.Search.maxResults | default 50 }};
    searchInfo.firstElementChild.remove();
    report('{{ T "searchResultsFor" }}: ' + searchQuery);

    const matches = output.length;

    if (matches > 0) {
      if (matches === 1) {
        report('{{ T "searchOnePageFound" }}.');
      } else if (1 < matches && matches < limit + 1) {
        report(matches + ' {{ T "searchPagesFound" }}.');
      } else {
        report('{{ T "searchTooMany" }}', 'error');
      }
    } else {
      report('{{ T "searchNoPageFound" }}', 'error');
    }

    if (0 < matches && matches < limit + 1) {
      populateResults(output, matches);
    }
  });
}
