import React, {useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Buttons: React.FC<any> = (props) => {
    const router = useRouter();
    // logout button
    const handleLogout = () => {
        localStorage.removeItem("access");
        router.push('/users');
      };
      //opening tweet modal
    const openModal = () => {
    const modal = document.getElementById("tweetModal");
    if (modal) modal.style.display = "block";
  };
    return (
    <div className="buttons float-right mb-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 m-1 rounded">
        <Link href="/userprofile" className="profile">My Profile</Link>
        </button>
        <button id="openModalBtn" onClick={openModal} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 m-1 rounded ">
      Create Tweet
    </button>
        <button id="logout-button" onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Logout</button>
      </div>

);
};

export default Buttons;
