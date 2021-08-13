import getRefs from './refs.js';
import { showFilms } from './renderTrendingFilms.js';
const refs = getRefs();

baseHome();

function onHomeClick() {
  clearContainer();
  baseHome();
  showFilms();
  refs.myLibraryEl.classList.remove('header-nav__link--active');
  refs.formEl.classList.remove('visually-hidden');
  refs.headerContainer.classList.remove('header__container--library');
  refs.headerEl.classList.remove('header--library');
}

function onMyLibraryClick() {
  clearContainer();
  refs.homeEl.classList.remove('header-nav__link--active');
  refs.myLibraryEl.classList.add('header-nav__link--active');
  refs.formEl.classList.add('visually-hidden');
  refs.headerLibraryEl.classList.remove('visually-hidden');
  refs.headerContainer.classList.add('header__container--library');
  refs.headerEl.classList.add('header--library');
}

function baseHome() {
  refs.homeEl.classList.add('header-nav__link--active');
  refs.headerLibraryEl.classList.add('visually-hidden');
}

function clearContainer() {
  refs.container.innerHTML = '';
}

refs.homeEl.addEventListener('click', onHomeClick);
refs.myLibraryEl.addEventListener('click', onMyLibraryClick);
