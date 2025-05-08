
'use client';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppContext } from '@/app/userContext/page';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { data, setData } = useAppContext();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const closeDropdown = (e) => {
    if (!e.target.closest('.dropdown')) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  const getUserData = async () => {
    setIsMobileMenuOpen(false);
    try {
      const response = await axios.post("/api/users/me");
      setData(response.data.data);
      router.push("/authentications/Profile");
    } catch (error) {
      toast.error("Failed to fetch user data");
    }
  };


  const logout = async (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/authentications/Login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const verifyEmail = () => {
    setIsMobileMenuOpen(false);
    router.push("/authentications/verifyemail");
  };

  const userInitial = data?.username?.charAt(0)?.toUpperCase() || 'A';

  return (
    <header className="shadow fixed w-full top-0 z-10 bg-white">
      <nav className="border-gray-200 h-16 py-2.5 px-3 lg:px-4">
        <div className="flex justify-between items-center">

          <Link href="/pages/Dashboard" className="ml-[-15px]">
            <img src="/l.jpg" alt="Logo" className="h-12" />
          </Link>


          <div className="hidden lg:flex space-x-8 px-2 font-medium">

            <Link href="/pages/Dashboard" className="text-gray-700 hover:text-orange-700 ">
              HOME
            </Link>
            <Link href="/pages/Questions" className="text-gray-700 hover:text-orange-700">
              BEGINNER GUIDE
            </Link>

          </div>


          <div className="relative hidden lg:block dropdown">
            <div
              className="rounded-full cursor-pointer w-9 h-9 flex justify-center items-center text-white text-xl bg-red-800"
              onClick={toggleDropdown}
            >
              {userInitial}
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-20">
                <ul className="space-y-2 p-2">
                  <li><button onClick={logout} className="w-full text-left hover:bg-gray-200 p-2 rounded">Logout</button></li>
                  <li><button onClick={verifyEmail} className="w-full text-left hover:bg-gray-200 p-2 rounded">Verify Email</button></li>
                  <li><button onClick={getUserData} className="w-full text-left hover:bg-gray-200 p-2 rounded">User</button></li>
                </ul>
              </div>
            )}
          </div>


          <button className="lg:hidden bg-red-800 text-white p-2 rounded" onClick={toggleMobileMenu}>
            ☰
          </button>
        </div>


        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 bg-white shadow-md rounded p-4 space-y-2">
            <Link href="/pages/Dashboard" className="block text-gray-700 hover:text-orange-700">HOME</Link>
            <Link href="/pages/Questions" className="block text-gray-700 hover:text-orange-700">BEGINNER GUIDE</Link>
            <hr />
            <button onClick={logout} className="block w-full text-left text-gray-700 hover:bg-gray-200 p-2 rounded">Logout</button>
            <button onClick={verifyEmail} className="block w-full text-left text-gray-700 hover:bg-gray-200 p-2 rounded">Verify Email</button>
            <button onClick={getUserData} className="block w-full text-left text-gray-700 hover:bg-gray-200 p-2 rounded">User</button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;


