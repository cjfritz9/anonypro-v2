'use client';

import Link from 'next/link';
import React from 'react';
import { RxTimer } from 'react-icons/rx';

const Announcement: React.FC = () => {
  return (
    <div className="sticky top-0 z-10 flex w-full items-center justify-between bg-blue-700 px-4 py-2 shadow-lg sm:px-12">
      <Link
        href="https://rebrand.ly/announcementbar"
        target="_blank"
        className="mx-2 flex grow cursor-pointer justify-center lg:mx-4"
      >
        <div className="hidden items-center gap-4 lg:flex">
          <RxTimer size={24} />
          <div className="flex items-center gap-2">
            <p className="font-bold text-green-300">FLASH OFFER:</p>
            <p>Get REAL IG Likes Every Time You Upload, Automatically! 🎉</p>
          </div>
          <button className="btn btn-outline h-8 min-h-0 p-2">
            Learn More
          </button>
        </div>
        <div className="flex items-center gap-4 lg:hidden">
          {/* <RxTimer size={20} /> */}
          <div className="flex items-center gap-2">
            {/* <p className="font-bold text-green-300">FLASH OFFER:</p> */}
            <p className='text-xs'>Get REAL IG Likes Automatically With Each Upload! 🎉</p>
          </div>
          <button className="btn btn-outline h-8 min-h-0 p-2">
            Learn More
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Announcement;
