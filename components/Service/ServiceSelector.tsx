'use client';

import Image from 'next/image';
import React, { useContext, useEffect, useRef } from 'react';
import storiesIcon from '@/public/assets/stories-icon.svg';
import postsIcon from '@/public/assets/posts-icon.svg';
import highlightsIcon from '@/public/assets/highlights-icon.svg';
import reelsIcon from '@/public/assets/reels-icon.svg';
import { InstagramContext } from '../Context/InstagramProvider';
import { usePathname } from 'next/navigation';
import DisplayAd from '../Ads/DisplayAd';

const buttonIcons = [storiesIcon, postsIcon, highlightsIcon, reelsIcon];

interface Props {
  displayNames: string[];
}

const ServiceSelector: React.FC<Props> = ({ displayNames }) => {
  const selectorRef = useRef<HTMLDivElement>(null);
  const {
    mode,
    setMode,
    pagination: { isLoading },
    setPagination,
  } = useContext(InstagramContext);
  const pathname = usePathname();
  const buttonsData = buttonIcons.map((icon, i) => ({
    displayName: displayNames[i],
    icon,
  }));

  const handleSelection = (index: number) => {
    setMode(index);
    setPagination({ isLoading: false, page: 1 });
  };

  useEffect(() => {
    if (isLoading && selectorRef.current) {
      selectorRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
      });
    }
  }, [isLoading, selectorRef]);

  useEffect(() => {
    if (pathname === '/instagram-story-download') {
      setMode(0);
    }

    if (pathname === '/instagram-highlight-viewer') {
      setMode(2);
    }

    if (pathname === '/instagram-reels-video-downloader') {
      setMode(3);
    }
  }, [setMode, pathname]);

  return (
    <div ref={selectorRef} className="join w-full max-w-[720px]">
      {buttonsData.map((data, i) => (
        <button
          key={data.displayName}
          className={`${mode === i ? '!bg-accent hover:!bg-accent' : ''} btn join-item flex h-[84px] w-[25%] flex-col bg-base-100 px-1 py-3 font-normal text-primary hover:bg-base-100 hover:brightness-110 xs:px-3 md:h-[72px] md:flex-row`}
          onClick={() => handleSelection(i)}
        >
          <Image
            src={data.icon}
            height={24}
            width={24}
            className={`${i === 3 ? 'h-7 w-7 xs:h-5 xs:w-5' : 'h-8 w-8 xs:h-6 xs:w-6'} hidden xs:block`}
            alt={`Instagram ${data.displayName} Icon`}
          />
          <p className="text-xs xs:text-base">{data.displayName}</p>
        </button>
      ))}
    </div>
  );
};

export default ServiceSelector;
