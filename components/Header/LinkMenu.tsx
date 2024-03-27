'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';

interface Props {
  dropdownName: string;
  links: {
    display_name: string;
    href: string;
  }[];
}

const LinkMenu: React.FC<Props> = ({ dropdownName, links }) => {
  const [isHidden, setIsHidden] = useState(true);
  return (
    <div className="dropdown dropdown-hover min-w-36 text-center">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost m-1 px-0 font-normal hover:bg-transparent"
        onMouseEnter={() => setIsHidden(false)}
      >
        {dropdownName}
        <IoChevronDown />
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] flex justify-center rounded-box rounded-t-none bg-[#3E3186] p-2 shadow xl:mt-[14px]"
        style={{ visibility: isHidden ? 'hidden' : 'visible' }}
      >
        {links.map((link) => (
          <li key={link.display_name} onClick={() => setIsHidden(true)}>
            <Link
              href={link.href.replaceAll('&#x2F;', '/')}
              className="flex justify-center text-center"
            >
              {link.display_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LinkMenu;
