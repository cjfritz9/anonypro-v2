'use client';

import React, { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Lightbox, { useLightboxState } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { InstagramContext } from '../Context/InstagramProvider';
import { Download, Video } from 'yet-another-react-lightbox/plugins';
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
  caption?: string;
  code?: string;
  download?: boolean | string | { url: string; filename?: string };
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
  multiSidePanelData?: Props['sidePanelData'][];
}

const MediaPlayer: React.FC<Props> = ({
  onShowMediaPlayer,
  slides,
  sidePanelData,
  selectedIndex,
  multiSidePanelData,
}) => {
  console.log(slides)
  return (
    <Lightbox
      open
      index={selectedIndex}
      plugins={[Video, Download]}
      close={() => onShowMediaPlayer(false)}
      carousel={{
        finite: slides.length === 1,
        preload: 1,
      }}
      animation={{
        swipe: 0,
      }}
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
        iconDownload: sidePanelData ? () => null : undefined,       
        slideFooter: ({ slide }) => (
          <SidePanel
            data={sidePanelData}
            multiSlideData={multiSidePanelData}
            type={slide.type!}
          />
        ),
        buttonPrev: slides.length <= 1 ? () => null : undefined,
        buttonNext: slides.length <= 1 ? () => null : undefined,
      }}
    />
  );
};

interface SidePanelProps {
  type: 'image' | 'video';
  // mediaUrl: string;
  data?: {
    createdAt: number;
    caption: string;
    likeCount: number;
    commentCount: number;
  };
  multiSlideData?: SidePanelProps['data'][];
}

const SidePanel: React.FC<SidePanelProps> = ({
  type,
  // mediaUrl,
  data,
  multiSlideData,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { igProfile } = useContext(InstagramContext);
  const { i18n } = useTranslation();
  const locale = i18n.language;
  const { currentIndex: i, currentSlide } = useLightboxState();

  if (multiSlideData) {
    data = multiSlideData[i];
  }

  const getFormattedDate = () => {
    if (!data) return null;
    const date = new Date(0);
    date.setSeconds(data.createdAt);

    return date.toLocaleDateString(locale, {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (!data || !currentSlide) return null;

  const hideDownloadingMessage = () => {
    setIsDownloading(false);
  };

  const handleToast = () => {
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleDownload = async () => {
    //@ts-ignore
    if (currentSlide?.code) {
      setIsDownloading(true);
      const link = document.createElement('a');
      //@ts-ignorev
      link.href = `/api/download/${currentSlide.code}${i > 0 ? `?index=${i}` : ''}`;
      link.setAttribute('style', 'display: none;');
      //@ts-ignore
      link.setAttribute('download', `${currentSlide.code}_${i + 1}`);
      window.onblur = hideDownloadingMessage;
      handleToast();

      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    }
  };

  return (
    <div className="flex w-full max-w-md flex-col overflow-y-scroll border-t border-gray-700 bg-black lg:h-full lg:border-l lg:border-t-0">
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
      <div className="h-fit p-4">
        <p className="mb-2 font-semibold">{getFormattedDate()}</p>
        <p>{data.caption}</p>
      </div>
      <div className="flex min-h-min items-center gap-4 p-4">
        <FaRegHeart />
        <p>{data.likeCount.toLocaleString(locale)}</p>
        <FaRegComment />
        <p>{data.commentCount.toLocaleString(locale)}</p>
      </div>
      <footer className="border-t border-gray-700 p-4">
        <div className="flex gap-4">
          <button className="btn w-28 rounded-none" onClick={handleDownload}>
            {isDownloading ? (
              <span className="loading loading-spinner" />
            ) : (
              <p>Download</p>
            )}
          </button>
          <button className="btn btn-success w-28 rounded-none">Boost</button>
        </div>
        {showToast && (
          <div className="toast toast-center toast-top lg:toast-bottom">
            <div className="alert alert-info">
              <div>
                <p className="py-2">Getting the highest available quality</p>
                <p className="py-2">Your download will begin shortly</p>
              </div>
            </div>
          </div>
        )}
      </footer>
    </div>
  );
};

export default MediaPlayer;
