
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

  // Only close dropdown on desktop
  const closeDropdown = (e) => {
    const isDesktop = window.innerWidth >= 768;
    if (
      isDesktop &&
      isDropdownOpen &&
      !e.target.closest('.dropdown')
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, [isDropdownOpen]);

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
    e.stopPropagation();
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
    <header className="shadow fixed w-full top-0 z-50 bg-white">
      <nav className="border-gray-200 h-16 py-2.5 px-3 lg:px-4">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link href="/pages/Dashboard" className="ml-[-15px]">
            <img src="/l.jpg" alt="Logo" className="h-12" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 px-2 font-medium">
            <Link href="/pages/Dashboard" className="text-gray-700 hover:text-blue-700">
              HOME
            </Link>
            <Link href="/pages/Basics" className="text-gray-700 hover:text-blue-700">
              BEGINNER GUIDE
            </Link>
          </div>

          {/* Profile Dropdown (Desktop) */}
          <div className="relative hidden md:block dropdown">
            <div
              className="rounded-full cursor-pointer w-9 h-9 flex justify-center items-center text-white text-xl bg-blue-700"
              onClick={toggleDropdown}
            >
              {userInitial}
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-20">
                <ul className="space-y-2 p-2">
                  <li>
                    <button
                      onClick={logout}
                      className="w-full text-left hover:bg-blue-700 hover:text-white p-2 rounded"
                    >
                      Logout
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={verifyEmail}
                      className="w-full text-left hover:bg-blue-700 hover:text-white p-2 rounded"
                    >
                      Verify Email
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={getUserData}
                      className="w-full text-left hover:bg-blue-700 hover:text-white p-2 rounded"
                    >
                      User
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden bg-blue-700 text-white p-2 rounded"
            onClick={toggleMobileMenu}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu (column-wise layout) */}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col items-start gap-2 px-4 py-3 text-sm bg-white shadow border-t z-50 relative">
            <Link
              href="/pages/Dashboard"
              className="w-full px-3 py-2 rounded bg-gray-100 active:bg-gray-300 transition"
            >
              HOME
            </Link>
            <Link
              href="/pages/Basics"
              className="w-full px-3 py-2 rounded bg-gray-100 active:bg-gray-300 transition"
            >
              BEGINNER GUIDE
            </Link>
            <button
              onClick={logout}
              className="w-full text-left px-3 py-2 rounded bg-gray-100 active:bg-gray-300 transition"
            >
              Logout
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                verifyEmail();
              }}
              className="w-full text-left px-3 py-2 rounded bg-gray-100 active:bg-gray-300 transition"
            >
              Verify Email
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                getUserData();
              }}
              className="w-full text-left px-3 py-2 rounded bg-gray-100 active:bg-gray-300 transition"
            >
              User
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
