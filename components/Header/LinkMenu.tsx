import Link from 'next/link';
import React, { useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';

interface Props {
  dropdownName: string;
  links: {
    displayName: string;
    href: string;
  }[];
}

const LinkMenu: React.FC<Props> = ({ dropdownName, links }) => {
  return (
    <div className='dropdown w-32 text-center'>
      <div
        tabIndex={0}
        role='button'
        className='btn btn-ghost m-1 hover:bg-transparent font-normal px-0'
      >
        {dropdownName}
        <IoChevronDown />
      </div>
      <ul
        tabIndex={0}
        className='dropdown-content z-[1] menu p-2 mt-[14px] shadow bg-base-200 rounded-box rounded-t-none justify-center flex bg-opacity-25'
      >
        {links.map((link) => (
          <li key={link.displayName}>
            <Link href={link.href} className='text-center flex justify-center'>
              {link.displayName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LinkMenu;
