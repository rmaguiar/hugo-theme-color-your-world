// =================================================
// Basic search functionality via Fuse.js
// Based on: https://gist.github.com/eddiewebb/735feb48f50f0ddd65ae5606a1cb41ae#gistcomment-2987774
// =================================================

'use strict';

const fuseOptions = {
  shouldSort: true,
  threshold: 0,
  ignoreLocation: true,
  maxPatternLength: {{ .Site.Params.Search.maxLength | default .Site.Data.default.search.maxLength }},
  minMatchCharLength: {{ .Site.Params.Search.minLength | default .Site.Data.default.search.minLength }},
  keys: [
    { name: 'title',        weight: .4 },
    { name: 'tags',         weight: .3 },
    { name: 'description',  weight: .2 },
    { name: 'content',      weight: .1 }
  ]
}

// Sanitize
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Capture input
const searchQuery = getUrlParameter('q');

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


function executeSearch(searchQuery) {
  fetch('index.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    
    // Limit results and throw an error if too many pages are found
    const limit = {{ .Site.Params.Search.maxResults | default 30 }};

    import('/libs/fuse.js@6.5.3/dist/fuse.basic.esm.min.js')
      .then((fuseBasic) => {
        const fuse = new fuseBasic.default(data, fuseOptions);
        return fuse.search(searchQuery);
      })
      .then((output) => {
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
          populateResults(output);
        }
      });
  });
}


// Populate results
function populateResults(output) {
  output.forEach((value) => {
    
    const el = value.item;

    const postTitle = el.title;
    const postDate = el.date;
    
    const htmlPostTitle = document.createElement('p');
    htmlPostTitle.textContent = postTitle;
              
    // Pull HTML template
    const resultsTemplate = document.querySelector('#search-results-template')
      .content.cloneNode(true);
      
    const postLink = resultsTemplate.querySelector('.btn');
    
    // Replace values
    postLink.setAttribute('href', el.permalink);
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

    document.querySelector('#search-results')
      .appendChild(resultsTemplate);
  });
}
