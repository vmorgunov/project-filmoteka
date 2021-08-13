import renderFilmsTmp from '../templates/renderTrendingFilms.hbs';
import FilmsApiService from './apiService';
import getRefs from './refs.js';
import Notiflix from 'notiflix';
import allGenres from '../js/genres.json';

const filmsApiService = new FilmsApiService();
const refs = getRefs();

refs.searchForm.addEventListener('submit', onSearch);

function getGenres() {
  const { genres } = allGenres;

  return genres;
}

async function onSearch(e) {
  e.preventDefault();

  filmsApiService.searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  if (filmsApiService.searchQuery === '') {
    return;
  }

  filmsApiService.resetPage();

  try {
    const getFilms = await filmsApiService.fetchSearchingFilms();
    if (getFilms.length === 0) {
      onInputError();
    }
    if (getFilms.length > 0) {
      refs.container.innerHTML = '';
      findMessage(getFilms.length);
      renderGenresSearch(getFilms);
    }
  } catch (error) {
    console.log(error);
  }
}

function renderGenresSearch(data) {
  const newData = data.map(el => {
    let newGenres = [];
    el.genre_ids.map(id => {
      const foundId = getGenres().find(el => el.id === id);
      newGenres.push(foundId.name);
    });
    if (newGenres.length >= 3) {
      const normalGenres = newGenres.slice(0, 2);
      normalGenres.push('Other');
      el.genre_ids = normalGenres.join(', ');
      el.release_date = el.release_date.slice(0, 4);
    } else {
      el.genre_ids = newGenres.join(', ');
      if (el.release_date) el.release_date = el.release_date.slice(0, 4);
    }
    return el;
  });
  renderFilms(newData);
}

function renderFilms(films) {
  const markup = renderFilmsTmp(films);
  refs.container.insertAdjacentHTML('afterbegin', markup);
}

function onInputError() {
  Notiflix.Notify.failure(
    'Search result not successful. Enter the correct movie name and try again',
  );
}

function findMessage(message) {
  Notiflix.Notify.info(`Let's go! We found ${message} films.`);
}
