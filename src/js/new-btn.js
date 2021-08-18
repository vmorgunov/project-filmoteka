import getRefs from './refs';
// import FilmsApiService from './apiService';
import { renderFilmADay, showFilms } from './render-trending-films.js';

const refs = getRefs();
weekTrendActiveBtn();

refs.dayTrend.addEventListener('click', onDayTrend);
refs.weekTrend.addEventListener('click', onWeekTrend);

function onDayTrend(e) {
  if (e.target === e.currentTarget) {
    dayTrendActiveBtn();
    renderFilmADay();
  }
}

function onWeekTrend(e) {
  if (e.target === e.currentTarget) {
    weekTrendActiveBtn();
    showFilms(1);
  }
}

function dayTrendActiveBtn() {
  refs.weekTrend.classList.remove('is-active');
  refs.dayTrend.classList.add('is-active');
}

function weekTrendActiveBtn() {
  refs.weekTrend.classList.add('is-active');
  refs.dayTrend.classList.remove('is-active');
}
