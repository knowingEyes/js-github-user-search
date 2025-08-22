import {
  btnIcons,
  dropDownMenu,
  header,
  store,
  profileDetailsCon,
  recentProfilesUl,
  userLink,
  profile,
} from "./event";
import { fetchFromApi } from "./fetch_api";
import { recentProfiles } from "./recentProfiles";
import saveToLocalStorage from "./saveToLocalStorage";
import searchForUsers from "./searchSugg";

export {
  toggleIcon,
  openMenuAddHeadBg,
  closeMenuRmHeadBg,
  resetIcon,
  rmDropDown,
  addHeadBg,
  rmHeadBg,
  debounce,
  updateDebounce,
  showUserDetailsProfileCard,
  checkEmptyList,
};
const updateDebounce = debounce(searchForUsers);

const toggleIcon = (icons) => {
  icons.forEach((icon) => icon.classList.toggle("hidden"));
};
const openMenuAddHeadBg = () => {
  header.classList.add("show-bg");
  addDropDown();
};
const closeMenuRmHeadBg = () => {
  rmHeadBg();
  rmDropDown();
};

const resetIcon = () => {
  btnIcons[1].classList.add("hidden");
  btnIcons[0].classList.remove("hidden");
};
const rmDropDown = () => {
  dropDownMenu.classList.remove("show-menu");
  store.isMenuOpen = false;
  resetIcon();
};
const addDropDown = () => {
  dropDownMenu.classList.add("show-menu");
  store.isMenuOpen = true;
};
const rmHeadBg = () => {
  header.classList.remove("show-bg");
};
const addHeadBg = () => {
  header.classList.add("show-bg");
};

function debounce(myFunc, delay = 100) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      myFunc.apply(this, args);
    }, delay);
  };
}

async function showUserDetailsProfileCard(e) {
  const userList = e.target.closest("li");
  const coress = document.querySelectorAll("[data-role]");
  if (userList) {
    profileDetailsCon.classList.remove("opacity-0", "pointer-events-none", "invisible");
    const userName = e.target
      .closest("div")
      .querySelector(".user-name")
      .textContent.replace("@", "");
    const user = await fetchFromApi(userName, "user");
    userLink.href = user.html_url;
    profile.src = user.avatar_url;
    coress.forEach((data) => {
      data.innerHTML = "";
      data.innerHTML = user[data.dataset.role];
    });

    if (recentProfiles.includes(userName)) return;
    if (recentProfiles.length === 5) recentProfiles.pop();
    recentProfiles.unshift(userName);
    saveToLocalStorage("gitHubUserNames", recentProfiles);
  }
}

function checkEmptyList() {
  const emptyState = document.getElementById("empty-state");
  if (!recentProfiles.length) return emptyState.classList.remove("hidden");
  emptyState.classList.add("hidden");
}
