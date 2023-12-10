'use client'
import { useState } from 'react';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '@/app/firebase/config'
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter()
  const handleSignUp = async () => {
    try {
        const res = await createUserWithEmailAndPassword(email, password)
        console.log({res})
        sessionStorage.setItem('user', true)
        setEmail('');
        setPassword('')

    } catch(e){
        console.error(e)
    }
  };

  const redirectToSignIn = () => {
    router.push('/sign-in');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-orange-500">
      <div className="bg-white p-8 rounded shadow-md w-96">
      <h2 className="text-2xl font-semibold mb-4 text-center text-orange-500">Sign Up</h2>

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
        <div className="mb-4">
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
          onClick={handleSignUp}
        >
          Sign Up
        </button>
        <p className="text-sm mt-4 text-center">
          <span className="text-gray-600">Need to SignIn ?{' '}</span>
          <span
            className="text-orange-500 hover:underline cursor-pointer"
            onClick={() => router.push('/sign-in')}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;