chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startScraping") {
    let index = 0;

    const openNext = () => {
      if (index < message.links.length) {
        chrome.tabs.create({ url: message.links[index], active: true }, (tab) => {
          index++;
          setTimeout(openNext, 5000); // Wait for 5s before next tab
        });
      }
    };

    openNext();
  }
});
