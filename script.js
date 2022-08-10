"use strict";

//////////////////////////////////
// Elements
const nav = document.querySelector(".nav");

// Account overview Elements
const entryForm = document.querySelector(".entryForm");
const inputType = document.querySelector(".form__input--type");
const inputMovieTitle = document.querySelector(".form__input--movie_title");
const inputMusicArtist = document.querySelector(".form__input--music_artist");
const inputMovieDirector = document.querySelector(
  ".form__input--movie_director"
);
const inputMusicAlbum = document.querySelector(".form__input--music_album");
const inputPersonalRating = document.querySelector(
  ".form__input--personal_ratings"
);

const formBtn = document.querySelector(".form__btn");

const movieContainer = document.querySelector(".movie__container");
const musicContainer = document.querySelector(".music__container");

const movieTable = document.querySelector(".movie__table");
const musicTable = document.querySelector(".music__table");

/////////////////////////////////////
// Trying some counts
const account1 = {
  title: "The Godfather",
  director: "Francis Ford-Coppola",
  personalRating: 4.75,
  appRating: 5.0,
};

/////////////////////////////
// Page navigation
document
  .querySelector(".nav__container")
  .addEventListener("click", function (e) {
    e.preventDefault();

    // Matching strategy
    if (e.target.classList.contains("btn--page__nav")) {
      const id = e.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }

    if (e.target.classList.contains("btn--page__new")) {
      const pageValue = e.target.getAttribute("href");
      window.location.href = pageValue;
    }
  });

///////////////////////////
// REVEAL SECTIONS

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

////////////////////////////
// STICKY NAVIAGATION

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// account_overview section

// Classes

class Rating {
  date = new Date();

  constructor(pRating) {
    this.personalRating = pRating;
  }
}

class Movie extends Rating {
  type = "movie";

  constructor(title, director, pRating) {
    super(pRating);
    this.movieTitle = title;
    this.movieDirector = director;
  }
}

class Music extends Rating {
  type = "music";

  constructor(artist, album, pRating) {
    super(pRating);
    this.musicArtist = artist;
    this.musicAlbum = album;
  }
}

// const movie1 = new Movie("The Godfather", "Jeff", 4.57);
// console.log(movie1);

class App {
  #ratings = [];

  constructor() {
    // Get data from local storage
    this._getLocalStorage();

    // Get data from form
    entryForm.addEventListener("submit", this._newEntry.bind(this));
    formBtn.addEventListener("click", this._newEntry.bind(this));
  }

  _newEntry(e) {
    e.preventDefault();

    // Get data from form
    const type = inputType.value;
    const personalRating = +inputPersonalRating.value;
    let entry;

    // If entry movie, create movie object
    if (type === "movie") {
      const movieTitle = inputMovieTitle.value;
      const movieDirector = inputMovieDirector.value;

      if (movieTitle == "" || movieDirector == "")
        return alert("Enter a movie title and its director");

      entry = new Movie(movieTitle, movieDirector, personalRating);
    }

    // if entry music, create music object
    if (type === "music") {
      const musicArtist = inputMusicArtist.value;
      const musicAlbum = inputMusicAlbum.value;

      if (musicArtist == "" || musicAlbum == "")
        return alert("Enter a movie title and its director");

      entry = new Music(musicArtist, musicAlbum, personalRating);
    }

    this.#ratings.push(entry);

    this._renderEntry(entry);

    this._setLocalStorage();
  }

  _renderEntry(entry) {
    console.log(entry);
    if (entry.type === "movie") {
      let html = `
      <tr class="table__header movie__header">
        <td class="movie__title column__1">${entry.movieTitle}</td>
        <td class="movie__director column__2">${entry.movieDirector}</td>
        <td class="${entry.type}__your_ratings column__3">${entry.personalRating}</td>
        </tr>
      `;
      movieTable.insertAdjacentHTML("beforeend", html);
    }
    if (entry.type === "music") {
      let html = `
      <tr class="table__header movie__header">
        <td class="music__artist column__1">${entry.musicAlbum}</td>
        <td class="music__album column__2">${entry.musicArtist}</td>
        <td class="${entry.type}__your_ratings column__3">${entry.personalRating}</td>
        </tr>
      `;
      musicTable.insertAdjacentHTML("beforeend", html);
    }
  }

  _setLocalStorage() {
    localStorage.setItem("ratings", JSON.stringify(this.#ratings));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("ratings"));

    if (!data) return;

    this.#ratings = data;

    this.#ratings.forEach((rating) => {
      this._renderEntry(rating);
    });
  }
}
const app = new App();
