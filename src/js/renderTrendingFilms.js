import renderFilmsTmp from '../templates/renderTrendingFilms.hbs'
import FilmsApiService from './apiService'
import getRefs from './refs.js'

const films = new FilmsApiService();
const refs = getRefs();

function renderTrendingFilms (films) {
    const markup = renderFilmsTmp(films);
    refs.container.insertAdjacentHTML('afterbegin', markup)
   
}

function showFilms (){
    films.fetchTrendingFilms().then((data)=> {
        renderTrendingFilms(data);
    })
}

showFilms();