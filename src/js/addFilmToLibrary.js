import getRefs from './refs.js';
import { clearContainer } from './header-library';
import FilmsApiService from './apiService.js';
import renderFilms from '../templates/renderTrendingFilms.hbs';

const refs = getRefs();
const films = new FilmsApiService();

refs.watchedBtn.addEventListener('click', onWatchedClick);
refs.queueBtn.addEventListener('click', onQueueClick);

function onWatchedClick() {
  clearContainer();
  refs.queueBtn.classList.remove('active');
  refs.watchedBtn.classList.add('active');

  let savedFilms = localStorage.getItem('Watched');
  if (savedFilms) {
    const parceFilms = JSON.parse(savedFilms);

    for (let i = 0; i < parceFilms.movieIDWatched.length; i += 1) {
      const id = parceFilms.movieIDWatched[i];

      try {
        films.fetchFilmsInfo(id).then(data => renderFilmsCards([data]));
      } catch (error) {
        console.log(error);
      }
    }
  }
}

function onQueueClick() {
  clearContainer();
  refs.watchedBtn.classList.remove('active');
  refs.queueBtn.classList.add('active');

  let savedFilms = localStorage.getItem('Queue');
  if (savedFilms) {
    const parceFilms = JSON.parse(savedFilms);

    for (let i = 0; i < parceFilms.movieIDQueue.length; i += 1) {
      const id = parceFilms.movieIDQueue[i];

      try {
        films.fetchFilmsInfo(id).then(data => renderFilmsCards([data]));
      } catch (error) {
        console.log(error);
      }
    }
  }
}

function renderFilmsCards(data) {
  const markup = renderFilms(data);
  refs.container.insertAdjacentHTML('beforeend', markup);
}

function watchedLocalStorage(id) {
  const savedItems = JSON.parse(localStorage.getItem('Watched'));
  let arrayOfFilms;
  if (savedItems) {
    arrayOfFilms = savedItems.movieIDWatched;
  }

  if (arrayOfFilms && arrayOfFilms.length && !arrayOfFilms.includes(id)) {
    arrayOfFilms.push(id);
  } else if (arrayOfFilms && arrayOfFilms.length && arrayOfFilms.includes(id)) {
    arrayOfFilms = arrayOfFilms.filter(el => el !== id);
  } else {
    arrayOfFilms = [];
    arrayOfFilms.push(id);
  }

  let movieIdStorageWatched = {
    movieIDWatched: arrayOfFilms,
  };

  localStorage.setItem('Watched', JSON.stringify(movieIdStorageWatched));
}

function queueLocalStorage(id) {
  const savedItems = JSON.parse(localStorage.getItem('Queue'));
  let arrayOfFilms;
  if (savedItems) {
    arrayOfFilms = savedItems.movieIDQueue;
  }

  if (arrayOfFilms && arrayOfFilms.length && !arrayOfFilms.includes(id)) {
    arrayOfFilms.push(id);
  } else if (arrayOfFilms && arrayOfFilms.length && arrayOfFilms.includes(id)) {
    arrayOfFilms = arrayOfFilms.filter(el => el !== id);
  } else {
    arrayOfFilms = [];
    arrayOfFilms.push(id);
  }

  let movieIdStorageQueue = {
    movieIDQueue: arrayOfFilms,
  };

  localStorage.setItem('Queue', JSON.stringify(movieIdStorageQueue));
}

export { watchedLocalStorage, queueLocalStorage, onWatchedClick };
