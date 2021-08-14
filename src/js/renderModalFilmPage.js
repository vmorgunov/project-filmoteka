import renderPageTpl from '../templates/renderModalFilmPage.hbs';

const gallery = document.querySelector('.gallery');
const modal = document.querySelector('.backdrop');
const overlay = document.querySelector('.backdrop');
const isFilmCard = document.querySelector('.film-card');
const body = document.querySelector('body');

function fetchFilmInfo(id) {
  const API_KEY = '3df6184500ed5682d4d34cc3cdc4b7c7';
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;

  return fetch(url)
    .then(r => r.json())
    .then(data => ({
      ...data,
      popularity: data.popularity.toFixed(1),
      original_title: data.original_title.toUpperCase(),
    }));
}

gallery.addEventListener('click', onOpenFilm);

function onOpenFilm(e) {
  e.preventDefault();

  const galleryCard = e.target.parentNode;
  const galleryCardId = galleryCard.id;
  const isGalleryCard = galleryCard.classList.contains('gallery-card');

  fetchFilmInfo(galleryCardId).then(data => {
    if (!isGalleryCard) {
      return;
    }

    const markup = renderPageTpl(data);
    isFilmCard.innerHTML = markup;

    modal.classList.toggle('is-hidden');

    const closeModalBtn = document.querySelector('.close-modal__button');
    closeModalBtn.addEventListener('click', onCloseFilm);

    body.classList.add('is-hidden');
  });

  overlay.addEventListener('click', onOverlayClick);
  window.addEventListener('keydown', onEscKeyPress);

  function onCloseFilm() {
    modal.classList.toggle('is-hidden');
    window.removeEventListener('keydown', onEscKeyPress);
    overlay.removeEventListener('click', onOverlayClick);
    clearModal();
    body.classList.remove('is-hidden');
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
    isFilmCard.innerHTML = '';
  }
}
