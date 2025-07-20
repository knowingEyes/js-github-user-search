import {
  addHeadBg,
  checkEmptyList,
  closeMenuRmHeadBg,
  openMenuAddHeadBg,
  recentProfiles,
  render,
  renderToUl,
  rmDropDown,
  rmHeadBg,
  showUserDetails,
  toggleIcon,
  updateDebounce,
} from "./helper";

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
// let controller;
// let signal;

const store = { isMenuOpen: false };
export {
  header,
  dropDownMenu,
  btnIcons,
  store,
  searchSuggResults,
  searchInput,
  profileDetailsCon,
  recentProfilesUl,
  // signal,
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 4) {
    rmDropDown();
    addHeadBg();
  } else {
    rmHeadBg();
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
searchBtn.addEventListener("click", () => {
  formInput.classList.remove("opacity-0");
});

searchInput.addEventListener("input", (e) => {
  if (e.target.value !== "") {
    searchSuggCon.classList.remove("hidden");
    searchSuggResults.innerHTML = "";
    updateDebounce(e.target.value.trim());
  } else searchSuggCon.classList.add("hidden");
});

searchSuggResults.addEventListener("click", showUserDetails);
recentProfilesUl.addEventListener("click", showUserDetails);

profileDetailsCon.addEventListener("click", (e) => {
  if (e.target.matches(".close")) {
    renderToUl(recentProfiles, recentProfilesUl);
    profileDetailsCon.classList.add("hidden");
    searchSuggCon.classList.add("hidden");
    searchInput.value = "";
    recentProfilesUl.innerHTML = ""
    checkEmptyList()
    
  }
});
explore.addEventListener("click", () => {
  const landingPage = document.querySelector(".landing-page");
  const searchPage = document.querySelector("#search-page");
  landingPage.classList.add("hidden");
});



