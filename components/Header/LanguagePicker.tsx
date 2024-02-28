'use client';

import React, { useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { PiGlobeLight } from 'react-icons/pi';

type Languages = 'English' | 'Spanish' | 'Deutsch' | 'Arabic';

const LanguagePicker: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] =
    useState<Languages>('English');
  return (
    <div className='dropdown'>
      <div
        tabIndex={0}
        role='button'
        className='btn m-1 font-normal bg-base-200 bg-opacity-50 text-white'
      >
        <PiGlobeLight size={20} />
        {selectedLanguage}
        <div className='flex flex-col'>
          <IoChevronUp size={12} />
          <IoChevronDown size={12} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
      >
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
      </ul>
    </div>
  );
};

export default LanguagePicker;
