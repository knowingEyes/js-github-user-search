import "./style.css";
import "./event.js";
import "./fetch_api.js";
import "./searchSugg.js";
import { AOS } from "aos";
import "aos/dist/aos.css";
import { checkEmptyList } from "./helper.js";
import { FetchAndRenderRecentProfiles } from "./recentProfiles.js";

// export const recentProfiles = [
//   ...(JSON.parse(localStorage.getItem("gitHubUserName")) || []),
// ];

document.addEventListener("DOMContentLoaded", () => {
  FetchAndRenderRecentProfiles();
  // AOS.init({
  //   duration: 800,
  //   once: false,
  // });
  // renderToUl(recentProfiles, recentProfilesUl);
  checkEmptyList()
});

// AOS.refresh()
