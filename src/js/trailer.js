import FilmsApiService from './apiService';
const films = new FilmsApiService();

export default function getFilmKey(galleryCardId) {
  return films.fetchFilmsById(galleryCardId).then(data => {
    console.log(data);
    return trailer.setAttribute('href', `https://www.youtube.com/embed/${data}`);
  });
}
