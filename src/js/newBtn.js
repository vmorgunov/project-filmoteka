import getRefs from './refs';
// import FilmsApiService from './apiService';
import { renderFilmADay, showFilms } from './renderTrendingFilms';

const refs = getRefs();

refs.dayTrend.addEventListener('click', onDayTrend);
refs.weekTrend.addEventListener('click', onWeekTrend);

function onDayTrend(e) {
  if (e.target === e.currentTarget) {
    renderFilmADay();
  }
}

function onWeekTrend(e) {
  if (e.target === e.currentTarget) {
    showFilms(1);
  }
}
