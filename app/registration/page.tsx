'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import apis from '@/components/apis';
// registration Form
const Registration: React.FC = () => {
    const router = useRouter();
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${apis.users}register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setMessage('Registered successfully. Redirecting...');
        router.push('/users/');
      } else {
        setMessage('Username already taken');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8  rounded-lg shadow-lg flex flex-col items-center justify-center">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Registration</h2>
        </div>
        <form id="login-form" onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="first_name" className="sr-only">First Name</label>
              <input id="first_name" name="first_name" type="text" required className=" appearance-none rounded-none relative block w-full px-3 py-2  border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="First Name" />
            </div>
            <div>
              <label htmlFor="last_name" className="sr-only">Last Name</label>
              <input id="last_name" name="last_name" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Last Name" />
            </div>
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input id="username" name="username" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Link href="/users" className="font-medium text-indigo-600 hover:text-indigo-500">
                Go back
            </Link>
          </div>

          <div className="flex justify-center">
            <button type="submit" className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Register
            </button>
          </div>

          <div id="message" className="text-center mt-4 text-blue-500">{message}</div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
