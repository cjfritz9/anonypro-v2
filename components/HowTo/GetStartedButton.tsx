'use client';

import React from 'react';

const GetStartedButton: React.FC = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <button
      onClick={handleClick}
      className="btn btn-accent mt-12 text-lg font-normal text-white"
    >
      GET STARTED
    </button>
  );
};

export default GetStartedButton;
