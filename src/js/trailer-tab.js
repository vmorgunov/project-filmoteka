import FilmsApiService from './api-service';
const films = new FilmsApiService();

export default function getTrailer(galleryCardId) {
  const trailerTab = document.querySelector('#trailer');
  return films.fetchFilmsById(galleryCardId).then(data => {
    return trailerTab.setAttribute('href', `https://www.youtube.com/embed/${data}`);
  });
}
