'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';

const Announcement: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="sticky top-0 z-10 flex w-full justify-between bg-accent px-12 py-2">
      <div />
      <Link
        href="https://vvslikes.com"
        target="_blank"
        className="mx-4 flex grow cursor-pointer justify-center"
      >
        <p>Get REAL Instagram Likes</p>
      </Link>
      <IoClose
        size={24}
        onClick={() => setIsOpen(false)}
        className="cursor-pointer"
      />
    </div>
  );
};

export default Announcement;
