import apis from './apis';
import {fetchTweets} from './fetchtweets'
import { token } from "./token";
import { Tweet } from './tweetinterface';

// for handling like button adding and deleting
    export  const handleLike = (tweet:Tweet,tweets:Tweet,setTweets: React.Dispatch<React.SetStateAction<Tweet>>, showMyTweets=false) => {

        if (tweet.interactions.liked) {
            const apiUrl = `${apis.interactions}${tweet.interactions.liked}`;
            fetch(apiUrl, {
                method: 'DELETE',
                headers: {
                    Authorization: "Bearer " + token,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                if (response.ok) {
                    fetchTweets(tweets, setTweets, showMyTweets);
                    console.log('Like deleted successfully');
                } else {
                    console.error('Error deleting like');
                }
            })
            .catch((error) => {

                console.error('Error deleting like:', error);
            });
        } else {
            const apiUrl = apis.interactions;
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ type: 'like', tweet: tweet.id }),
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (data.id) {
                    fetchTweets(tweets, setTweets, showMyTweets);
                    console.log('Liked successfully.');
                } else {
                    console.error('Error liking tweet.');
                }
            })
            .catch((error) => {

                console.error('Error liking tweet:', error);
            });
        }
    };

    
