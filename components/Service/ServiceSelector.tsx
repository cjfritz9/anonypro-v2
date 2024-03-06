'use client';

import Image from 'next/image';
import React, { useContext } from 'react';
import storiesIcon from '@/public/assets/stories-icon.svg';
import postsIcon from '@/public/assets/posts-icon.svg';
import highlightsIcon from '@/public/assets/highlights-icon.svg';
import reelsIcon from '@/public/assets/reels-icon.svg';
import { InstagramContext } from '../Context/InstagramProvider';

const buttonIcons = [storiesIcon, postsIcon, highlightsIcon, reelsIcon];

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
    <div className="join w-full max-w-[668px]">
      {buttonsData.map((data, i) => (
        <button
          key={data.displayName}
          className={`btn ${mode === i ? '!bg-accent hover:!bg-accent' : ''} join-item h-[72px] w-[25%] bg-base-100 py-3 font-normal text-primary hover:bg-base-100 hover:brightness-110`}
          onClick={() => setMode(i)}
        >
          <Image
            src={data.icon}
            height={24}
            width={24}
            // className="h-6 w-6"
            alt={`Instagram ${data.displayName} Icon`}
          />
          <p>{data.displayName}</p>
        </button>
      ))}
    </div>
  );
};

export default ServiceSelector;
