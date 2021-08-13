
import { showFilmsOnSearch } from './renderTrendingFilms.js';
import renderFilmsTmp from '../templates/renderTrendingFilms.hbs';
import FilmsApiService from './apiService';
import getRefs from './refs.js';

const filmsApiService = new FilmsApiService();
const refs = getRefs();

refs.searchForm.addEventListener('submit', onSearch);

function getGenres() {
  const { genres } = allGenres;

  return genres;
}

async function onSearch(e) {
  e.preventDefault();
  const searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    return;
  }

  filmsApiService.resetPage();

  try {
    await showFilmsOnSearch(searchQuery);
  } catch (error) {
    console.log(error);
  }
}
