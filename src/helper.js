import {
  btnIcons,
  dropDownMenu,
  header,
  searchSuggResults,
  store,
  profileDetailsCon,
  recentProfilesUl,
} from "./event";
import { getGithubUserDetails, searchGitHubusers } from "./fetch_api";

export {
  toggleIcon,
  openMenuAddHeadBg,
  closeMenuRmHeadBg,
  resetIcon,
  rmDropDown,
  addHeadBg,
  rmHeadBg,
  render,
  showsearchSugg,
  debounce,
  updateDebounce,
  recentProfiles,
  renderToUl,
  showUserDetails,
  checkEmptyList,
  showFakeErrorLoading,
};
const updateDebounce = debounce(showsearchSugg);
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
  const user = await getGithubUserDetails(`${userName}`);
  userLink.href = user.html_url;
  profile.src = user.avatar_url;
  coress.forEach((data) => {
    data.innerHTML = "";
    data.innerHTML = user[data.dataset.role]
      // data.dataset.role === "folllowing"
        // ? user[data.dataset.role]
        // : user[data.dataset.role] || "n/a";
  });
  if (!recentProfiles.includes(userName)) {
    recentProfiles.push(userName);
    localStorage.setItem("gitHubUserName", JSON.stringify(recentProfiles));
  }
};

async function showsearchSugg(inputValue) {
  const { items } = await searchGitHubusers(inputValue);
  const noResult = document.getElementById("no-results");
  if (items.length === 0) {
    noResult.classList.remove("hidden");
    return;
  }
  noResult.classList.add("hidden");
  const users = items.map(({ login }) => login);
  renderToUl(users, searchSuggResults);
}

function debounce(myFunc, delay = 500) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      myFunc.apply(this, args);
    }, delay);
  };
}

function renderToUl(users, appendTo) {
   users.forEach(async (user) => {
    const searchSuggLists = document.createElement("li");
    const { name, avatar_url, login } = await getGithubUserDetails(`${user}`);
    searchSuggLists.innerHTML = `<div class=" flex items-center space-x-2 "><div class="w-8 h-8 rounded-full overflow-hidden"><img src="${avatar_url}"></img></div> <div class="font-extrabold text-[13px] "><p>${
      name
    }</p><p class="text-[10px] text-[#a1a1a1] user-name">@${login}</p></div></div>`;
   return appendTo.append(searchSuggLists);
    
  });
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

const showFakeErrorLoading = (error) => {
  const fakeLoader = document.getElementById("fake-loader");
  if (error.message === "Failed to fetch") {
    fakeLoader.classList.remove("hidden");
  } else {
    fakeLoader.classList.add("hidden");
  }
};
