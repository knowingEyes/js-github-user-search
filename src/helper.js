import {
  btnIcons,
  dropDownMenu,
  header,
  searchSuggResults,
  store,
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
};
const updateDebounce = debounce(showsearchSugg);

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
const render = async (inputValue) => {
  const profile = document.querySelector(".avatar_url");
  const userLink = document.querySelector(".html_url");
  const coress = document.querySelectorAll("[data-role]");
  const user = await getGithubUserDetails(`${inputValue}`);
  userLink.href = user.html_url;
  profile.src = user.avatar_url;
  coress.forEach((data) => {
    data.innerHTML = "";
    data.innerHTML = user[`${data.dataset.role || "N/A"}`];
  });
};

async function showsearchSugg(inputValue) {
  const { items } = await searchGitHubusers(inputValue);
  const noResult = document.getElementById("no-results");
  console.log(items)
  if (items.length === 0) {
    noResult.classList.remove("hidden");
    return;
  }
  items.forEach(async ({ login, avatar_url }) => {
    const searchSuggLists = document.createElement("li");
    const { name } = await getGithubUserDetails(`${login}`);
    searchSuggLists.innerHTML = `<div class=" flex items-center space-x-2 "><div class="w-8 h-8 rounded-full overflow-hidden"><img src="${avatar_url}"></img></div> <div class="font-extrabold text-[13px] "><p>${name}</p><p class="text-[10px] text-[#a1a1a1] user-name">@${login}</p></div></div>`;
    noResult.classList.add("hidden");
    searchSuggResults.append(searchSuggLists);
  });
}

function debounce(myFunc, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      myFunc.apply(this, args);
    }, delay);
  };
}
