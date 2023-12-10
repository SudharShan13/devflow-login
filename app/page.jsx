'use client'
import Image from 'next/image'
import { useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '@/app/firebase/config'
import { useRouter } from 'next/navigation';
import {signOut} from 'firebase/auth'

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter()
  const userSession = sessionStorage.getItem('user')
  if(!user && !userSession){
    router.push('/sign-in');
    return null;
  }
  const handleLogout = async () => {
    await signOut(auth);
    sessionStorage.removeItem('user');
    router.push('/sign-in');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-orange-500 text-white">
    <div className="text-4xl font-semibold mb-8">Welcome, {user.email}</div>
    <button
      onClick={handleLogout}
      className="bg-white text-orange-500 py-2 px-4 rounded-md hover:bg-orange-100"
    >
      Log Out
    </button>
  </main>
  )
}
