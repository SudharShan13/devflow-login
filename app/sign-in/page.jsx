'use client'
import React, { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config'; // Replace with your Firebase config import
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter()

  const handleSignIn = async () => {
    try {
     const res = await signInWithEmailAndPassword(email, password);
      // You can redirect the user or perform additional actions upon successful sign-in
      console.log({res})
      sessionStorage.setItem('user', true)
      setEmail('')
      setPassword('')
      router.push('/')
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-orange-500">
      <div className="bg-white p-8 rounded shadow-md w-96">
      <h2 className="text-2xl font-semibold mb-4 text-center text-orange-500">Sign In</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 w-full border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ color: 'black' }}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 w-full border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ color: 'black' }}
          />
        </div>
        <button
          className="bg-orange-500 text-white py-2 px-4 rounded-md w-full hover:bg-orange-600"
          onClick={handleSignIn}
        >
          Sign In
        </button>
        <p className="text-sm mt-4 text-center">
          <span className="text-gray-600">Don't have an account?{' '}</span>
          <span
            className="text-orange-500 hover:underline cursor-pointer"
            onClick={() => router.push('/sign-up')}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;