export default function getRefs() {
  return {
    searchForm: document.querySelector('.header__form'),
    container: document.querySelector('#container'),
    homeEl: document.getElementById('home-link'),
    myLibraryEl: document.getElementById('library-link'),
    formEl: document.querySelector('.header__form'),
    headerLibraryEl: document.querySelector('.header__library'),
    headerContainer: document.querySelector('.header__container'),
    headerInputEl: document.querySelector('.header__form-input'),
    headerEl: document.querySelector('.header'),
    modal: document.querySelector('.backdrop'),
    overlay: document.querySelector('.backdrop'),
    gallery: document.querySelector('.gallery'),
    isFilmCard: document.querySelector('.film-card'),
    body: document.querySelector('body'),
    logo: document.querySelector('.header__logo'),
    watchedBtn: document.querySelector('#watched-btn'),
    queueBtn: document.querySelector('#queue-btn'),
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    devModal: document.querySelector('[data-modal]'),
    lightBoxOverlay: document.querySelector('.lightbox__overlay'),
    dayTrend: document.querySelector('#dayTrend'),
    weekTrend: document.querySelector('#weekTrend'),
    btnContainer: document.querySelector('.main-btncontainer'),
    backdropFtrEl: document.querySelector('.backdrop-developers'),
    btnContainer: document.querySelector('.main-btn'),
    bntTitle: document.querySelector('div > .main-title'),
  };
}
