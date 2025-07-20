// import { signal } from "./event";
// // let controller;
const fetchFromApi = async (url) => {
  const res = await fetch(url, {
    // signal,
  });
  if (!res.ok) throw new Error("Fetch failed", res.status);
  return res.json();
};

export const getGithubUserDetails = async (inputValue) => {
  try {
    const userData = await fetchFromApi(
      `https://api.github.com/users/${inputValue}`
    );
    return userData;
  } catch (error) {
    showFakeErrorLoading(error);
  }
};

export const searchGitHubusers = async (inputValue) => {
  // if (controller) controller.abort();
  // controller = new AbortController();
  // const { signal } = controller;
  try {
    const userData = await fetchFromApi(
      `https://api.github.com/search/users?q=${inputValue}+in:login&per_page=10`
    );
    return userData;
  } catch (error) {
    showFakeErrorLoading(error);
  }
};