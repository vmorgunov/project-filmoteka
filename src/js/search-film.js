import FilmsApiService from './apiService';
import getRefs from './refs.js';
import { showFilmsOnSearch } from './renderTrendingFilms.js';
import Notiflix from 'notiflix';

const filmsApiService = new FilmsApiService();
const refs = getRefs();

refs.searchForm.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();
  const searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    return;
  }

  filmsApiService.resetPage();

  try {
    const getFilms = await showFilmsOnSearch(searchQuery);
    if (getFilms.length === 0) {
      onInputError();
    }
    if (getFilms.length > 0) {
      refs.container.innerHTML = '';
      findMessage(getFilms.length);
    }
  } catch (error) {
    console.log(error);
  }
}

function onInputError() {
  Notiflix.Notify.failure(
    'Search result not successful. Enter the correct movie name and try again',
  );
}

function findMessage(message) {
  Notiflix.Notify.info(`Let's go! We found ${message} films.`);
}
