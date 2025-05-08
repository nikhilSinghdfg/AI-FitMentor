'use client';
import React from 'react';
import { useAppContext } from '@/app/userContext/page';
import { useRouter } from 'next/navigation';

function Page() {
  const { data } = useAppContext();
  const router = useRouter();

  const getHomepage = () => {
    router.push("/pages/Dashboard");
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-md p-4">
      <div className="relative w-full max-w-sm md:max-w-md bg-white rounded-xl shadow-lg border border-gray-300 px-6 pt-10 pb-6">
        {/* Close Button */}
        <button
          onClick={getHomepage}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold focus:outline-none"
          aria-label="Close"
        >
          ✕
        </button>

        {/* User Info */}
        <h1 className="text-xl font-semibold text-gray-900 mb-6 text-center">User Details</h1>
        <div className="space-y-4 text-gray-800">
          <p><span className="font-medium">Name:</span> {data?.username}</p>
          <p><span className="font-medium">Email:</span> {data?.email}</p>
        </div>
      </div>
    </div>
  );
}

export default Page;
