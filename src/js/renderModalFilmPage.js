import renderPageTpl from '../templates/renderModalFilmPage.hbs';
import renderTrendingFilms from '../templates/renderTrendingFilms.hbs';
import FilmsApiService from './apiService.js';
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
  const filmUrl = films.fetchFilmsById(galleryCardId);

  films.fetchFilmsInfo(galleryCardId).then(data => {
    if (!isGalleryCard) {
      return;
    }

    const markup = renderPageTpl(data);
    refs.isFilmCard.innerHTML = markup;

    const trailer = document.querySelector('#trailer');
    trailer.setAttribute('src', `https://www.youtube.com/embed/${filmUrl}`);

    refs.modal.classList.toggle('is-hidden');

    const closeModalBtn = document.querySelector('.close-modal__button');
    closeModalBtn.addEventListener('click', onCloseFilm);

    refs.body.classList.add('is-hidden');

    //--------------------------Функционал кнопок

    const addToWatchedBtn = document.querySelector('#addBtnWatched');
    const addToQueueBtn = document.querySelector('#addBtnQueue');

    addToWatchedBtn.addEventListener('click', onAddToWatchedClick);
    addToQueueBtn.addEventListener('click', onAddToQueueClick);

    function onAddToWatchedClick(e) {
      watchedLocalStorage(galleryCardId);
      e.target.textContent = 'remove from watched';
      e.target.style.backgroundColor = '#ff6b08';
      e.target.style.color = '#fff';
      e.target.style.borderColor = '#ff6b08';

      addToWatchedBtn.removeEventListener('click', onAddToWatchedClick);
      addToWatchedBtn.addEventListener('click', onRemoveFromWatchedClick);
    }

    function onAddToQueueClick(e) {
      queueLocalStorage(galleryCardId);
      e.target.textContent = 'remove from queue';
      e.target.style.backgroundColor = '#ff6b08';
      e.target.style.color = '#fff';
      e.target.style.borderColor = '#ff6b08';

      addToQueueBtn.removeEventListener('click', onAddToQueueClick);
      addToQueueBtn.addEventListener('click', onRemoveFromQueueClick);
    }

    function onRemoveFromWatchedClick(e) {
      watchedLocalStorage(galleryCardId);
      e.target.textContent = 'add to watched';
      e.target.style.backgroundColor = '#fff';
      e.target.style.color = '#000';
      e.target.style.borderColor = '#000';

      addToWatchedBtn.removeEventListener('click', onRemoveFromWatchedClick);
      addToWatchedBtn.addEventListener('click', onAddToWatchedClick);
    }

    function onRemoveFromQueueClick(e) {
      queueLocalStorage(galleryCardId);
      e.target.textContent = 'add to queue';
      e.target.style.backgroundColor = '#fff';
      e.target.style.color = '#000';
      e.target.style.borderColor = '#000';

      addToQueueBtn.removeEventListener('click', onRemoveFromQueueClick);
      addToQueueBtn.addEventListener('click', onAddToQueueClick);
    }
  });

  refs.overlay.addEventListener('click', onOverlayClick);
  window.addEventListener('keydown', onEscKeyPress);

  function onCloseFilm() {
    refs.modal.classList.toggle('is-hidden');
    window.removeEventListener('keydown', onEscKeyPress);
    refs.overlay.removeEventListener('click', onOverlayClick);
    clearModal();
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
