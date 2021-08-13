import Notiflix from 'notiflix';

function onInputError() {
  Notiflix.Notify.failure(
    'Search result not successful. Enter the correct movie name and try again',
  );
}

function findMessage(message) {
  Notiflix.Notify.info(`Let's go! We found ${message} films.`);
}

export { onInputError, findMessage };
