document.getElementById("startScraping").addEventListener("click", () => {
  const links = [
    "https://www.linkedin.com/in/rahman-husain-45bb60237/",
    "https://www.linkedin.com/in/arti-sergeev/",
    "https://www.linkedin.com/in/michal-zalobny/"
  ];

  chrome.runtime.sendMessage({ action: "startScraping", links });
});
