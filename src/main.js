const API_KEY = "f3e43c9e4e82d85a24170e837345bbec";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {},
  params: {
    api_key: API_KEY,
  },
});

async function getTrendingMoviePreview() {
  const respuesta = await fetch(`trending/movie/day?api_key=${api_key}`);

  const data = await respuesta.json();
  console.log(data);

  const movies = data.results;
  console.log(
    "🚀 ~ file: main.js ~ line 12 ~ getTrendingMoviePreview ~ movies",
    movies
  );

  movies.forEach((movie) => {
    const trendingPreviewMoviesContainer = document.querySelector(
      "#trendingPreview .trendingPreview-movieList"
    );

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
    trendingPreviewMoviesContainer.appendChild(movieContainer);
  });
}

async function getCategoriesPreview() {
  const respuesta = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`
  );

  const data = await respuesta.json();
  console.log(data);

  const categories = data.genres;
  console.log(
    "🚀 ~ file: main.js ~ line 47 ~ getCategoriesPreview ~ categories",
    categories
  );

  categories.forEach((category) => {
    const previewCategoriesContainer = document.querySelector(
      "#categoriesPreview .categoriesPreview-list"
    );

    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    const categoryTitle = document.createElement("h3");
    categoryTitle.classList.add("category-title");

    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryTitle.setAttribute("id", `id${category.id}`);
    categoryContainer.appendChild(categoryTitle);
    previewCategoriesContainer.appendChild(categoryContainer);
  });
}

getTrendingMoviePreview();
getCategoriesPreview();
