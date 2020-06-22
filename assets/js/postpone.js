'use strict';

/******************************
/ Accent color palette
******************************/

const PALETTE   = document.querySelector('footer input');

PALETTE.onchange = function () {

  const PICK = PALETTE.value;

  SHEET.setProperty('--accent', PICK);
  
  if (ROOT.dataset.mode === 'light') {
    localStorage.setItem('lightAccent', PICK)
  } else {
    localStorage.setItem('darkAccent', PICK)
  };
  
  updateAccent()
};

