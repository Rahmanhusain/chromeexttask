//it will wait for the page to load and then post the profile data to server
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

  const about = document.querySelector(".pv-shared-text-with-see-more .inline-show-more-text")?.innerText || "";

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
        "authcred": "abcdtoken"
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
