const refs = {
  homeEl: document.getElementById('home-link'),
  myLibraryEl: document.getElementById('library-link'),
  formEl: document.querySelector('.header__form'),
  headerLibraryEl: document.querySelector('.header__library'),
  headerContainer: document.querySelector('.header__container'),
  headerEl: document.querySelector('.header'),
};

baseHome();

function onHomeClick() {
  baseHome();
  refs.myLibraryEl.classList.remove('header-nav__link--active');
  refs.formEl.classList.remove('visually-hidden');
  refs.headerContainer.classList.remove('header__container--library');
  refs.headerEl.classList.remove('header--library');
}

function onMyLibraryClick() {
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

refs.homeEl.addEventListener('click', onHomeClick);
refs.myLibraryEl.addEventListener('click', onMyLibraryClick);
