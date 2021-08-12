const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  lightBoxOverlay: document.querySelector('.lightbox__overlay'),
};

// Open Modal

const onOpenModal = evt => {
  evt.preventDefault();

  document.body.classList.add('modal-open');
  refs.modal.classList.remove('is-hidden');
  window.addEventListener('keydown', onEscKeyPress);
};

// Close Modal

const onCloseModal = () => {
  document.body.classList.remove('modal-open');
  refs.modal.classList.add('is-hidden');
  window.removeEventListener('keydown', onEscKeyPress);
};

// On Escape Press

const onEscKeyPress = evt => {
  const isEscKey = evt.code === 'Escape';
  if (isEscKey) {
    onCloseModal();
  }
};

// On Overlay Click

const onOverlayClick = evt => {
  if (evt.currentTarget === evt.target) {
    onCloseModal();
  }
};

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.lightBoxOverlay.addEventListener('click', onOverlayClick);
