import FilmsApiService from './apiService';
import getRefs from './refs.js';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { showFilms, showFilmsOnSearch, renderGenresHome, renderFilms } from './renderTrendingFilms.js'

const refs = getRefs();

refs.searchForm.addEventListener('submit', wordInput);

// PAGINATION ON TRENDING FILMS
const container = document.getElementById('tui-pagination-container');
const instance = new Pagination(container, {
    totalItems: 10,
    itemsPerPage: 10,
    visiblePages: 5,
    page: 1,
    centerAlign: true,
});

const films = new FilmsApiService();
const page = instance.getCurrentPage();

films.fetchTrendingFilms(page).then(data => {
  console.log(data);
  instance.reset(data.total_pages);
})

instance.on('afterMove', (event) => {
  const currentPage = event.page
  films.fetchTrendingFilms(currentPage).then(data => {
    renderFilms(data.results);
    renderGenresHome(data.results);
    showFilms(event.page);
  });
});

// PAGINATION ON SEARCH FILMS

const containerSearch = document.getElementById('tui-pagination-container-search');
const instanceSearch = new Pagination(containerSearch, {
  totalItems: 10,
  itemsPerPage: 10,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
});

const pageSearch = instanceSearch.getCurrentPage();

function wordInput(e) {
  e.preventDefault(e);
  container.style.display = 'none';
  containerSearch.style.display = 'block';
  const searchQuery = e.currentTarget.elements.searchQuery.value.trim();
  films.fetchSearchingFilms(searchQuery, pageSearch).then(data => {
    console.log(data);
    instanceSearch.reset(data.total_pages);
  })
  
  instanceSearch.on('afterMove', (event) => {
    const currentPage = event.page
    films.fetchSearchingFilms(searchQuery, currentPage).then(data => {
      renderFilms(data.results);
      renderGenresHome(data.results);
      showFilmsOnSearch(searchQuery, event.page);
    });
  });
}

window.onload = containerSearch.style.display = 'none';