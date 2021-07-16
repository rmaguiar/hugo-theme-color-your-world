'use strict';

// Get default accent colors
{{ $darkAccent   := .Site.Params.Style.darkAccent   | default .Site.Data.default.style.darkAccent }}
{{ $lightAccent  := .Site.Params.Style.lightAccent  | default .Site.Data.default.style.lightAccent }}

// Get CSS transition
{{ $changeTransition := .Site.Params.Style.changeTransition | default .Site.Data.default.style.changeTransition }}

// =================================================
// Mode switcher + Custom accent color
// Based on: https://gist.github.com/regpaq/04c67e8aceecbf0fd819945835412d1f
// =================================================

{{ if not .Site.Params.Style.ignoreSystemSettings }}
  // Use prefers-color-scheme media query to detect OS dark/light mode setting
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)');
{{ end }}

const rootElement = document.documentElement;

const rootStyle = rootElement.style;
const metaThemeColor = document.querySelector('meta[name=theme-color]');

// Set the dark mode
function setDark() {
  rootElement.setAttribute('data-mode', 'dark');
}

// Set the light mode
function setLight() {
  rootElement.setAttribute('data-mode', 'light');
}

// Initialization triggers dark/light mode based on prior preference, then OS setting
// If both are unavailable, the default 'data-mode' attribute will be used instead
// And yes, I know 'true' here is a string
if(localStorage.getItem('isDark') == 'true') {
  setDark();
} else if(localStorage.getItem('isDark') == 'false') {
  setLight();

  {{ if not .Site.Params.Style.ignoreSystemSettings }}
    } else if(prefersDark.matches) {
      setDark();
    } else if(prefersLight.matches) {
      setLight();
  {{ end }}

}

//console.log('Dark/light mode loaded.');


// TODO
// Maybe I should rethink this...
function getAccent() {
  
  const currentMode = rootElement.getAttribute('data-mode');
  let currentAccent;

  if (currentMode === 'dark') {
  
    if (localStorage.getItem('darkAccent') === null) {
      //console.log("The user never used the palette while in the 'dark' mode.");
      //console.log("As the mode is 'dark', loading the 'default accent color' for the dark mode.");
      
      currentAccent = "{{ $darkAccent }}";
    } else {
      //console.log("The user previously used the palette while in the 'dark' mode.");
      //console.log("As the mode is 'dark', loading the 'dark accent color' chosen by the user.");
      
      currentAccent = localStorage.getItem('darkAccent');
    }
  } else if (currentMode === 'light') {

    if (localStorage.getItem('lightAccent') === null) {
      //console.log("The user never used the palette while in the 'light' mode.");
      //console.log("As the mode is 'light', loading the 'default accent color' for the light mode.");
      
      currentAccent = "{{ $lightAccent }}";
    } else {
      //console.log("The user previously used the palette while in the 'light' mode.");
      //console.log("As the mode is 'light', loading the 'light accent color' chosen by the user.");
      
      currentAccent = localStorage.getItem('lightAccent');
    }
  }
  
  return currentAccent;
}

const activeAccent = getAccent();

// Set the active accent color for these right after setting dark/light mode
// Should mitigate any flashing/flickering
rootStyle.setProperty('--accent', activeAccent);

// Also meta-theme cuz, why not
metaThemeColor.setAttribute('content', activeAccent);


document.addEventListener('DOMContentLoaded', function () {

  // Accent color palette (HTML color picker)
  const palette = document.querySelector('footer input');

  palette.onchange = function () {

    // User's pick
    const pick = palette.value;

    rootStyle.setProperty('--accent', pick);
    
    if (rootElement.getAttribute('data-mode') === 'dark') {
      localStorage.setItem('darkAccent', pick);
    } else {
      localStorage.setItem('lightAccent', pick);
    }
    
    updateAccent();
  }

  // Update the color picker with the active accent color 
  palette.value = activeAccent;

  // Smooth transition, only when changing modes (and not loading pages)
  function smoothTransition() {
    document.body.style.transition 
      = document.querySelector('header').style.transition
      = document.querySelector('footer').style.transition
      = '{{ printf "background-color %[1]s, color %[1]s" $changeTransition }}';
  }
  
  // Switch mode
  function userModeChange() {
  
    smoothTransition();

    if (rootElement.getAttribute('data-mode') == 'dark') {
      setLight();
      localStorage.setItem('isDark', 'false');
      
      //console.log("Mode changed to 'light' by the user.");
    } else {
      setDark();
      localStorage.setItem('isDark', 'true');

      //console.log("Mode changed to 'dark' by the user.");
    }
    
    updateAccent();
  }

  
  // TEST
  // Keyboard shortcut for mode change, here for testing purposes only
  // CTRL + ALT + M
  {{ if .Site.IsServer }}
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;
      if (e.keyCode === 77 && e.ctrlKey && e.altKey) {
        userModeChange();
        return;
      }
    }, false);
  {{ end }}


  {{ if not .Site.Params.Style.ignoreSystemSettings }}
  
    // Runs when OS changes dark/light mode. Changes only if you were on default
    // color state (light on light mode, dark on dark mode).
    function OSModeChange() {
    
      smoothTransition();
      
      if (prefersDark.matches) {
        setDark();
        localStorage.setItem('isDark', 'false');

        //console.log("Mode changed to 'light' in OS level.");
      } else if (prefersLight.matches) {
        setLight();
        localStorage.setItem('isDark', 'true');
        
        //console.log("Mode changed to 'dark' in OS level.");
      }
      
      updateAccent();
    }

    // Listeners for when you change OS setting for dark/light mode
    prefersDark.addListener(OSModeChange);
    prefersLight.addListener(OSModeChange);
  
  {{ end }}
  
  function updateAccent() {
    const activeAccent = getAccent();

    rootStyle.setProperty('--accent', activeAccent);
    palette.value = activeAccent;
    metaThemeColor.setAttribute('content', activeAccent);
  }
  
  // Mode change button
  document.querySelector('footer button')
    .addEventListener('click', userModeChange);
});
