export const showFakeErrorLoading = (error) => {
  const fakeLoader = document.getElementById("fake-loader");
  if (error) {
    fakeLoader.classList.remove("hidden");
  } else {
    fakeLoader.classList.add("hidden");
  }
};
