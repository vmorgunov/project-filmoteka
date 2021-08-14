export default function getRefs() {
  return {
    searchForm: document.querySelector('.header__form'),
    container: document.querySelector('#container'),
    homeEl: document.getElementById('home-link'),
    myLibraryEl: document.getElementById('library-link'),
    formEl: document.querySelector('.header__form'),
    headerLibraryEl: document.querySelector('.header__library'),
    headerContainer: document.querySelector('.header__container'),
    headerEl: document.querySelector('.header'),
    modal: document.querySelector('.backdrop'),
    overlay: document.querySelector('.backdrop'),
    gallery: document.querySelector('.gallery'),
    isFilmCard: document.querySelector('.film-card'),
    body: document.querySelector('body'),
  };
}
