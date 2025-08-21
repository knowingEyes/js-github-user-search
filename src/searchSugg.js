import { searchSuggResults } from "./event";
import { fetchFromApi } from "./fetch_api";
import renderToUl from "./renderer";
const noResult = document.getElementById("no-results");

export default async function searchForUsers(query) {
  if (query.length < 3) return;
  const { items: searchedResults } =
    (await fetchFromApi(query, "search")) ?? {};
  showSearchSugg(searchedResults);
}

async function showSearchSugg(results) {
  //   if (!results) return noResult.classList.remove("hidden");
  //
  const usersNames = results
    ?.slice(results.length >= 10 ? 20 : 0)
    .map(({ login }) => login);
  const users = await Promise.all(usersNames?.map((user) => fetchFromApi(user, "user")) ?? []);
  //   noResult.classList.add("hidden");
  renderToUl(users, searchSuggResults);
}
