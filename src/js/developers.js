import getRefs from "./refs.js";

const refs = getRefs();

// Open Modal

function onOpenModal(evt) {
  evt.preventDefault();

  document.body.classList.add("modal-open");
  refs.devModal.classList.remove("is-hidden");
  window.addEventListener("keydown", onEscKeyPress);
}

// Close Modal

function onCloseModal() {
  document.body.classList.remove("modal-open");
  refs.devModal.classList.add("is-hidden");
  window.removeEventListener("keydown", onEscKeyPress);
}

// On Escape Press

function onEscKeyPress(evt) {
  const isEscKey = evt.code === "Escape";
  if (isEscKey) {
    onCloseModal();
  }
}

// On Overlay Click

function onOverlayClick(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseModal();
  }
}

refs.openModalBtn.addEventListener("click", onOpenModal);
refs.closeModalBtn.addEventListener("click", onCloseModal);
refs.lightBoxOverlay.addEventListener("click", onOverlayClick);
