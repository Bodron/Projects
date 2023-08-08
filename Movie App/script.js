const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=528baea918ca2a19824bd4658a89a2e9&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=528baea918ca2a19824bd4658a89a2e9&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const page = document.getElementById('paging')
// Get intial movies

getMovies(API_URL, 1)

async function getMovies(url, page) {
  const res = await fetch(url + page)
  const data = await res.json()
  showMovies(data.results)
}

function showMovies(movies) {
  main.innerHTML = ''

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie

    const movieEl = document.createElement('div')
    movieEl.classList.add('movie')
    movieEl.innerHTML = `<div class="movie">
    <img
      src="${IMG_PATH + poster_path}"
      alt="${title}"
    />
    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h3>Overview</h3>
      ${overview}
    </div>
  </div>`
    main.appendChild(movieEl)
  })
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return 'orange'
  } else {
    return 'red'
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const searchTerm = search.value

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm)
    search.value = ''
  } else {
    window.location.reload()
  }
})
function nextPage() {
  let elPage = page.innerText
  let pageNum = Number(elPage)
  getMovies(API_URL, pageNum + 1)
  page.innerHTML = `
      <a onclick="previousPage();">
      <i class="fa fa-angle-double-left">
      </i>
      </a>
  ${pageNum + 1}
      <a onclick="nextPage();">
      <i class="fa fa-angle-double-right">
      </i>
      </a>
  `
  scroll(0, 0)
}
function previousPage() {
  let elPage = page.innerText
  let pageNum = Number(elPage)
  getMovies(API_URL, pageNum + 1)
  if (pageNum === 2) {
    page.innerHTML = `${pageNum - 1}
      <a onclick="nextPage();">
      <i class="fa fa-angle-double-right">
      </i>
      </a>
  `
  } else {
    page.innerHTML = `
      <a onclick="previousPage();">
      <i class="fa fa-angle-double-left">
      </i>
      </a>
  ${pageNum - 1}
      <a onclick="nextPage();">
      <i class="fa fa-angle-double-right">
      </i>
      </a>
  `
  }
  scroll(0, 0)
}
