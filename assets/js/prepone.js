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

// New prefers-color-scheme media query to detect OS light/dark mode setting
const PREFERS_LIGHT = window.matchMedia('(prefers-color-scheme: light)');
const PREFERS_DARK = window.matchMedia('(prefers-color-scheme: dark)');
const ROOT = document.documentElement;

const SHEET = document.documentElement.style;
const META_THEME_COLOR = document.querySelector('meta[name=theme-color]');

// Set the dark
function setDark() {
  ROOT.dataset.mode = 'dark'
};

// Set the light
function setLight() {
  ROOT.dataset.mode = 'light'
};

// Initialization triggers light/dark mode based on prior preference, then OS setting
// And yes, I know 'true' here is a string
if(localStorage.getItem('isDark') == 'true') {
  setDark()
} else if(localStorage.getItem('isDark') === null) {
  setLight()
} else if(PREFERS_DARK.matches) {
  setDark()
} else if(PREFERS_LIGHT.matches) {
  setLight()
};

console.log('Light/dark mode loaded.');


// TODO
// Maybe I should rethink this ...
function getAccent() {
  if (ROOT.dataset.mode === 'dark') {
  
    if (localStorage.getItem('darkAccent') === null) {
      console.log("The user never used the palette while in the 'dark' mode.");
      console.log("As the mode is 'dark', loading the 'default accent color' for the dark mode.");
      
      var currentAccent = "{{ $darkAccent }}"
    } else {
    
      var currentAccent = localStorage.getItem('darkAccent')
      
      console.log("The user previously used the palette while in the 'dark' mode.");
      console.log("As the mode is 'dark', loading the 'dark accent color' chosen by the user.");
    }
  } else if (ROOT.dataset.mode === 'light') {

    if (localStorage.getItem('lightAccent') === null) {
  
      console.log("The user never used the palette while in the 'light' mode.");
      console.log("As the mode is 'light', loading the 'default accent color' for the light mode.");

      var currentAccent = "{{ $lightAccent }}"
    } else {
      var currentAccent = localStorage.getItem('lightAccent')
      
      console.log("The user previously used the palette while in the 'light' mode.");
      console.log("As the mode is 'light', loading the 'light accent color' chosen by the user.");
    }
  };
  
  return currentAccent
};

var activeAccent = getAccent();

// Set the active accent color for these right after setting mode color
// Should mitigate any flickering
SHEET.setProperty('--accent', activeAccent);

// Also meta-theme cuz, why not
META_THEME_COLOR.setAttribute('content', activeAccent);


function updateAccent() {
  var activeAccent = getAccent();

  SHEET.setProperty('--accent', activeAccent);
  PALETTE.value = activeAccent;
  META_THEME_COLOR.setAttribute('content', activeAccent);
};


document.addEventListener('DOMContentLoaded', function () {

  // Update the color picker with the active accent color 
  PALETTE.value = activeAccent;

  // Smooth transition, only when changing modes (and not loading pages)
  function smoothTransition() {
    document.body.style.transition 
    = document.querySelector('header').style.transition
    = document.querySelector('footer').style.transition
    = '{{ printf "background-color %[1]s, color %[1]s" $changeTransition }}'
  };
  
  // Give the user a choice
  function userModeChange() {
  
    smoothTransition();

    if (ROOT.dataset.mode == 'light') {
      setDark();
      localStorage.setItem('isDark', 'true')

      console.log("Mode changed to 'dark' by the user.");
      
    } else {
      setLight();
      localStorage.removeItem('isDark')
      
      console.log("Mode changed to 'light' by the user.");
      
    };
    
    updateAccent()
  };

  
  // TEST
  // Keyboard shortcut for mode change, here for testing purposes only
  // CTRL + ALT + M
  {{ if .Site.IsServer }}
    document.addEventListener('keydown', (event) => {
      const E = event || window.event;
      if (E.keyCode === 77 && E.ctrlKey && E.altKey) {
        userModeChange();
        return;
      }
    }, false);
  {{ end }}


  // Runs when OS changes light/dark mode. Changes only if you were on default
  // color state (light on light mode, dark on dark mode).
  function OSModeChange() {
  
    smoothTransition();
    
    if (PREFERS_LIGHT.matches) {
      setLight();
      localStorage.removeItem('isDark')

      console.log("Mode changed to 'light' in OS level.");
      
    } else if (PREFERS_DARK.matches) {
      setDark();
      localStorage.setItem('isDark', 'true')
      
      console.log("Mode changed to 'dark' in OS level.");
    };
    
    updateAccent()
  };

  // Listeners for when you change OS setting for light/dark mode
  PREFERS_LIGHT.addListener(OSModeChange);
  PREFERS_DARK.addListener(OSModeChange);
  
  
  // Mode change button
  document.querySelector('footer button')
    .addEventListener('click', userModeChange)
})
