'use client';

import { useState } from 'react';
import { User, Edit, PlusCircle, Trash2, LogOut } from 'lucide-react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import ProfilePage from '@/components/Profile/Profile';
import CreatePost from '@/components/Post/CreatePost';
import EditPost from '@/components/Post/EditPost';
import DeletePost from '@/components/Post/DeletePost';
import ViewProfile from '@/components/Post/ViewProfile';

export default function Dashboard() {
  const [active, setActive] = useState('profile');

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <section className="flex">
      <aside className="w-64 h-[700px] mr-[17rem] bg-gray-800 text-white flex flex-col fixed mt-14  top-0 left-0">
        <div className="p-6 font-bold text-xl border-b border-gray-700">
          Dashboard
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            <li
              className={`flex items-center gap-4 p-2 rounded cursor-pointer ${
                active === 'profile' ? 'bg-gray-700' : ''
              }`}
              onClick={() => setActive('profile')}
            >
              <User className="w-5 h-5" />
              <span>View Profile</span>
            </li>
            <li
              className={`flex items-center gap-4 p-2 rounded cursor-pointer ${
                active === 'profileUpdate' ? 'bg-gray-700' : ''
              }`}
              onClick={() => setActive('profileUpdate')}
            >
             <Edit className="w-5 h-5" />
              <span>Profile Update</span>
            </li>
            <li
              className={`flex items-center gap-4 p-2 rounded cursor-pointer ${
                active === 'create' ? 'bg-gray-700' : ''
              }`}
              onClick={() => setActive('create')}
            >
              <PlusCircle className="w-5 h-5" />
              <span>Create Post</span>
            </li>
            <li
              className={`flex items-center gap-4 p-2 rounded cursor-pointer ${
                active === 'edit' ? 'bg-gray-700' : ''
              }`}
              onClick={() => setActive('edit')}
            >
              <Edit className="w-5 h-5" />
              <span>Edit Post</span>
            </li>
            <li
              className={`flex items-center gap-4 p-2 rounded cursor-pointer ${
                active === 'delete' ? 'bg-gray-700' : ''
              }`}
              onClick={() => setActive('delete')}
            >
              <Trash2 className="w-5 h-5" />
              <span>Delete Post</span>
            </li>
            <li
              className="flex items-center gap-4 p-2 rounded cursor-pointer"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              <LogOut className="w-5 h-5" />
              <button  onClick={handleSignOut} >Sign Out</button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6">
     
        <div className="text-2xl font-bold">Dashboard Content</div>
        <div className="mt-6">
          {active === 'profile' && <ViewProfile/>}
          {active === 'profileUpdate' && <ProfilePage/>}
          {active === 'create' && <CreatePost/>}
          {active === 'edit' && <EditPost/>}
          {active === 'delete' && <DeletePost/>}
        </div>
      </main>
    </section>
  );
}
