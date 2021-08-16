import axios from 'axios';

export default class FilmsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.BASE_URL = 'https://api.themoviedb.org/3/';
    this.API_KEY = '3df6184500ed5682d4d34cc3cdc4b7c7';
  }

  /**Finction fetching 20 film per page, trending film for a week */
  async fetchTrendingFilms(page) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}trending/movie/week?api_key=${this.API_KEY}&page=${page}`,
      );
      return response.data; /**Destructing og DATA in renderTrendingFilms.js */
    } catch (error) {
      console.log(error);
    }
  }

  /*!!!-----Finction fetching 1 film by searchQuery. API can return more than one film (info for render) */
  async fetchSearchingFilms(searchQuery, page) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}search/movie?api_key=${this.API_KEY}&query=${searchQuery}&page=${page}`,
      );
      /*Returns obj {about, image, vote, votes, popularity, title, genre(array), date } */
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchFilmsInfo(id) {
    try {
      const response = await axios.get(`${this.BASE_URL}/movie/${id}?api_key=${this.API_KEY}`);
      return {
        ...response.data,
        popularity: response.data.popularity.toFixed(1),
        title: response.data.title.toUpperCase(),
        original_title: response.data.original_title.toUpperCase(),
      }; /**Destructing og DATA in renderTrendingFilms.js */
    } catch (error) {
      console.log(error);
    }
  }

  //search film by id for trailers
  async fetchFilmsById(movie_id) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}movie/${movie_id}/videos?api_key=${this.API_KEY}&language=en-US`,
      );
      /*Returns obj {about, image, vote, votes, popularity, title, genre(array), date } */

      return response.data.results[0].key;
    } catch (error) {
      console.log(error);
    }
  }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
