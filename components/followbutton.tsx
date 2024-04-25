import { fetchTweets } from "./fetchtweets";
import { fetchUsers } from "./fetchusers";
import { token } from "./token";
import apis from "./apis";
import { Tweet } from "./tweetinterface";
import { Data } from "./datainterface";

// function for for follow button
export const follow = (userId:Number,tweets:Tweet,setTweets: React.Dispatch<React.SetStateAction<Tweet>>, showMyTweets:boolean,setData: React.Dispatch<React.SetStateAction<Data[]>>) => { 

    const apiUrl = apis.userprofiles; 
    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ following: userId }),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    })
    .then((data) => {
        console.log("following successfully.");
        fetchUsers(setData);
        fetchTweets(tweets,setTweets, showMyTweets);

    })
    .catch((error) => {

            console.error("Error following user:", error);
    
    });
};
