import renderFilmsTmp from '../templates/renderTrendingFilms.hbs';
import allGenres from '../js/genres.json';

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
function renderTrendingFilms(films) {
  const markup = renderFilmsTmp(films);
  refs.container.insertAdjacentHTML('afterbegin', markup);
}

function showFilms() {
  films.fetchTrendingFilms().then(data => {
    renderGenresHome(data);
  });
}

function showFilmsOnSearch(searchQuery) {
  films.fetchSearchingFilms(searchQuery).then(data => {
    renderGenresHome(data);
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
  renderTrendingFilms(newData);
}

window.onload = showFilms();

export { showFilms, showFilmsOnSearch };
