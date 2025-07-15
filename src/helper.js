import { data } from "autoprefixer";
import { btnIcons, dropDownMenu, header, store } from "./event";
import { getGithubUserDetails } from "./fetch_api";

export {
  toggleIcon,
  openMenuAddHeadBg,
  closeMenuRmHeadBg,
  resetIcon,
  rmDropDown,
  addHeadBg,
  rmHeadBg,
};

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
const render = async () => {
  const {
    followers, following, id,
    company, public_gists, public_repos,
    created_at, avatar_url, name,
    bio, login, location, html_url
  } = await getGithubUserDetails("knowingeyes");
  document.body.innerHTML = `<div
      class="text-amber-50 absolute w-[90%] top-10 h-[90%] bg-[#1a1a1a] left-[50%] translate-x-[-50%] rounded-xl ring-1 ring-gray-300/20">
      <span class="material-icons absolute right-0 p-2">close</span>
      <div class="mt-15 px-3">
        <div class="grid grid-cols-2 ">
          <div class="bg-blue-300 rounded-l-xl overflow-hidden "><img src="${avatar_url}" alt="" class="w-full h-full object-cover"></div>
          <div class="bg-[#0e0e0e] py-6 px-3 rounded-r-xl [&_P]:mb-1">
            <h1 class="text-2xl font-semibold">${name}</h1>
            <p class="text-sm text-[#a694ff]">@${login}</p>
            <p class="text-xs text-gray-500 mt-1">#${id}</p>
            <p class="text-[0.8rem] text-gray-400">bio: ${bio || "N/A"}</p>
            <button class="text-[.8rem] bg-[#6843ec] rounded-xl py-[3px] px-3.5 mt-3">
              <a href="${html_url}" target="_blank">Visit User Profile
            </button>
          </div>
        </div>
        <div class="grid grid-cols-2 [&>div]:h-20 gap-3 [&>div]:rounded-xl [&>div]:bg-[#0e0e0e]/90
          [&>div]:shadow-xl mt-8 [&>div]:p-2 [&>div]:ring-1 [&>div]:ring-gray-300/5 
          [&_span]:text-xl [&_p]:text-sm">
          <div>
            <span class="material-icons-outlined text-[#6843ec]">group</span>
            <p>Followers</p>
            <p>${followers}</p>
          </div>
          <div>
            <span class="material-icons-outlined text-[#6843ec]">person_add</span>
            <p>Following</p>
            <p>${following}</p>
          </div>
          <div>
            <span class="material-icons-outlined text-[#b3d73b]">folder</span>
            <p>Public Repos</p>
            <p>${public_repos}</p>
          </div>
          <div>
            <span class="material-icons-outlined text-[#b3d73b]">code</span>
            <p>Gists</p>
            <p>${public_gists}</p>
          </div>
          <div>
            <span class="material-icons-outlined text-gray-400">place</span>
            <p>Location</p>
            <p>${location || "N/A"}</p>
          </div>
          <div>
            <span class="material-icons-outlined text-gray-400">work</span>
            <p>Company</p>
            <p>${company || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>`;
};










