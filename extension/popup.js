const likeInput = document.getElementById("likeCount");
const commentInput = document.getElementById("commentCount");
const actionBtn = document.getElementById("actionBtn");

function checkInputs() {
  actionBtn.disabled = !(likeInput.value && commentInput.value);
  actionBtn.style.cursor =
    !likeInput.value || !commentInput.value ? "not-allowed" : "pointer";
}
likeInput.addEventListener("input", checkInputs);
commentInput.addEventListener("input", checkInputs);

actionBtn.addEventListener("click", () => {
  const likeCount = parseInt(likeInput.value);
  const commentCount = parseInt(commentInput.value);

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];

    if (tab.url.includes("linkedin.com/feed")) {
      // Already on LinkedIn feed → send directly
      chrome.tabs.sendMessage(tab.id, { likeCount, commentCount });
    } else {
      // Open LinkedIn feed in a new tab
      chrome.tabs.create({ url: "https://www.linkedin.com/feed/" }, (newTab) => {
         chrome.storage.local.set({ likeCount, commentCount });
      });
    }
  });
});
