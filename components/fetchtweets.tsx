import { token } from "./token";
import apis from "./apis";
import { Tweet } from "./tweetinterface";

// for fetching tweets and rendering using setTweets
export const fetchTweets = (tweets:Tweet,setTweets: React.Dispatch<React.SetStateAction<Tweet>>, showMyTweets=false) => {
    const apiUrl = showMyTweets === false ? `${apis.tweets}all_tweets/` : `${apis.tweets}my_tweets/`;

    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTweets(data);
      })
      .catch((error) => {
        console.error("Error fetching tweets:", error);
      });
  };