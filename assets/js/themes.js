const body = document.body;

function swapButtons(oldbtn, newbtn) {
    var classList = $('.btn-close-' + oldbtn).attr('class');
    if (classList) {
      var classArr = classList.split(/\s+/);
      classArr = classArr.filter(x => x !== 'btn-close-' + oldbtn);
      classArr.push('btn-close-' + newbtn)
      $('.btn-close-' + oldbtn).attr('class', classArr.join(' '));
    }
}

/**
 * Render theme variation (day or night).
 *
 * @param {boolean} isDarkTheme
 * @param {boolean} init - true only when called on document ready
 * @returns {undefined}
 */
function renderThemeVariation(isDarkTheme, init = false) {
  // Check if re-render required.
  if (!init) {
    // If request to render light when light variation already rendered, return.
    // If request to render dark when dark variation already rendered, return.
    if (
      (isDarkTheme === false && !body.classList.contains('dark')) ||
      (isDarkTheme === true && body.classList.contains('dark'))
    ) {
      return;
    }

    // Only fade in the page when changing the theme variation.
    //Object.assign(document.body.style, {opacity: 0, visibility: 'visible'});
    //fadeIn(document.body, 600);
  }

  const codeHlLight = document.querySelector('link[title=hl-light]');
  const codeHlDark = document.querySelector('link[title=hl-dark]');

  if (isDarkTheme === false) {
    body.classList.remove('dark');
    body.setAttribute('data-bs-theme', 'light');
    swapButtons('white', 'black');
    if (codeHlLight) {
      codeHlLight.disabled = false;
    }
    if (codeHlDark) {
      codeHlDark.disabled = true;
    }
  } else {
    body.classList.add('dark');
    body.setAttribute('data-bs-theme', 'dark');
    swapButtons('white', 'black');
    if (codeHlLight) {
      codeHlLight.disabled = true;
    }
    if (codeHlDark) {
      codeHlDark.disabled = false;
    }
  }
}


/**
 * onMediaQueryListEvent.
 *
 * @param {MediaQueryListEvent} event
 * @returns {undefined}
 */
function onMediaQueryListEvent(event) {
  let isDarkTheme = true;
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    isDarkTheme = false;
  }
  renderThemeVariation(isDarkTheme);
}

// Live update of day/night mode on system preferences update (no refresh required).
// Note: since we listen only for *light* events, we won't detect other scheme changes such as dark to no-preference.
const lightModeMediaQuery = window.matchMedia('(prefers-color-scheme: light)');
lightModeMediaQuery.addEventListener('change', (event) => {
  onMediaQueryListEvent(event);
});

renderThemeVariation(!window.matchMedia('(prefers-color-scheme: light)').matches);
