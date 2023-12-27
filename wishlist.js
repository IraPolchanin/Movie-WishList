const wishlistContainer = document.getElementById('wishlist-container');
let moviesFromLS = JSON.parse(localStorage.getItem('wishlist')) || [];
let filteredMovieArr = [...moviesFromLS];

if (moviesFromLS.length > 0) {
  renderWishlist(moviesFromLS)
} else {
  renderStartWishlist()
};

document.addEventListener('click', e => {
  if (e.target.dataset.action === 'del-btn') {
    removeFromWishlist(e.target.parentElement.id);
  }
});

function removeFromWishlist(movieID) {
  filteredMovieArr = filteredMovieArr.filter(movie => movie.imdbID !== movieID);
  localStorage.removeItem('wishlist');
  localStorage.setItem('wishlist', JSON.stringify(filteredMovieArr))
  renderWishlist(filteredMovieArr);
  if (filteredMovieArr.length < 1) {
    renderStartWishlist()
  }
};

function renderWishlist(moveis) {
  wishlistContainer.innerHTML = moveis.map(movie => `
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
        <button class="movie-card__btn movie-card__btn-del" type="button" data-action="del-btn">Remove</button>
      </div>
      <p class="movie-card__plot">${movie.Plot}</div>
        </div>
 `).join('');
};

function renderStartWishlist() {
  wishlistContainer.innerHTML = `
    <div class="movies-container__start">
      <p class="movies-container__start-text">Your watchlist is looking a little empty...</p>
      <a class="wishlist-container__link movie-card__btn movie-card__btn-add" href="./index.html">
        Let’s add some movies!
      </a>
    </div>
`
};
