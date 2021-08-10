import axios from "axios";

export default class FilmsApiService {
    constructor() {
      this.searchQuery = '';
      this.page = 1;
      this.BASE_URL='https://api.themoviedb.org/3/'
      this.API_KEY = '3df6184500ed5682d4d34cc3cdc4b7c7';
    }
    
    /**Finction fetching 20 film per page, trending film for a week */
    async fetchTrendingFilms() {
      try {
        const response = await axios.get(
          `${this.BASE_URL}trending/movie/week?api_key=${this.API_KEY}`,
        );  
        /*Returns obj {vote, votes, popularity, title, genre(array), date */
        return {vote: response.data.results.vote_average,  votes: response.data.results.vote_count, popularity: response.data.results.popularity, title: response.data.results.title, genre: response.data.results.genre_ids, date: response.data.results.release_date};
      } catch (error) {
        console.log(error);
       
      }
    }

    /*!!!-----Finction fetching 1 film by searchQuery. API can return more than one film (info for render) */
    async fetchSearchingFilm() {
        try {
          const response = await axios.get(
            `${this.BASE_URL}search/movie?api_key=${this.API_KEY}&query=${this.searchQuery}`,
          );  
          /*Returns obj {vote, votes, popularity, title, genre(array), date */
          return {vote: response.data.results.vote_average,  votes: response.data.results.vote_count, popularity: response.data.results.popularity, title: response.data.results.title, genre: response.data.results.genre_ids, date: response.data.results.release_date};
        } catch (error) {
          console.log(error);
         
        }
      }




    resetPage() {
      this.page = 1;
    }
  

}


