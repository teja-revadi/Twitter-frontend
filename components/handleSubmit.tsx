import { token } from "./token";
import apis from "./apis";

// for creating tweet
export const handleSubmit = (tweetContent:string, setTweetContent: React.Dispatch<React.SetStateAction<string>>) => {

    const closeModal = () => {
        const modal = document.getElementById("tweetModal");
        if (modal) modal.style.display = "none";
      };
    
  if (!token) {

    return;
  }
  const apiUrl = apis.tweets;
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ content: tweetContent }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.id) {
        alert("Tweet created successfully.");
        closeModal();
        setTweetContent("")


      } else {
        alert("No Tweet Content");
      }
    })
    .catch((error) => {
      alert("Error creating tweet.");
      console.error("Error creating tweet:", error);
    });
};
