"use client"; 

import React, { useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    website: '',
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      await axios.post('/api/profile', formData);
      // Optionally, you can redirect to another page or show a success message
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Create Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Bio:
            <input 
              type="text" 
              name="bio" 
              value={formData.bio} 
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location:
            <input 
              type="text" 
              name="location" 
              value={formData.location} 
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Website:
            <input 
              type="text" 
              name="website" 
              value={formData.website} 
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
        </div>
        <button 
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
