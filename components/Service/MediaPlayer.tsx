'use client';

import React, { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Lightbox, { LightboxDefaultProps } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { InstagramContext } from '../Context/InstagramProvider';
import { Video } from 'yet-another-react-lightbox/plugins';
import Image from 'next/image';
import verifiedBadge from '@/public/assets/verified-badge.svg';
import { FaRegComment, FaRegHeart } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';

interface LightboxSlide {
  type: 'image' | 'video';
  height?: number;
  width?: number;
  src?: string;
  autoPlay?: boolean;
  sources?: {
    src: string;
    type: 'video/mp4';
  }[];
}

interface Props {
  onShowMediaPlayer: (bool: boolean) => void;
  selectedIndex: number;
  slides: LightboxSlide[];
  sidePanelData?: {
    createdAt: number;
    caption: string;
    likeCount: number;
    commentCount: number;
  };
}

const MediaPlayer: React.FC<Props> = ({
  onShowMediaPlayer,
  slides,
  sidePanelData,
  selectedIndex,
}) => {
  return (
    <Lightbox
      open
      index={selectedIndex}
      plugins={[Video]}
      close={() => onShowMediaPlayer(false)}
      carousel={{ preload: 1, finite: true }}
      controller={{
        touchAction: 'pan-y',
        closeOnPullDown: true,
        closeOnBackdropClick: true,
      }}
      //@ts-ignore
      slides={slides}
      styles={{
        root: {
          '--yarl__color_backdrop': 'rgba(0,0,0, .97)',
        },
      }}
      render={{
        slideFooter: ({ slide }) => (
          <SidePanel data={sidePanelData} type={slide.type!} />
        ),
        buttonPrev: slides.length <= 1 ? () => null : undefined,
        buttonNext: slides.length <= 1 ? () => null : undefined,
      }}
    />
  );
};

interface SidePanelProps {
  type: 'image' | 'video';
  data?: {
    createdAt: number;
    caption: string;
    likeCount: number;
    commentCount: number;
  };
}

const SidePanel: React.FC<SidePanelProps> = ({ type, data }) => {
  const { igProfile } = useContext(InstagramContext);
  const { i18n } = useTranslation();
  const locale = i18n.language;

  if (!data) return null;

  const getFormattedDate = () => {
    const date = new Date(0);
    date.setSeconds(data.createdAt);

    return date.toLocaleDateString(locale, {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="flex h-full w-full max-w-md flex-col border-l border-gray-700 bg-black">
      <header className="flex items-center border-b border-gray-700 p-4">
        <figure className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-gradient-to-b from-[#E09B3D] via-[#C21975] to-[#7024C4]">
          <Image
            src={igProfile!.profilePictureUrl}
            alt={igProfile!.username}
            height={40}
            width={40}
            className="rounded-full"
          />
        </figure>
        <div className="ml-[14px]">
          <div className="flex">
            <p>{igProfile!.username}</p>
            {igProfile!.isVerified && (
              <Image
                src={verifiedBadge}
                alt="verified badge"
                className="ml-1"
              />
            )}
          </div>
          {type === 'video' && <p className="text-xs">Original Audio</p>}
        </div>
      </header>
      <div className="h-full p-4">
        <p className="mb-2 font-semibold">{getFormattedDate()}</p>
        <p>{data.caption}</p>
      </div>
      <div className="flex items-center gap-4 p-4 text-xl">
        <FaRegHeart />
        <p>{data.likeCount.toLocaleString(locale)}</p>
        <FaRegComment />
        <p>{data.commentCount.toLocaleString(locale)}</p>
      </div>
      <footer className="border-t border-gray-700 p-4">
        <button className="btn rounded-none">Download</button>
      </footer>
    </div>
  );
};

export default MediaPlayer;
