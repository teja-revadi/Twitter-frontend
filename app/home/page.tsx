'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MyTweetsComponent from '@/components/tweets'
import Buttons from '@/components/buttons';
import TweetModal from '@/components/tweetModal';
import Followers from '@/components/followers';
import { Tweet } from '@/components/tweetinterface';
// All Tweets page
// All components of this page are in components folder
const TwitterPage: React.FC = () => {

  const [token, setToken1] = useState<string | null>(null);
  const router = useRouter();
  // checking for the token
  useEffect(() => {
    const accessToken = localStorage.getItem("access");
    if (!accessToken) {
      router.push('/users');
    } else {
      setToken1(accessToken);
    }
  }, [token]);

  // tweet state
  const [tweets, setTweets] = useState<Tweet[]>([]);

  return (
    
    <div className="page flex">
            
            <Followers tweets={tweets} setTweets={setTweets} showMyTweets={false}/>{/*for users, followers and following */}
      <div className="rightcolumn w-4/5">
        <div className="tabs flex justify-center font-bold">
        <button id="allTweetsTab" className="font-bold py-2 px-4 m-1 rounded" style={{ textDecoration: 'underline'}}>Feed</button>
        <button className=" px-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"><Link href="/home/mytweets" >
                My Tweets
            </Link></button>
      </div>
      <Buttons />{/* for myprofile, create tweet and logout buttons */}
      <br /><br />
      <TweetModal />{/* for creating tweets */}
    <MyTweetsComponent tweets={tweets} setTweets={setTweets} showMyTweets={false}/>{/*for rendering All tweets*/}
      </div>
     </div>
  );
}

export default TwitterPage;

