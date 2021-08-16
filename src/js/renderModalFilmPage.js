import renderPageTpl from '../templates/renderModalFilmPage.hbs';
import FilmsApiService from './apiService.js';
import getTrailer from './trailerTab';
import getRefs from './refs';
import { watchedLocalStorage, queueLocalStorage } from './addFilmToLibrary';

const films = new FilmsApiService();

const refs = getRefs();

refs.gallery.addEventListener('click', onOpenFilm);

function onOpenFilm(e) {
  e.preventDefault();

  const galleryCard = e.target.parentNode;
  const galleryCardId = galleryCard.id;
  const isGalleryCard = galleryCard.classList.contains('gallery-card');

  films.fetchFilmsInfo(galleryCardId).then(data => {
    if (!isGalleryCard) {
      return;
    }

    const markup = renderPageTpl(data);
    refs.isFilmCard.innerHTML = markup;

    getTrailer(galleryCardId);

    refs.modal.classList.toggle('is-hidden');

    const closeModalBtn = document.querySelector('.close-modal__button');
    closeModalBtn.addEventListener('click', onCloseFilm);

    refs.body.classList.add('is-hidden');

    //--------------------------Функционал кнопок
    const addToWatchedBtn = document.querySelector('#addBtnWatched');
    const addToQueueBtn = document.querySelector('#addBtnQueue');

    addToWatchedBtn.addEventListener('click', onAddToWatchedClick);
    addToQueueBtn.addEventListener('click', onAddToQueueClick);
    //-------------Кнопка Watched
    let savedIdWatched = JSON.parse(localStorage.getItem('Watched'));

    if (savedIdWatched && savedIdWatched.movieIDWatched.includes(galleryCardId)) {
      addToWatchedBtn.textContent = 'remove from watched';
      addToWatchedBtn.style.backgroundColor = '#ff6b01';
      addToWatchedBtn.style.color = '#ffffff';
      addToWatchedBtn.style.borderColor = '#ff6b01';
      addToWatchedBtn.addEventListener('click', onRemoveFromWatchedClick);
    }

    if (addToWatchedBtn.textContent === 'add to watched') {
      addToWatchedBtn.removeEventListener('click', onRemoveFromWatchedClick);
    } else if (addToWatchedBtn.textContent === 'remove from watched') {
      addToWatchedBtn.removeEventListener('click', onAddToWatchedClick);
    }

    function onAddToWatchedClick() {
      watchedLocalStorage(galleryCardId);
      addToWatchedBtn.textContent = 'remove from watched';
      addToWatchedBtn.style.backgroundColor = '#ff6b08';
      addToWatchedBtn.style.color = '#fff';
      addToWatchedBtn.style.borderColor = '#ff6b08';
      addToWatchedBtn.removeEventListener('click', onAddToWatchedClick);
      addToWatchedBtn.addEventListener('click', onRemoveFromWatchedClick);
    }

    function onRemoveFromWatchedClick() {
      watchedLocalStorage(galleryCardId);
      addToWatchedBtn.textContent = 'add to watched';
      addToWatchedBtn.style.backgroundColor = '#fff';
      addToWatchedBtn.style.color = '#000';
      addToWatchedBtn.style.borderColor = '#000';
      addToWatchedBtn.removeEventListener('click', onRemoveFromWatchedClick);
      addToWatchedBtn.addEventListener('click', onAddToWatchedClick);
    }
    //--------------Кнопка Queue
    let savedIdQueue = JSON.parse(localStorage.getItem('Queue'));

    if (savedIdQueue && savedIdQueue.movieIDQueue.includes(galleryCardId)) {
      addToQueueBtn.textContent = 'remove from queue';
      addToQueueBtn.style.backgroundColor = '#ff6b08';
      addToQueueBtn.style.color = '#fff';
      addToQueueBtn.style.borderColor = '#ff6b08';
      addToQueueBtn.addEventListener('click', onRemoveFromQueueClick);
    }

    if (addToQueueBtn.textContent === 'add to queue') {
      addToQueueBtn.removeEventListener('click', onRemoveFromQueueClick);
    } else if (addToQueueBtn.textContent === 'remove from queue') {
      addToQueueBtn.removeEventListener('click', onAddToQueueClick);
    }

    function onAddToQueueClick() {
      queueLocalStorage(galleryCardId);
      addToQueueBtn.textContent = 'remove from queue';
      addToQueueBtn.style.backgroundColor = '#ff6b08';
      addToQueueBtn.style.color = '#fff';
      addToQueueBtn.style.borderColor = '#ff6b08';
      addToQueueBtn.removeEventListener('click', onAddToQueueClick);
      addToQueueBtn.addEventListener('click', onRemoveFromQueueClick);
    }

    function onRemoveFromQueueClick() {
      queueLocalStorage(galleryCardId);
      addToQueueBtn.textContent = 'add to queue';
      addToQueueBtn.style.backgroundColor = '#fff';
      addToQueueBtn.style.color = '#000';
      addToQueueBtn.style.borderColor = '#000';
      addToQueueBtn.removeEventListener('click', onRemoveFromQueueClick);
      addToQueueBtn.addEventListener('click', onAddToQueueClick);
    }
  });

  refs.overlay.addEventListener('click', onOverlayClick);
  window.addEventListener('keydown', onEscKeyPress);

  function onCloseFilm() {
    refs.modal.classList.toggle('is-hidden');
    clearModal();
    window.removeEventListener('keydown', onEscKeyPress);
    refs.overlay.removeEventListener('click', onOverlayClick);
    refs.body.classList.remove('is-hidden');
  }

  function onOverlayClick(e) {
    if (e.currentTarget === e.target) {
      onCloseFilm();
    }
  }

  function onEscKeyPress(e) {
    const ESC_KEY_CODE = 'Escape';
    if (e.code === ESC_KEY_CODE) {
      onCloseFilm();
    }
  }

  function clearModal() {
    refs.isFilmCard.innerHTML = '';
  }
}
