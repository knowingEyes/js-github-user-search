// import { signal } from "./event";
// // let controller;

import { showFakeErrorLoading } from "./helper";
const fetchFromApi = async (query = "drake", type = "search") => {
  const res = await fetch(`/api/github?q=${query}&type=${type}`);
  if (!res.ok) throw new Error("Fetch failed", res.status);
  return res.json();
};

export const getGithubUserDetails = async (inputValue) => {
  try {
    const userData = await fetchFromApi(inputValue, "user");
    return userData;
  } catch (error) {
    // showFakeErrorLoading(error);
  }
};

export const searchGitHubusers = async (inputValue) => {
  try {
    const userData = await fetchFromApi(inputValue, "search");
    return userData;
  } catch (error) {
    // showFakeErrorLoading(error);
  }
};

console.log(await searchGitHubusers("drake"))
