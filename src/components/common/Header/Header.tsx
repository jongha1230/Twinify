"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Search from "@/components/common/Search/Search";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const user = { name: "테스트" };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="px-8 py-4 flex items-center justify-end bg-black relative">
      <Search />
      <div className="w-1/3 flex justify-end">
        {user ? (
          <div className="relative mr-16" ref={dropdownRef}>
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2">
              <Image src="/defaultProfile.webp" alt="User avatar" width={32} height={32} className="rounded-full" />
              <span className="text-white">{user.name}</span>
              <svg
                className={`transition-transform transform ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="currentColor"
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-4 w-48 bg-gray-800 rounded-md shadow-lg">
                <ul className="py-1">
                  <li>
                    <Link href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">
                      마이페이지
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">
                      로그아웃
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="space-x-4">
            <Link href="/login" className="text-white hover:text-gray-300">
              로그인
            </Link>
            <Link href="/signup" className="text-white hover:text-gray-300">
              회원가입
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
