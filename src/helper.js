import { btnIcons, dropDownMenu, header, store } from "./event";

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
