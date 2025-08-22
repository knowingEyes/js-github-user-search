import { showFakeErrorLoading } from "./loader";

const token = import.meta.env.VITE_GITHUB_TOKEN;
const baseUrl = "https://api.github.com/";
let controller;
export async function fetchFromApi(query, type) {
  if (!type) throw new Error("invalid type");
  let endpoint;
  if (type === "search") {
    endpoint = `${baseUrl}${type}/users?q=${query}`;
  } else if (type === "user") {
    endpoint = `${baseUrl}users/${query}`;
  }
  if (endpoint.includes("/search")) {
    if (controller) controller.abort();
    controller = new AbortController();
  }
 
  try {
    const res = await fetch(endpoint, {
      headers: { Authorization: `token ${token}` }, signal : controller && controller.signal

    });
    if (!res.ok) throw new Error("Fetch failed", res.status);
    const data = res.json();
    return data;
  } catch (error) {
    if (error.name === "AbortError") return;
    showFakeErrorLoading(error.name)
    return error;
  }
}

