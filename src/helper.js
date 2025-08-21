import {
  btnIcons,
  dropDownMenu,
  header,
  searchSuggResults,
  store,
  profileDetailsCon,
  recentProfilesUl,
} from "./event";
import { fetchFromApi } from "./fetch_api";
import searchForUsers from "./searchSugg";

export {
  toggleIcon,
  openMenuAddHeadBg,
  closeMenuRmHeadBg,
  resetIcon,
  rmDropDown,
  addHeadBg,
  rmHeadBg,
  render,
  debounce,
  updateDebounce,
  recentProfiles,
  showUserDetails,
  checkEmptyList,
};
const updateDebounce = debounce(searchForUsers);

const recentProfiles = [
  ...(JSON.parse(localStorage.getItem("gitHubUserName")) || []),
];

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
const render = async (userName) => {
  const profile = document.querySelector(".avatar_url");
  const userLink = document.querySelector(".html_url");
  const coress = document.querySelectorAll("[data-role]");
  const user = await fetchFromApi(userName, "user");
  userLink.href = user.html_url;
  profile.src = user.avatar_url;
  coress.forEach((data) => {
    data.innerHTML = "";
    data.innerHTML = user[data.dataset.role];
  });
  if (!recentProfiles.includes(userName)) {
    recentProfiles.push(userName);
    localStorage.setItem("gitHubUserName", JSON.stringify(recentProfiles));
  }
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



function showUserDetails(e) {
  const userList = e.target.closest("li");
  if (userList) {
    const userName = e.target.closest("div").querySelector(".user-name");
    render(userName.textContent.slice(1));
    profileDetailsCon.classList.remove("hidden");
    const avatar_url = e.target.closest("div").querySelector("img");
  }
}

function checkEmptyList() {
  const emptyState = document.getElementById("empty-state");
  if (recentProfilesUl.children.length !== 0)
    emptyState.classList.remove("hidden");
  else emptyState.classList.add("hidden");
}


