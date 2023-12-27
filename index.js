const form = document.getElementById('form');
const movieTitleInput = document.getElementById('movie-title');
const moviesContainer = document.getElementById('movies-container');

let moviesArray = [];
let favMoviesArray = JSON.parse(localStorage.getItem('wishlist')) || [];
let movieTitleValue;
let savedMovies = JSON.parse(localStorage.getItem('moviesFromAPI')) || [];
if (savedMovies.length > 0) {
  renderMovieCards(savedMovies)
}

let favMoviesFromLS = JSON.parse(localStorage.getItem('wishlist')) || [];

function checkBtn() {
  const favIds = favMoviesArray.map(movie => movie.imdbID)
  for (let favId of favIds) {
    const movieCardBtn = document.getElementById(favId).children[2];
    movieCardBtn.textContent = '✔️ saved';
    movieCardBtn.classList.remove('movie-card__btn-add')
  }
}
if (favMoviesArray.length > 0) {
  checkBtn()
}

document.addEventListener('click', e => {
  if (e.target.dataset.action === 'add-btn') {
    saveToStorage(e.target.parentElement.id);
    e.target.textContent = '✔️ saved';
    e.target.classList.remove('movie-card__btn-add')
  }
})

form.addEventListener('submit', e => {
  e.preventDefault();
  if (savedMovies.length > 0) {
    localStorage.removeItem('moviesFromAPI');
    moviesArray = [];
  }
  movieTitleValue = movieTitleInput.value;
  fetch(`http://www.omdbapi.com/?s=${movieTitleValue}&type=movie&apikey=b3e259e1`)
    .then(resp => resp.json())
    .then(data => {
      if (data.Search) {
        data.Search.map(movie => getMovieDetails(movie.imdbID))
      } else {
        moviesContainer.innerHTML = `
      <div class="movies-container__start">
        <p class="movies-container__start-text">
        Unable to find what you’re looking for. Please try another search.
        </p>
      </div>`
      }
    })
  movieTitleInput.value = '';
})

function getMovieDetails(movieId) {
  requestUrl = `https://www.omdbapi.com/?i=${movieId}&type=movie&apikey=b3e259e1`
  fetch(requestUrl)
    .then(res => res.json())
    .then(data => {
      moviesArray.push(data)
      localStorage.setItem('moviesFromAPI', JSON.stringify(moviesArray))
      savedMovies = JSON.parse(localStorage.getItem('moviesFromAPI')) || [];
      renderMovieCards(savedMovies)
    })
}

function renderMovieCards(movies) {
  moviesContainer.innerHTML = movies.map(movie => `
  <div class="movie-card">
    <img class="movie-card__poster"
      src=${movie.Poster}
      alt="Poster">
    <div class="movie-card__content">
      <div class="movie-card__top">
        <h2 class="movie-card__title">${movie.Title}</h2>
        <div class="movie-card__ratings">
          <img src="./assets/star.svg" alt="star-icon" width="15" height="15">
          <span class="movie-card__imdbRating">${movie.imdbRating}</span>
        </div>
      </div>

      <div class="movie-card__info" id=${movie.imdbID}>
        <p class="movie-card__runtime">${movie.Runtime}</p>
        <p class="movie-card__genre">${movie.Genre}</p>
        <button class="movie-card__btn movie-card__btn-add" type="button" data-action="add-btn">Watchlist</button>
      </div>
      <p class="movie-card__plot">${movie.Plot}</div>
        </div>
 `).join('');
}

function saveToStorage(movieID) {
  let favMovie = savedMovies.find(movie => movie.imdbID === movieID);
  let favMovieInd = favMoviesFromLS.findIndex(movie => movie.imdbID === movieID);
  if (favMoviesFromLS.length < 1 || favMovieInd === -1) {
    favMoviesArray.push(favMovie);
  }
  // if (favMovieInd >= 0) {
  //   handleMovieBtnState(movieID)
  // }
  localStorage.setItem('wishlist', JSON.stringify(favMoviesArray))
}

function handleMovieBtnState(movieID) {
  console.log(movieID)
}
