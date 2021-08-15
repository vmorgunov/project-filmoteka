function watchedLocalStorage(id) {
  const savedItems = JSON.parse(localStorage.getItem('Watched'));
  let arrayOfFilms;
  if (savedItems) {
    arrayOfFilms = savedItems.MovieIDWatched;
  }

  if (arrayOfFilms && arrayOfFilms.length && !arrayOfFilms.includes(id)) {
    arrayOfFilms.push(id);
  } else if (arrayOfFilms && arrayOfFilms.length && arrayOfFilms.includes(id)) {
    arrayOfFilms = arrayOfFilms.filter(el => el !== id);
  } else {
    arrayOfFilms = [];
    arrayOfFilms.push(id);
  }

  let movieIdStorageWatched = {
    MovieIDWatched: arrayOfFilms,
  };

  localStorage.setItem('Watched', JSON.stringify(movieIdStorageWatched));
}

function queueLocalStorage(id) {
  const savedItems = JSON.parse(localStorage.getItem('Queue'));
  let arrayOfFilms;
  if (savedItems) {
    arrayOfFilms = savedItems.MovieIDQueue;
  }

  if (arrayOfFilms && arrayOfFilms.length && !arrayOfFilms.includes(id)) {
    arrayOfFilms.push(id);
  } else if (arrayOfFilms && arrayOfFilms.length && arrayOfFilms.includes(id)) {
    arrayOfFilms = arrayOfFilms.filter(el => el !== id);
  } else {
    arrayOfFilms = [];
    arrayOfFilms.push(id);
  }

  let movieIdStorageQueue = {
    MovieIDQueue: arrayOfFilms,
  };

  localStorage.setItem('Queue', JSON.stringify(movieIdStorageQueue));
}

export { watchedLocalStorage, queueLocalStorage };
