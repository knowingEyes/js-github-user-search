import {
  addHeadBg,
  closeMenuRmHeadBg,
  openMenuAddHeadBg,
  rmDropDown,
  rmHeadBg,
  toggleIcon,
} from "./helper";

const menubtn = document.querySelector(".menu-btn");
const header = document.getElementById("main-header");
const dropDownMenu = document.getElementById("drop-down-menu");
const btnIcons = document.querySelectorAll(".menu-btn span");
const store = { isMenuOpen: false };
export { header, dropDownMenu, btnIcons, store };
document.addEventListener("scroll", () => {
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
