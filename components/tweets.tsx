// MyComponent.tsx
import apis from './apis';
import React , {useState, useEffect} from 'react';
import { handleLike } from './handlelike'
import { handleRetweet } from './handleretweet';
import {fetchTweets} from './fetchtweets'
import { token } from "./token";
import { Tweet } from './tweetinterface';

const MyTweetsComponent: React.FC<any> = (props) => {
 
  // rendering tweets
  useEffect(() => {
    if (token) {
      fetchTweets(props.tweets, props.setTweets, props.showMyTweets);
    }
  }, [token]);

  
  return (
    <div>
      <ul id="tweet-list">
        {props.tweets.map((tweet:Tweet) => (
          <li key={tweet.id}>
            <div className="box p-4 mb-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center">
          <img src={tweet.profile_image ? `${apis.media}${tweet.profile_image}` : "/default.png"} alt="Profile" className="w-8 h-8 rounded-full mr-4" />
          <div className="flex">
            <p className="font-bold mr-2">{tweet.first_name}</p>
            <p className="font-bold mr-2">{tweet.last_name}</p>
            <p>@{tweet.username}</p>
          </div>
        </div>
        <p className="mt-2">{tweet.content}</p>
        <div className="flex mt-4">
          <button
                  id={`like-button-${tweet.id}`}
                  className={`flex items-center text-sm mr-4 ${
                    tweet.interactions.liked ? 'text-red-500' : 'text-gray-500'
                  }`}
                  onClick={() => handleLike( tweet, props.tweets, props.setTweets, props.showMyTweets)}
                >
                  <span className="mr-1">&#10084;</span> Like {tweet.interactions.likes}
                </button>
          <button id={`retweet-button-${tweet.id}`} className={`flex items-center text-sm ${tweet.interactions.retweeted ? "text-green-500" : "text-gray-500"}`} onClick={() => handleRetweet( tweet, props.tweets, props.setTweets, props.showMyTweets)}>
            <span className="mr-1">&#x1F501;</span> Retweet {tweet.interactions.retweets}
          </button>
        </div>
      </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyTweetsComponent;
