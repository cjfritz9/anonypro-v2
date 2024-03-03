'use client';

import Image from 'next/image';
import React, { useContext, useEffect } from 'react';
import storiesIcon from '@/public/assets/stories-icon.svg';
import postsIcon from '@/public/assets/posts-icon.svg';
import highlightsIcon from '@/public/assets/highlights-icon.svg';
import ppIcon from '@/public/assets/pp-icon.svg';
import { InstagramContext } from '../Context/InstagramProvider';

const buttonIcons = [storiesIcon, postsIcon, highlightsIcon, ppIcon];

interface Props {
  displayNames: string[];
}

const ServiceSelector: React.FC<Props> = ({ displayNames }) => {
  const { mode, setMode } = useContext(InstagramContext);
  const buttonsData = buttonIcons.map((icon, i) => ({
    displayName: displayNames[i],
    icon,
  }));

  return (
    <div className="join join-vertical w-full max-w-[668px] lg:join-horizontal">
      {buttonsData.map((data, i) => (
        <button
          key={data.displayName}
          className={`btn ${mode === i ? '!bg-accent hover:!bg-accent' : ''} join-item h-[72px] w-full bg-base-100 font-normal text-primary hover:bg-base-100 hover:brightness-110 lg:w-[25%]`}
          onClick={() => setMode(i)}
        >
          <Image src={data.icon} alt="Instagram Stories Icon" />
          {data.displayName}
        </button>
      ))}
    </div>
  );
};

export default ServiceSelector;
