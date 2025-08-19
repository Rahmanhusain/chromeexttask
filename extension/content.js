// Like posts function
async function likePosts(posts, likeCount) {
  for (let i = 0; i < likeCount && i < posts.length; i++) {
    const post = posts[i];
    const likeBtn = post.querySelector('[aria-label*="React Like"]');
    if (likeBtn) {
      likeBtn.click();
      await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for UI to appear
    }
  }
}

// Sleep helper
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Wait for enabled button helper
async function waitForEnabledButton(root, selector, timeout = 5000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const btn = root.querySelector(selector);
    if (btn && !btn.disabled) return btn;
    await sleep(200);
  }
  throw new Error("Post button not enabled in time");
}

// Comment posts function
async function commentOnPosts(posts, commentCount) {
  for (let i = 0; i < commentCount && i < posts.length; i++) {
    const post = posts[i];
    const commentBtn = post.querySelector('[aria-label*="Comment"]');

    if (!commentBtn) {
      console.log(`No comment btn`);
      continue;
    }

    // Open comment box
    commentBtn.click();
    await sleep(1200);

    // Find editor
    const editor = post.querySelector(
      "div.comments-comment-box-comment__text-editor"
    );

    if (!editor) {
      console.log(`No editorr`);
      continue;
    }

    // Focus + type
    editor.focus();
    document.execCommand("insertText", false, "CFBR");

    // Fire input so React enables button
    editor.dispatchEvent(
      new InputEvent("input", {
        bubbles: true,
        cancelable: true,
        inputType: "insertText",
        data: "CFBR",
      })
    );

    // Wait until comment button is enabled
    try {
      const submitBtn = await waitForEnabledButton(
        post,
        "button.comments-comment-box__submit-button--cr.artdeco-button.artdeco-button--1.artdeco-button--primary"
      );

      submitBtn.click();
      console.log(`coment done`);
    } catch (err) {
      console.log(err.message);
    }

    // Give UI time before moving on
    await sleep(1500);
  }
}

console.log("hello world testing content script");

//when on the linkedin itself
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Received message:", request);
  if (
    window.location.hostname.includes("linkedin.com") &&
    request.likeCount &&
    request.commentCount
  ) {
    const posts = Array.from(document.querySelectorAll("[data-urn]"));
    // Shuffle posts for randomness
    for (let i = posts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [posts[i], posts[j]] = [posts[j], posts[i]];
    }

    // Like and comment independently
    (async () => {
      await likePosts(posts, request.likeCount);
      await commentOnPosts(posts, request.commentCount);
    })();
  }
});


//when not on the linkedin at another tab
chrome.storage.local.get(["likeCount", "commentCount"], (data) => {
  if (data.likeCount && data.commentCount) {
    const likeCount = data.likeCount;
    const commentCount = data.commentCount;
    console.log("Loaded counts:", { likeCount, commentCount });
    // Wait for the page to load and then like and comment
    window.addEventListener("load", () => {
      const posts = Array.from(document.querySelectorAll("[data-urn]"));
      // Shuffle posts for randomness
      for (let i = posts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [posts[i], posts[j]] = [posts[j], posts[i]];
      }

      // Like and comment independently
      (async () => {
        await likePosts(posts, likeCount);
        await commentOnPosts(posts, commentCount);
      })();
    });
    chrome.storage.local.remove(["likeCount", "commentCount"]);
  }
});

/* //it will wait for the page to load and then post the profile data to server
setTimeout(() => {
  const name = document.querySelector("h1")?.innerText.trim() || "";
  const bio =
    document.querySelector(".text-body-medium.break-words")?.innerText.trim() ||
    "";

  let location = "";
  const locationElement = document.querySelector(
    "span.text-body-small.inline.t-black--light.break-words"
  );
  if (locationElement) {
    location = locationElement.innerText.trim();
  }

  const about =
    document.querySelector(
      ".pv-shared-text-with-see-more .inline-show-more-text"
    )?.innerText || "";

  const followerCount =
    [...document.querySelectorAll("span")]
      .map((el) => el.innerText.trim())
      .find((text) => text.toLowerCase().includes("followers")) || "";

  const connectionCount =
    [...document.querySelectorAll("span")]
      .map((el) => el.innerText.trim())
      .find((text) => text.toLowerCase().includes("connections")) || "";

  //posting the data to the server
  (async () => {
    try {
      const response = await fetch("http://localhost:8000/api/userprofiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authcred: "abcdtoken",
        },
        body: JSON.stringify({
          name,
          location,
          bio,
          about,
          followerCount: followerCount,
          connectionCount: connectionCount,
          url: window.location.href,
        }),
      });
      if (response.ok) {
        console.log("Profile data sent to backend");
      } else {
        console.error("Failed to send profile data");
      }
    } catch (error) {
      console.error("Error sending profile data:", error);
    }
  })();
}, 3000);
 */
