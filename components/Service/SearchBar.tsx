'use client';

import React, { useContext, useEffect, useState } from 'react';
import { InstagramContext } from '../Context/InstagramProvider';
import { fetchProfile, fetchStories } from '@/utils/requests';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const SearchBar: React.FC = () => {
  const [username, setUsername] = useState('');
  const { t } = useTranslation('common');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    router.push(`/user-profile/${username.replaceAll('.', '%002E')}`);
  };

  return (
    <label className="input input-bordered flex h-[68px] items-center gap-2 border-white focus-within:outline-accent">
      <input
        type="text"
        className="grow placeholder-slate-300"
        placeholder={t('search_bar.placeholder_text')}
        onKeyDown={(e) => handleKeyPress(e)}
        onChange={(e) => handleChange(e)}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="h-8 w-8 cursor-pointer transition duration-200 ease-in-out hover:scale-110"
        onClick={handleSubmit}
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
};

export const HeaderSearchBar: React.FC = () => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation('common');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setUsername('');
    router.push(`/user-profile/${username.replaceAll('.', '%002E')}`);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  if (pathname === '/') return null;

  return (
    <label className="input input-bordered flex h-12 min-w-0 grow items-center gap-2 overflow-x-clip border-white bg-white focus-within:outline-accent lg:ml-4 lg:h-full">
      <input
        type="text"
        className="grow truncate text-black placeholder-gray-400"
        placeholder={t('search_bar.placeholder_text')}
        onKeyDown={(e) => handleKeyPress(e)}
        onChange={(e) => handleChange(e)}
        value={username}
      />
      {isLoading ? (
        <span className="loading loading-spinner h-6 w-6 min-w-6 text-base-200" />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-6 w-6 min-w-6 cursor-pointer text-base-200 transition duration-200 ease-in-out hover:scale-110"
          onClick={handleSubmit}
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </label>
  );
};

export default SearchBar;
