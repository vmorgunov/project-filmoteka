import FilmsApiService from './api-service';
import getRefs from './refs.js';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import {
  showFilms,
  showFilmsOnSearch,
  renderGenresHome,
  renderFilms,
} from './render-trending-films.js';

const refs = getRefs();

refs.searchForm.addEventListener('submit', wordInput);
refs.homeEl.addEventListener('click', clickHomeFilms);

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

topFilmsRender();

function topFilmsRender() {
  films.fetchTrendingFilms(page).then(data => {
    instance.reset(data.total_pages);
  });

  instance.on('afterMove', event => {
    const currentPage = event.page;
    films.fetchTrendingFilms(currentPage).then(data => {
      renderFilms(data.results);
      renderGenresHome(data.results);
      showFilms(event.page);
    });
  });
}
function clickHomeFilms() {
  topFilmsRender();
}

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
  setPaginationOnHome('none');
  setPaginationOnSearch('block');
  const searchQuery = e.currentTarget.elements.searchQuery.value.trim();
  films.fetchSearchingFilms(searchQuery, pageSearch).then(data => {
    instanceSearch.reset(data.total_pages);
  });

  instanceSearch.on('afterMove', event => {
    const currentPage = event.page;
    films.fetchSearchingFilms(searchQuery, currentPage).then(data => {
      renderFilms(data.results);
      renderGenresHome(data.results);
      showFilmsOnSearch(searchQuery, event.page);
    });
  });
}

window.onload = setPaginationOnSearch('none');

function removePagination(makrup) {
  containerSearch.style.display = makrup;
  container.style.display = makrup;
}

function setPaginationOnHome(markup) {
  container.style.display = markup;
}

function setPaginationOnSearch(markup) {
  containerSearch.style.display = markup;
}

export { removePagination, setPaginationOnHome };
