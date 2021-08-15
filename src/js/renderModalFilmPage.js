import renderPageTpl from '../templates/renderModalFilmPage.hbs';
import FilmsApiService from './apiService.js';
import getRefs from './refs';

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
    trailer.setAttribute('href', `https://www.youtube.com/embed/${filmUrl}`);

    refs.modal.classList.toggle('is-hidden');

    const closeModalBtn = document.querySelector('.close-modal__button');
    closeModalBtn.addEventListener('click', onCloseFilm);

    refs.body.classList.add('is-hidden');
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
