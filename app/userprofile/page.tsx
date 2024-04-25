'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import apis from '@/components/apis';
import { useRouter } from 'next/navigation';



const Profile = () => {
  const [token, setToken] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const storedToken = localStorage.getItem('access');
  const router = useRouter();

  //rendering My Profile
  useEffect(() => {
    
    if (!storedToken) {
      router.push('/users');
    } else {
      setToken(storedToken);
      fetchMyProfile(storedToken);
    }
  }, []);

  const fetchMyProfile = (token: string) => {
    const apiUrl = `${apis.users}my_profile/`;
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if(!data.profile_image){
          data.profile_image = 'default.png'
        }console.log(data)
        const profileHtml = `
          <img src="${data.profile_image}" alt="Profile Image" class="w-100 h-24 mb-4 rounded-full">
          <p class="text-lg"><span class="font-semibold">Fullname:</span> ${data.first_name} ${data.last_name}</p>

          <p class="text-lg"><span class="font-semibold">Username:</span> ${data.username}</p>
        `;
        setUserId(data.id);
        document.getElementById('my_Profile')!.innerHTML = profileHtml;
      })
      .catch((error) => {
        alert('Error fetching your details');
        console.error('Error fetching your details:', error);
      });
  };

  // modal
    const openModal = () => {
    const modal = document.getElementById("passwordModal");
    if (modal) modal.style.display = "block";
  };

  const closeModal = () => {
    const modal = document.getElementById("passwordModal");
    if (modal) modal.style.display = "none";
  };

  // Changing Password
  const handlePasswordChange = () => {
    const oldPassword = (document.getElementById('old_password') as HTMLInputElement).value;
    const newPassword = (document.getElementById('new_password') as HTMLInputElement).value;
    fetch(apis.password, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert('Password changed successfully.');
          const modal = document.getElementById('passwordModal');
          if (modal) modal.style.display = 'none';
          (document.getElementById('old_password') as HTMLInputElement).value = '';
          (document.getElementById('new_password') as HTMLInputElement).value = '';

        } else {
          alert('Old password is incorrect');
        }
      })
      .catch((error) => {
        console.error('Error Changing Password:', error);
      });
  };
  // Updating Profile
  const handleProfileUpdate = (token:string) => {
    const profileImage = (document.getElementById('profile_photo') as HTMLInputElement)?.files?.[0];
    const firstName = (document.getElementById('first_name') as HTMLInputElement)?.value;
    const lastName = (document.getElementById('last_name') as HTMLInputElement)?.value;

    const formData = new FormData();
    if (profileImage) {
      formData.append('profile_image', profileImage);
    }
    if (firstName) {
      formData.append('first_name', firstName);
    }
    if (lastName) {
      formData.append('last_name', lastName);
    }

    fetch(`${apis.users}${userId}/`, {
      method: 'PATCH',
      body: formData,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const message = document.getElementById('message1');
        if (data) {
          if (message) {
            
            message.innerHTML = 'Updated successfully!!';
            fetchMyProfile(token);
            setTimeout(() => {
              message.innerHTML = '';
            }, 1000);
          }
        } else {
          if (message) message.innerHTML = 'Error Occurred';
        }
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };

  return (
    <div className="flex justify-center item-center">
    <div className="profile-container bg-white rounded-lg shadow-md p-6 w-100">
    <button id="openModalBtn" onClick={openModal} className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-1xl p-2 rounded float-right">
      Change Password
    </button>
    <br />
    <br />
    <div className=' flex flex-col justify-center items-center space-y-6'>
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        <div id="my_Profile"></div>
    </div>
  
    <div id="passwordModal" className="hidden fixed  top-0 left-0 w-full h-full bg-black bg-opacity-70 z-50">
        <div className="modal-content bg-white p-8 rounded-lg flex flex-col justify-center items-center">
        <span id="closeModal" onClick={closeModal} className="cursor-pointer absolute top-4 right-4 text-xl">&times;</span>

          <h2 className="ttext-2xl font-bold mb-4">Change Password</h2>
          <textarea
            id="old_password"
            name="old_password"
            placeholder="Old Password"
            required
            className="input-field px-2 py-1 border rounded border-gray-300"
          ></textarea>
          <textarea
            id="new_password"
            name="new_password"
            placeholder="New Password"
            required
            className="input-field px-2 py-1 border rounded border-gray-300"
          ></textarea>
          <button
            id="submitpassword"
            className="submit-button bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
            onClick={handlePasswordChange}
          >
            Update Password
          </button>
        </div>
        </div>
        <h2 className=" flex justify-center text-xl mb-10 mt-10 font-bold">Edit Profile</h2>
      <div className="form-group">
        <p className='flex mb-4'>
          Profile Photo :<input type="file" id="profile_photo" name="profile_photo" accept="image/*" />
        </p>
        <input
          type="text"
          id="first_name"
          name="first_name"
          placeholder="First Name"
          className="input-field px-2 py-1 mb-4 border rounded border-gray-300 w-full"
        />
        <input
          type="text"
          id="last_name"
          name="last_name"
          placeholder="Last Name"
          className="input-field px-2 py-1 border rounded border-gray-300 w-full"
        />
      </div>

      <div className='flex justify-center mt-8 mb-8'>
        <button id="login-button" className="login-button bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mr-4 rounded" onClick={() => handleProfileUpdate(token)}>
          Update Details
        </button>
        <Link href="home" className="home-link text-blue-500 px-4 py-2 font-bold">Home</Link>
      </div>
      <div id="message1" className='flex justify-center'></div>
      </div>
      </div>

  );
};

export default Profile;
