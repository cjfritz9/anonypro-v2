'use client';

import React, { useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { PiGlobeLight } from 'react-icons/pi';

type Languages =
  | 'English'
  | 'Arabic'
  | 'Danish'
  | 'Swedish'
  | 'Ukrainian'
  | 'Indonesian'
  | 'Italian'
  | 'Korean'
  | 'Norwegian'
  | 'Spanish'
  | 'Tagalog'
  | 'Turkish'
  | 'Deutsch'
  | 'French'
  | 'Dutch'
  | 'Russian'
  | 'Portugais';

const LanguagePicker: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] =
    useState<Languages>('English');
  return (
    <div className='dropdown w-full'>
      <div
        tabIndex={0}
        role='button'
        className='btn w-full m-1 font-normal bg-base-200 bg-opacity-50 text-white'
      >
        <PiGlobeLight className='text-[20px]' />
        {selectedLanguage}
        <div className='flex flex-col'>
          <IoChevronUp size={12} />
          <IoChevronDown size={12} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className='dropdown-content z-[1] menu p-2 mt-[16px] shadow bg-[#3E3186] rounded-box w-full'
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
