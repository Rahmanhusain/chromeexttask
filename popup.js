document.addEventListener("DOMContentLoaded", function () {
  // Get button and title display area
  const button = document.getElementById("getTitleBtn");
  const titleDiv = document.getElementById("tabTitle");

  // adding listener for button click
  button.addEventListener("click", function () {
    // Getting current active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // Show the tab title
      titleDiv.textContent = tabs[0].title;
    });
  });
});
