
export default function saveToLocalStorage(key = "gitHubUserName", value) {
  localStorage.setItem(key, JSON.stringify(value));
}
