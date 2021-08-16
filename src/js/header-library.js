import getRefs from './refs.js';
import { showFilms } from './renderTrendingFilms.js';
import { removePagination, setPaginationOnHome } from './pagination.js';
import { onWatchedClick } from './addFilmToLibrary.js';

const refs = getRefs();

baseHome();

function onHomeClick() {
  baseHome();
  showFilms(1);
  setPaginationOnHome('block');
  refs.myLibraryEl.classList.remove('header-nav__link--active');
  refs.formEl.classList.remove('visually-hidden');
  refs.headerContainer.classList.remove('header__container--library');
  refs.headerEl.classList.remove('header--library');
  clearInput();
}

function onMyLibraryClick() {
  onWatchedClick();
  removePagination('none');
  refs.homeEl.classList.remove('header-nav__link--active');
  refs.myLibraryEl.classList.add('header-nav__link--active');
  refs.formEl.classList.add('visually-hidden');
  refs.headerLibraryEl.classList.remove('visually-hidden');
  refs.headerContainer.classList.add('header__container--library');
  refs.headerEl.classList.add('header--library');
  clearInput();
}

function baseHome() {
  clearContainer();
  refs.homeEl.classList.add('header-nav__link--active');
  refs.headerLibraryEl.classList.add('visually-hidden');
}

function clearContainer() {
  refs.container.innerHTML = '';
}

function clearInput() {
  refs.headerInputEl.value = '';
}

refs.homeEl.addEventListener('click', onHomeClick);
refs.myLibraryEl.addEventListener('click', onMyLibraryClick);
refs.logo.addEventListener('click', onHomeClick);

export { clearContainer };
