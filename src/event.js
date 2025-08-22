import {
  addHeadBg,
  checkEmptyList,
  closeMenuRmHeadBg,
  openMenuAddHeadBg,
  rmDropDown,
  rmHeadBg,
  toggleIcon,
  updateDebounce,
} from "./helper";
import { FetchAndRenderRecentProfiles } from "./recentProfiles";
import { noResult } from "./searchSugg";

const menubtn = document.querySelector(".menu-btn");
const header = document.getElementById("main-header");
const dropDownMenu = document.getElementById("drop-down-menu");
const btnIcons = document.querySelectorAll(".menu-btn span");
const formInput = document.querySelector("form");
const searchInput = formInput.elements.searchInput;
const searchBtn = document.getElementById("search-btn");
const searchSuggCon = document.getElementById("search-suggestions");
const searchSuggResults = document.querySelector("#search-sugg-results");
const listitem = document.querySelector("#search-sugg-results li");
const searchPage = document.getElementById("search-page");
const profileDetailsCon = document.querySelector(".profile-details");
const explore = document.querySelector(".explore-btn");
const recentProfilesUl = document.getElementById("recent-profiles");
const scrollDown = document.querySelector(".scroll-down");

const store = {
  isMenuOpen: false,
};
export {
  header,
  dropDownMenu,
  btnIcons,
  store,
  searchSuggResults,
  searchInput,
  profileDetailsCon,
  recentProfilesUl,
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 6) {
    rmDropDown();
    addHeadBg();
    scrollDown.classList.add("opacity-0");
  } else {
    rmHeadBg();
    scrollDown.classList.remove("opacity-0");
  }

  rmDropDown();
});

menubtn.addEventListener("click", (e) => {
  const btnIcons = [...menubtn.children];
  toggleIcon(btnIcons);
  if (!store.isMenuOpen) {
    openMenuAddHeadBg();
  } else {
    closeMenuRmHeadBg();
  }

  if (e.target.matches(".close-btn")) {
    if (window.scrollY > 4) addHeadBg();
  }
});

dropDownMenu.addEventListener("click", (e) => {
  if (e.target.matches("a")) rmDropDown();
  if (e.target.matches(".about")) closeMenuRmHeadBg();
});

searchInput.addEventListener("input", (e) => {
  if (e.target.value !== "") {
    searchSuggCon.classList.remove("hidden");
    noResult.classList.add("hidden");
    searchSuggResults.innerHTML = "";
    updateDebounce(e.target.value.toLowerCase().trim());
  } else searchSuggCon.classList.add("hidden");
});

profileDetailsCon.addEventListener("click", (e) => {
  if (e.target.matches(".close")) {
    FetchAndRenderRecentProfiles();
    profileDetailsCon.classList.add("hidden");
    searchSuggCon.classList.add("hidden");
    searchInput.value = "";
    recentProfilesUl.innerHTML = "";
    checkEmptyList();
  }
});
explore.addEventListener("click", () => {
  const landingPage = document.querySelector(".landing-page");
  const searchPage = document.querySelector("#search-page");
  landingPage.classList.add("hidden");
});
