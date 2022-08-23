const searchVal = document.getElementById("search-val");
const searchBtn = document.getElementById("search-btn");
let moviesID = [];
let movies = [];

searchBtn.addEventListener("click", searchMovie);
searchVal.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchMovie();
  }
});

async function searchMovie() {
  let title = searchVal.value;
  const res = await fetch(`https://omdbapi.com/?s=${title}&apikey=74d77716`);
  const data = await res.json();
  searchVal.value = "";
  document.getElementById("movies-list").innerHTML = "";
  if (data.Search) {
    moviesID = data.Search.map(function (movieID) {
      return movieID.imdbID;
    });

    for (let i = 0; i < moviesID.length; i++) {
      let id = moviesID[i];
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=74d77716&i=${id}`
      );
      const data = await res.json();
      updateMovie(data);
    }
  } else {
    document.getElementById(
      "movies-list"
    ).innerHTML = `  <div class="initial-text">
      <h2>Oops! We didn't find anything. Please try another search.</h2>
      </div>`;
  }
}

function updateMovie(movie) {
  let { Title, Runtime, Genre, Plot, imdbRating, Poster } = movie;
  document.getElementById("movies-list").innerHTML += `
  
  <div class="container">
    <div class="flex">
        <div class="left-container">
            <img class="movie-poster" src=${Poster} alt="N/A">
        </div>
        <div class="right-container">
            <div class="flex top">
                <h2 class="title">${Title}</h2>
                <p class="imdb-rating">⭐ ${imdbRating}</p>
            </div>
            <div class="flex middle">
                <p class="runtime">${Runtime}</p>
                <p class="genre">${Genre}</p>
                <button id="watchlist-btn" type="submit">+</button>
            </div>
            <div class="bottom">
                <p class="plot">${Plot}</p>
            </div>
        </div>
    </div>
</div>

  `;
}