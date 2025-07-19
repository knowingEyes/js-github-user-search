import "./style.css";
import "./event.js";
import "./fetch_api.js";
import { checkEmptyList, recentProfiles, renderToUl } from "./helper.js";
import { recentProfilesUl } from "./event.js";

document.addEventListener("DOMContentLoaded", () => {
  renderToUl(recentProfiles, recentProfilesUl);
  checkEmptyList()
});
