import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleLogout = () => {
    
    let result=authService.logout()
    if(result)navigate('/login')
  };

  const handleResetPassword = () => {
    // Implement your reset password logic here
    console.log('Reset Password');
    navigate('/resetPassword'); // Redirect to reset password page
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex items-center justify-between fixed w-full z-50">
      <div className="text-lg font-semibold">StockImagePlatform</div>
      <div className="relative">
        <button 
          onClick={handleDropdownToggle}
          className="bg-gray-600 p-2 rounded focus:outline-none"
        >
          Options
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-48">
            <button 
              onClick={handleResetPassword} 
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              Reset Password
            </button>
            <button 
              onClick={()=>navigate('/dashboard')} 
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              dashboard
            </button>
            <button 
              onClick={handleLogout} 
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
