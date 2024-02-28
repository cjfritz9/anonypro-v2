'use client';

import Image from 'next/image';
import React from 'react';
import storiesIcon from '@/public/assets/stories-icon.svg';
import postsIcon from '@/public/assets/posts-icon.svg';
import highlightsIcon from '@/public/assets/highlights-icon.svg';
import ppIcon from '@/public/assets/pp-icon.svg';

const buttonsData = [
  {
    displayName: 'Stories',
    icon: storiesIcon
  },
  {
    displayName: 'Posts',
    icon: postsIcon
  },
  {
    displayName: 'Highlights',
    icon: highlightsIcon
  },
  {
    displayName: 'Profile',
    icon: ppIcon
  }
];

const ServiceSelector: React.FC = () => {
  return (
    <div className='join w-full join-vertical max-w-[668px] lg:join-horizontal'>
      {buttonsData.map((data) => (
        <button
          key={data.displayName}
          className='btn text-primary font-normal join-item w-full lg:w-[25%] h-[72px] bg-base-100'
        >
          <Image src={data.icon} alt='Instagram Stories Icon' />
          {data.displayName}
        </button>
      ))}
    </div>
  );
};

export default ServiceSelector;
