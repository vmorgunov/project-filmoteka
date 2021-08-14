import renderFilmsTmp from '../templates/renderTrendingFilms.hbs';
import allGenres from '../js/genres.json';
import { onInputError, findMessage } from './notifications.js';
import FilmsApiService from './apiService';
import getRefs from './refs.js';

const films = new FilmsApiService();
const refs = getRefs();

//get all genres from json file
function getGenres() {
  const { genres } = allGenres;
  return genres;
}

//Render films markup
function renderFilms(films) {
  const markup = renderFilmsTmp(films);
  refs.container.innerHTML = markup;
}

function showFilms(page) {
  films.fetchTrendingFilms(page).then(data => {
    renderGenresHome(data.results);
  });
}
//Render films on Search
function showFilmsOnSearch(searchQuery, page) {
  films.fetchSearchingFilms(searchQuery, page).then(data => {
    if (data.length === 0) {
      onInputError();
    }
    if (data.length > 0) {
      refs.container.innerHTML = '';
      findMessage(data.length);
    }
    renderGenresHome(data.results);
  });
}

//Getting correct data with all genres for rendering on home-page
function renderGenresHome(data) {
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

window.onload = showFilms(1);

export { showFilms, showFilmsOnSearch, renderGenresHome, renderFilms, getGenres };
