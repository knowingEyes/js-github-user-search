import { recentProfilesUl, searchSuggResults } from "./event";
import { fetchFromApi } from "./fetch_api";
import renderToUl from "./renderer";
export const noResult = document.getElementById("no-results");

export default async function searchForUsers(query) {
  const { items: searchedResults } =
    (await fetchFromApi(query, "search")) ?? {};
  showSearchSugg(searchedResults);
}

async function showSearchSugg(results) {
  let timer;
  clearTimeout(timer);
  if (results?.length === 0)
    return (timer = setTimeout(() => noResult.classList.remove("hidden"), 500));
  noResult.classList.add("hidden");
  const usersNames = results
    ?.slice(results.length >= 15 ? 20 : 0)
    .map(({ login }) => login);
  const users = await Promise.all(
    usersNames?.map((user) => fetchFromApi(user, "user")) ?? []
  );
  renderToUl(users, searchSuggResults);
}
