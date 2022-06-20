const API_KEY = "f3e43c9e4e82d85a24170e837345bbec";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
    language: "es",
  },
});

async function getTrendingMoviePreview() {
  const respuesta = await api(`trending/movie/day`);

  const movies = respuesta.data.results;

  trendingMoviesPreviewList.innerHTML = "";

  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
    );

    movieContainer.appendChild(movieImg);
    trendingMoviesPreviewList.appendChild(movieContainer);
  });
}

async function getCategoriesPreview() {
  const respuesta = await api("genre/movie/list");

  const categories = respuesta.data.genres;

  categoriesPreviewList.innerHTML = "";

  categories.forEach((category) => {
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    const categoryTitle = document.createElement("h3");
    categoryTitle.classList.add("category-title");

    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryTitle.setAttribute("id", `id${category.id}`);
    categoryTitle.addEventListener("click", () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
    categoryContainer.appendChild(categoryTitle);
    categoriesPreviewList.appendChild(categoryContainer);
  });
}

async function getMoviesByCategory(id) {
  const respuesta = await api(`/discover/movie`, {
    params: {
      with_genres: id,
    },
  });

  const movies = respuesta.data.results;

  genericSection.innerHTML = "";

  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
    );

    movieContainer.appendChild(movieImg);
    genericSection.appendChild(movieContainer);
  });
}
