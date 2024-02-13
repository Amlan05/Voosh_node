import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { userActions} from './Store'

const Navbar = () => {

  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const logout = () =>{
    if(isUserLoggedIn){
    localStorage.removeItem('userId')
    localStorage.removeItem('phone')
    localStorage.removeItem('token')
    dispatch(userActions.logout())
    }
  }

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white font-bold">Voosh</div>
      <div>
        <Link className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-2 focus:outline-none" to='/auth' onClick={logout}>{isUserLoggedIn ? "Logout" : "Login"}</Link>
      </div>
    </nav>
  );
};

export default Navbar;
