'use client';

import React, { useContext, useEffect, useState } from 'react';
import Lightbox, { useLightboxState } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { InstagramContext } from '../Context/InstagramProvider';
import { Download, Video } from 'yet-another-react-lightbox/plugins';
import Image from 'next/image';
import verifiedBadge from '@/public/assets/verified-badge.svg';
import { FaRegComment, FaRegHeart } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import { getBoostLikes, postRecaptchaToken } from '@/lib/requests';
import { isBoostLimited } from '@/lib/tools';
import { useReCaptcha } from 'next-recaptcha-v3';

export interface LightboxSlide {
  id: string;
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
  shortcode?: string;
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
        iconDownload:
          sidePanelData || multiSidePanelData
            ? () => null
            : () => <DownloadButton />,
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

  return (
    <div className="flex w-full max-w-md flex-col overflow-y-auto border-t border-gray-700 bg-black lg:h-full lg:border-l lg:border-t-0">
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
          <DownloadButton multiStepDownload />
          <BoostButton />
        </div>
      </footer>
    </div>
  );
};

interface DownloadButtonProps {
  multiStepDownload?: boolean;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  multiStepDownload,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { currentIndex: i, currentSlide } = useLightboxState();

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
    if (currentSlide?.id) {
      setIsDownloading(true);
      window.onblur = hideDownloadingMessage;
      if (!multiStepDownload) return;

      handleToast();
      //@ts-ignore
      fetch(`/api/download/${currentSlide.id}`)
        .then((response) => response.blob())
        .then((blob) => {
          setIsDownloading(false);
          const blobURL = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = blobURL;
          a.style.cssText = 'display: none';
          //@ts-ignore
          a.download = currentSlide.id;
          document.body.appendChild(a);
          a.click();
        });
    }
  };
  return (
    <>
      <button className="btn w-28 rounded-none" onClick={handleDownload}>
        {isDownloading ? (
          <span className="loading loading-spinner" />
        ) : (
          <p>Download</p>
        )}
      </button>
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
    </>
  );
};

const BoostButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'error' | 'success' | null>(null);
  const [boostLimited, setBoostLimited] = useState({
    isLimited: false,
    remainder: 0,
  });
  const { currentSlide } = useLightboxState();
  const { executeRecaptcha } = useReCaptcha();

  const resetStatus = () => {
    setTimeout(() => {
      setStatus(null);
    }, 5000);
  };
  const handleBoost = async () => {
    if (boostLimited.isLimited) return;
    const { isLimited, remainder } = isBoostLimited();

    if (isLimited) {
      setBoostLimited({
        isLimited: true,
        remainder,
      });
      return;
    }
    setIsLoading(true);

    const token = await executeRecaptcha('likes_boost');
    const captchaResponse = await postRecaptchaToken(token);

    if (
      !captchaResponse ||
      !captchaResponse.success ||
      captchaResponse.score < 0.7
    ) {
      //@ts-ignore
      if (!currentSlide?.shortcode) {
        setIsLoading(false);
        return;
      }
      //@ts-ignore
      const response = await getBoostLikes(currentSlide.shortcode);
      setIsLoading(false);

      if (response && response.status === 'ok') {
        setStatus('success');
      } else {
        setStatus('error');
      }
    }
    resetStatus();
  };

  useEffect(() => {
    if (boostLimited.remainder < 1) {
      setBoostLimited({ isLimited: false, remainder: 0 });
      return;
    }

    const interval = setInterval(() => {
      setBoostLimited((prev) => ({
        ...prev,
        remainder: prev.remainder - 1,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [boostLimited.remainder]);
  return (
    <>
      <div
        className={boostLimited.isLimited ? 'tooltip' : ''}
        data-tip="Next boost in:"
      >
        <button
          onClick={handleBoost}
          className={`${boostLimited.isLimited ? 'pointer-events-none' : ''} btn btn-success w-28 rounded-none`}
        >
          {isLoading ? (
            <span className="loading loading-spinner" />
          ) : boostLimited.isLimited ? (
            <p>
              {Math.floor(boostLimited.remainder / 3600)}:
              {Math.floor((boostLimited.remainder % 3600) / 60)}:
              {Math.floor(boostLimited.remainder % 60)}
            </p>
          ) : (
            <p>Boost</p>
          )}
        </button>
      </div>
      {status && (
        <div className="toast toast-center toast-top lg:toast-bottom">
          <div
            className={`alert ${status === 'error' ? 'alert-error' : 'alert-success'}`}
          >
            <div>
              <p className="py-2">
                {status === 'error'
                  ? 'Something went wrong'
                  : 'Your likes have been boosted!'}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MediaPlayer;
