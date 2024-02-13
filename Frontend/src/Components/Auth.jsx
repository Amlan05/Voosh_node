import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userActions } from './Store';
import { useNavigate } from 'react-router';

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const [isLogin, setIsLogin] = useState(true);
  const [status, setStatus] = useState()

  const sendData = async (what) => {
    let data;
    try {
      if (what === 'signup') {
        data = await axios.post('http://localhost:5000/users/add-user', userData);
      } else if (what === 'login') {
        data = await axios.post('http://localhost:5000/users/login-user', userData);
      }

      const id = data.data.user;
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('userId', id._id);
      localStorage.setItem('phone', id.phone);
      dispatch(userActions.login());
      setStatus(data.data.message)
      setTimeout(()=> {
        navigate('/');
      },1000)
    } catch (err) {
      setStatus(err.response.data.message)
      return console.err(err);
    }
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      sendData('login');
    } else {
      sendData('signup');
    }
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full mx-4 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Signup'}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              pattern="[A-Za-z ]{1,}"
              title="Name must contain only characters"
              required
              className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          )}
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            pattern="[0-9]{10}"
            title="Phone number must be 10 digits"
            required
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            minLength="5"
            title="Password must be at least 5 characters long"
            required
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <button
            type="submit"
            className="block w-full bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>
        {status && <p className="mt-2 text-center text-red-500">{status}</p>}
        <div className="mt-4">
          <button onClick={handleToggleMode} className="text-indigo-500 underline focus:outline-none">
            {isLogin ? 'Create an account' : 'Already have an account?'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
