
'use client'
import  { useState } from 'react';
import axiosInstance from '@/utils/axiosinstance'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
const UserSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const router = useRouter()

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    try {
      const response = await axiosInstance.post('/api/user/signup', formData);

      if (response.status === 201) {
        console.log('User created successfully');
        setError('');
        router.push('/login')
        toast.success('account created successfully')
        // Handle success, redirect or show a success message
      } 
      else if ( response.status == 400){

        setError('user already created');
      }
      
      else {
        setError(response.data.error || 'Error creating user');
        // Handle other statuses, display an error message
      }
    } catch (error) {
      console.error('Internal Server Error', error);
      setError('Internal Server Error');
      // Handle unexpected errors
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow  ">
      <h2 className="text-2xl font-bold mb-4">User Signup</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Name:</label>
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Email:</label>
          <input
            type="email"
            name="email"
            onChange={handleInputChange}
            className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleInputChange}
            className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="button"
          onClick={handleSignup}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none"
        >
          Signup
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default UserSignup;
