
"use client"
import  { useState } from 'react';
import axiosInstance from '@/utils/axiosinstance'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth'
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const {login} = useAuth()
  const [error, setError] = useState('');
  const router = useRouter()
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('/api/user/login', formData);

      if (response.status === 200) {
        const data = response.data;
        toast.success('loged in successfully ')
        login(data.token)
        console.log('Login successful, Token:', data.token);
        router.replace('/')
   
      } else if (response.status === 401) {
        setError('Invalid credentials');
       
      } else {
        setError(response.data.error || 'Error logging in');
       
      }
    } catch (error) {
      console.error('Internal Server Error', error);
      setError('Internal Server Error');
    
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form>
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
          onClick={handleLogin}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none"
        >
          Login
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
