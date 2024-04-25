import React, {useState} from 'react';
import { handleSubmit } from './handleSubmit';


// for rendering tweet modal
const TweetModal: React.FC<any> = (props) => {
    const [tweetContent, setTweetContent] = useState("");
    const closeModal = () => {
        const modal = document.getElementById("tweetModal");
        if (modal) {modal.style.display = "none";};
        

      };
      const handleTweetSubmit = () => {
        handleSubmit(tweetContent, setTweetContent);       
    };
      
  return (
<div id="tweetModal" className="modal hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="modal-content  bg-white p-8 rounded-lg flex flex-col justify-center items-center">
        <span id="closeModal" onClick={closeModal} className="cursor-pointer absolute top-4 right-4 text-xl">&times;</span>
        <h2 className="text-2xl font-bold mb-4">Create a Tweet</h2>
        <textarea
          id="tweetText"
          value={tweetContent}
          onChange={(e) => setTweetContent(e.target.value)}
          placeholder="Enter your tweet"
          className="w-full h-20 border border-gray-300 rounded-lg p-2 mb-4"
        />
        <button
          id="submitTweet"
          onClick={handleTweetSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Tweet
        </button>
      </div>
    </div>
      );
    };
    
    export default TweetModal;