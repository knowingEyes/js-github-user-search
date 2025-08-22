import { recentProfilesUl } from "./event";
import { fetchFromApi } from "./fetch_api";
import renderToUl from "./renderer";

export const recentProfiles = [
  ...(JSON.parse(localStorage.getItem("gitHubUserNames")) || []),
];

export async function FetchAndRenderRecentProfiles() {
  const recentVisitedProfiles = await Promise.all(
    recentProfiles.map((user) => fetchFromApi(user, "user")) ?? []
  );
  renderToUl(recentVisitedProfiles, recentProfilesUl);
}
