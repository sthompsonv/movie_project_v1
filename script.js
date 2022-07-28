"use strict";

//////////////////////////////////
// Elements
const nav = document.querySelector(".nav");

// Account overview Elements
const entryForm = document.querySelector(".entry__container");

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
