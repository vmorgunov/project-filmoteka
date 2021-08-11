import renderFilmsTmp from '../templates/renderTrendingFilms.hbs';
import genres from '../js/genres.js';

import FilmsApiService from './apiService';
import getRefs from './refs.js';

const films = new FilmsApiService();
const refs = getRefs();

function renderTrendingFilms(films) {
  const markup = renderFilmsTmp(films);
  refs.container.insertAdjacentHTML('afterbegin', markup);
  //   renderGenresHome(genres);
}

function showFilms() {
  films.fetchTrendingFilms().then(data => {
    console.log(data);
    renderGenresHome(data);
    renderTrendingFilms(data);
  });
}

showFilms();

function renderGenresHome(data) {
  const newData = data.map(el => {
    let newGenres = [];
    el.genre_ids.map(id => {
      const foundId = genres.find(el => el.id === id);
      newGenres.push(foundId.name);
    });
    if (newGenres.length >= 3) {
      const normalGenres = newGenres.slice(0, 2);
      normalGenres.push('Other');
      el.genre_ids = normalGenres.join(', ');
      el.release_date = el.release_date.slice(0, 4);
    } else {
      el.genres_ids = newGenres.join(', ');
      if (el.release_date) el.release_date = el.release_date.slice(0, 4);
    }
    return el;
  });
  renderTrendingFilms(newData);
}
