import FilmsApiService from './api-service';
import getRefs from './refs.js';
import { showFilmsOnSearch } from "./render-trending-films.js"

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
    await showFilmsOnSearch(searchQuery);
  } catch (error) {
    console.log(error);
  }
}
