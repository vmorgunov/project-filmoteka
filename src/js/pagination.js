import renderFilmsTmp from '../templates/renderTrendingFilms.hbs';
import getRefs from './refs.js';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import { renderFilms, getGenres } from './renderTrendingFilms.js';
const API_KEY = '3df6184500ed5682d4d34cc3cdc4b7c7';
const BASE_URL = 'https://api.themoviedb.org/3/';
const refs = getRefs();
const container = document.getElementById('tui-pagination-container');
const instance = new Pagination(container, {
  totalItems: 10,
  itemsPerPage: 10,
  visiblePages: 10,
  page: 1,
  centerAlign: true,
});

const page = instance.getCurrentPage();
fetchImages(page).then(data => {
  console.log(data);
  instance.reset(data.total_pages);
});

instance.on('afterMove', event => {
  const currentPage = event.page;
  fetchImages(currentPage).then(data => {
    renderFilms(data.results);
    renderGenresHome1(data.results);
    showFilms1(event.page);
  });
});

function fetchImages(page) {
  return fetch(`${BASE_URL}trending/movie/week?api_key=${API_KEY}&page=${page}`).then(res =>
    res.json(),
  );
}

function showFilms1(page) {
  fetchImages(page).then(data => {
    renderGenresHome1(data.results);
  });
}

function renderGenresHome1(data) {
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
  renderFilms1(newData);
}

function renderFilms1(films) {
  const markup = renderFilmsTmp(films);
  refs.container.innerHTML = markup;
}
