'use client'
import React from 'react';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

// Navbar component
const Navbar = () => {
  const [user] = useAuthState(auth);
  const router = useRouter()

  // Handle logout
  const handleLogout = async () => {
    await signOut(auth);
    sessionStorage.removeItem('user');
    router.push('/sign-in');
  };

  return (
    <nav className="bg-orange-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <a className="text-white text-xl font-semibold">Flow-21</a>
        </Link>

        {user && (
          <div className="flex items-center">
            <div className="text-white mr-4">{user.email}</div>
            <button
              onClick={handleLogout}
              className="bg-white text-orange-500 py-2 px-4 rounded-md hover:bg-orange-100"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;