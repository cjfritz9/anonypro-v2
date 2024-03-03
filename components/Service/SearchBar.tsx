'use client';

import React, { useContext, useState } from 'react';
import { InstagramContext } from '../Context/InstagramProvider';
import { fetchProfile, fetchStories } from '@/utils/requests';
import { useRouter } from 'next/navigation';

interface Props {
  placeholderText: string;
}

const SearchBar: React.FC<Props> = ({ placeholderText }) => {
  const [username, setUsername] = useState('');
  const router = useRouter()

  const { setIgProfile, mode, setStories, setPosts, setHighlights, setReels } =
    useContext(InstagramContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    router.push(`/user-profile/${username}`)
  };

  return (
    <label className="input input-bordered flex h-[68px] items-center gap-2 border-white focus-within:outline-accent">
      <input
        type="text"
        className="grow placeholder-slate-300"
        placeholder={placeholderText}
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

export default SearchBar;
