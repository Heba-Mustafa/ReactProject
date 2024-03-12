import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation(); // Get the current location

  // Define a function to determine if a link should be active
  const isActive = (path) => {
    return location.pathname === path ? 'bg-gray-600' : '';
  };

  // Get the name of the current user from localStorage
  const currentUser = localStorage.getItem('name');

  return (
    <nav className="bg-gray-800  fixed top-0 left-0 h-full w-60 flex flex-col justify-between">
      <div className="flex flex-col space-y-4 py-10">
        <h1 className="text-white font-semibold text-lg font-roundy pb-14 text-center" style={{fontSize:"25px"}}>Hi, {currentUser} 💕</h1>
        <Link to="/AddPost" className={`text-white font-custom ps-20 hover:text-gray-300 ${isActive('/AddPost')}`}><div className='border rounded w-1/4 text-center h-1/2 pb-2'><i class="fa-solid fa-plus mb-8"></i></div></Link>

        <Link to="/home" className={`text-white font-custom ps-8 font-semibold text-lg ${isActive('/home')}`}><div className='flex py-5 gap-5 items-center'><i class="fa-solid fa-house-user h-1/2"></i><h1>Home</h1></div></Link>
        <Link to="/profile" className={`text-white font-custom ps-8 font-semibold text-lg ${isActive('/profile')}`}><div className='flex py-5 gap-5 items-center'> <i className="fa-solid fa-user h-1/2"></i><h1>Profile</h1></div></Link>
        <Link to="/login" className={`text-white font-custom ps-8 font-semibold text-lg`}><div className='flex py-5 gap-5 items-center'> <i class="fa-solid fa-right-from-bracket h-1/2"></i><h1>Log out</h1></div></Link>

      </div>
    </nav>
  );
};

export default Navbar;
