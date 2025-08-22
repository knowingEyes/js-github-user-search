export const showFakeErrorLoading = (error) => {
  const fakeLoader = document.getElementById("fake-loader");
  if (error === "TypeError") {
    fakeLoader.classList.remove("hidden");
  } else {
    fakeLoader.classList.add("hidden");
  }
};
