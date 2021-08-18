import getRefs from './refs.js';

const refs = getRefs();
const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const { LIGHT, DARK } = Theme;

if (!localStorage.theme) {
  localStorage.theme = LIGHT;
}
function onSetTheme(theme) {
  localStorage.setItem('theme', theme);
  document.body.className = theme;
  if (theme === DARK) {
    refs.footerEl.classList.remove(LIGHT);
    refs.footerEl.classList.add(DARK);
    refs.isFilmCard.classList.remove(LIGHT);
    refs.isFilmCard.classList.add(DARK);
    refs.filmSpecificationEL.classList.remove(LIGHT);
    refs.filmSpecificationEL.classList.add(DARK);
  } else {
    refs.footerEl.classList.remove(DARK);
    refs.footerEl.classList.add(LIGHT);
    refs.isFilmCard.classList.remove(DARK);
    refs.isFilmCard.classList.add(LIGHT);
    refs.filmSpecificationEL.classList.remove(DARK);
    refs.filmSpecificationEL.classList.add(LIGHT);
  }
}

function onChangeTheme() {
  if (localStorage.getItem('theme') === DARK) {
    onSetTheme(LIGHT);
  } else {
    onSetTheme(DARK);
  }
}

function onCheckTheme() {
  const localStorageName = localStorage.getItem('theme');

  if (localStorageName === DARK) {
    onSetTheme(localStorageName);
    refs.switchThemeBtn.checked = true;
  }
}

refs.switchThemeBtn.addEventListener('change', onChangeTheme);
window.onload = onCheckTheme();
