


import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='bg-slate-200 shadow-md pb-1 sm:pb-0 relative'>
      <div className='flex justify-between items-center max-w-6xl sm:max-w-7xl mx-auto p-3'>
       
        {/* Toggle Button */}
        <div className='relative mx-2 z-20 block sm:hidden'>
          {!isMenuOpen ? (
            <div onClick={toggleMenu} className='block sm:hidden cursor-pointer'>
              <div className='h-[3px] w-[23px] bg-slate-800 my-1'></div>
              <div className='h-[3px] w-[23px] bg-slate-800 my-1'></div>
              <div className='h-[3px] w-[23px] bg-slate-800 my-1'></div>
            </div>
          ) : (
            <div onClick={toggleMenu} className='relative w-[23px] h-[15px] cursor-pointer'>
              <div className='h-[3px] w-[23px] bg-slate-100 absolute top-1/2 transform -translate-y-1/2 rotate-45'></div>
              <div className='h-[3px] w-[23px] bg-slate-100 absolute top-1/2 transform -translate-y-1/2 -rotate-45'></div>
            </div>
          )}
        </div>

        <Link to='/'>
          <h1 className='font-bold text-xl sm:text-2xl flex flex-wrap '>
            <span className='text-slate-500'>Vans</span>
            <span className='text-slate-700'>Estate</span>
            <img className=' w-12 sm:w-[65px] mt-[-7px] sm:mt-[-15px]'  src="../public/images/logohse.png" alt="" />
          </h1>
        </Link>

        <form
          onSubmit={handleSubmit}
          className='bg-slate-100 p-2 rounded-lg hidden sm:flex items-center'>
          <input
            type="text"
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='bg-transparent focus:outline-none w-24 sm:w-64 md:w-[300px]'
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>

        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
          </Link>
          <Link to='/sign-in'></Link>
          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar} alt='profile' />
            ) : (
              <li className='text-slate-700 hover:underline'>Sign In</li>
            )}
          </Link>
        </ul>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform duration-300
           ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ width: '70vw', zIndex: 50 }}
      >
        {/* X Button Inside the Panel */}
        <div
          onClick={toggleMenu}
          className='absolute top-4 left-4 cursor-pointer text-white text-3xl mt-3'
        >
          <div className='h-[3px] w-[23px] bg-slate-100 transform rotate-45'></div>
          <div className='h-[3px] w-[23px] bg-slate-100 transform -rotate-45'></div>
        </div>
        <div className='p-4 mt-12'>
          {/* Add sidebar content here */}
          <h2 className='text-xl font-bold'>Menu</h2>
          {/* Example links */}
          <p className='text-sm'>Nothing to show here yet</p>
          {/* Add more links or content as needed */}
        </div>
      </div>

      {/* Mobile Search Form */}
      <form
        onSubmit={handleSubmit}
        className='bg-slate-100 p-2 rounded-lg flex sm:hidden items-center mx-[25px] justify-between mb-[5px]'
      >
        <input
          type="text"
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='bg-transparent focus:outline-none w-24 sm:w-64 ml-3'
        />
        <button>
          <FaSearch className="text-slate-600 mx-2" />
        </button>
      </form>
    </header>
  );
}




