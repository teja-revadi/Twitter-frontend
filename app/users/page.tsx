'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import apis from '@/components/apis';

// credentials Page
const UsersPage: React.FC = () => {
  const router = useRouter();
  const [message, setMessage] = useState<string>('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch(apis.token, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const data = await response.json();

      if (data.refresh) {
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("access", data.access);

        setMessage("Login successful. Redirecting...");
        router.push('/home');
      } else {
        setMessage("Invalid username or password.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 w-1/4 rounded-lg shadow-lg flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">Welcome Back!</h2>
        <p className="text-gray-600 mb-6">Please sign in to continue.</p>
        <form id="login-form" onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input type="text" id="username" name="username" required className=" appearance-none rounded-md relative block w-full px-3 py-2  border border-gray-300  text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" name="password" required className="appearance-none rounded-md relative block w-full px-3 py-2  border border-gray-300  text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">Sign In</button>
          <Link href="registration" className="block text-center text-blue-500 hover:text-blue-700">Sign Up</Link>
        </form>
        <div id="message" className="text-blue-500 mt-4">{message}</div>
      </div>
    </div>
  );
};

export default UsersPage;
