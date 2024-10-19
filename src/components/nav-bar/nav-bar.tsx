"use client"
import Image from "next/image";
import React, { useState } from "react";

function NavBar({ name, email, companyName }: { name?: string; email?: string; companyName?: string }) {
  const [showDropdown, setShowDropdown] = useState(false);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    window.location.reload(); // Refresh the page
  };

  return (
    <div className={` w-screen top-0 right-0 left-0 z-20 bg-white py-10 px-14  ${name ? 'border-b border-b-[#576474] w-screen' : ''}`}>
      <div className="flex items-center justify-between">
        <span>
          <Image src="/assets/Logo.png" height={43} width={165} alt="no" className="w-full" />
        </span>
        <span className="flex items-center gap-6">
          <span className="text-[#576474] text-2xl font-medium">Contact</span>
          {name && (
            <div
              className="relative flex items-center gap-1.5 p-3 border border-[#576474] cursor-pointer"
              onMouseEnter={() => setShowDropdown(true)} // Show dropdown on hover
              // Hide dropdown on mouse leave
            >
              <span className="bg-[#576474] h-6 w-6 rounded-full" />
              <span className="text-[#576474] text-sm">{name}</span>

              {/* Dropdown menu */}
              {showDropdown && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-[#576474] rounded-lg shadow-lg p-4 w-64" onMouseLeave={() => setShowDropdown(false)} >
                  <div className="text-sm text-gray-700 mb-2">
                    <p className="font-semibold">{name}</p>
                    <p>{companyName}</p>
                    <p>{email}</p>
                  </div>
                  <button
                    className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
                    onClick={handleLogout} // Logout handler
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </span>
      </div>
    </div>
  );
}

export default NavBar;
