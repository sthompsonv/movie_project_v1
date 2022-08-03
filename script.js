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

const movieContainer = document.querySelector(".movie__container");
const musicContainer = document.querySelector(".music__container");
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
    this.pRating = pRating;
  }
}

class Movie extends Rating {
  type = "movie";

  constructor(title, director, pRating) {
    super(pRating);
    this.title = title;
    this.director = director;
  }
}

class Music extends Rating {
  type = "music";

  constructor(artist, album, pRating) {
    super(pRating);
    this.artist = artist;
    this.album = album;
  }
}

class App {
  #ratings = [];

  constructor() {
    // Get data from local storage
    // Not made yet
    this._getLocalStorage();

    // Get data from form
    entryForm.addEventListener("submit", this._newEntry.bind(this));
  }

  _newEntry() {
    e.preventDefault();

    // Get data from form
    const type = inputType.value;
    const personalRating = +inputPersonalRating.value;
    let entry;

    // If entry movie, create movie object

    if (type === "movie") {
      const movieTitle = inputMovieTitle.value;
      const movieDirector = inputMovieDirector.value;
    }
    if (type === "music") {
      const musicArtist = inputMusicArtist.value;
      const musicAlbum = inputMusicAlbum.value;
    }
  }
}
