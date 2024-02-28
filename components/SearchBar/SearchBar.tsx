import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <label className='input input-bordered flex items-center gap-2 h-[68px]'>
      <input
        type='text'
        className='grow placeholder-slate-300'
        placeholder='Instagram Username'
      />
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 16 16'
        fill='currentColor'
        className='w-8 h-8 cursor-pointer hover:scale-110 transition ease-in-out duration-200'
      >
        <path
          fillRule='evenodd'
          d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
          clipRule='evenodd'
        />
      </svg>
    </label>
  );
};

export default SearchBar;
