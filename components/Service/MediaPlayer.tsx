'use client';

import React, { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { InstagramContext } from '../Context/InstagramProvider';
import { Video } from 'yet-another-react-lightbox/plugins';

interface Props {
  onShowMediaPlayer: (bool: boolean) => void;
  selectedIndex: number;
}

interface LightboxSlide {
  type: 'image' | 'video';
  src?: string;
  autoPlay?: true;
  sources?: {
    src: string;
    type: 'video/mp4';
  }[];
}

const MediaPlayer: React.FC<Props> = ({ onShowMediaPlayer, selectedIndex }) => {
  const [slides, setSlides] = useState<LightboxSlide[]>([]);

  const { igProfile, mode, stories, posts, highlights, reels } =
    useContext(InstagramContext);

  const { username } = igProfile!;

  useEffect(() => {
    if (mode === 0) {
      setSlides(
        stories.map((story, i) =>
          story.type === 'image'
            ? {
                type: story.type,

                src: story.mediaUrl,
              }
            : {
                type: story.type,

                autoPlay: true,
                sources: [{ src: story.mediaUrl, type: 'video/mp4' }],
              }
        )
      );
    } else if (mode === 1) {
      setSlides(
        posts.map((story, i) =>
          story.type === 'image'
            ? {
                type: story.type,

                src: story.mediaUrl,
              }
            : {
                type: story.type,

                autoPlay: true,
                sources: [{ src: story.mediaUrl, type: 'video/mp4' }],
              }
        )
      );
    } else if (mode === 2) {
      setSlides(
        highlights.map((story, i) =>
          story.type === 'image'
            ? {
                type: story.type,

                src: story.mediaUrl,
              }
            : {
                type: story.type,

                autoPlay: true,
                sources: [{ src: story.mediaUrl, type: 'video/mp4' }],
              }
        )
      );
    } else if (mode === 3) {
      setSlides(
        reels.map((story, i) =>
          story.type === 'image'
            ? {
                type: story.type,

                src: story.mediaUrl,
              }
            : {
                type: story.type,

                autoPlay: true,
                sources: [{ src: story.mediaUrl, type: 'video/mp4' }],
              }
        )
      );
    }
  }, [mode, stories, posts, highlights, reels, username]);

  return (
    <Lightbox
      open
      index={selectedIndex}
      plugins={[Video]}
      close={() => onShowMediaPlayer(false)}
      carousel={{ preload: 1 }}
      controller={{
        touchAction: 'pan-y',
        closeOnPullDown: true,
        closeOnBackdropClick: true,
      }}
      //@ts-ignore
      slides={slides}
      styles={{ root: { '--yarl__color_backdrop': 'rgba(0,0,0, .65' } }}
    />
    // <div
    //   className="fixed z-10 flex min-h-[100dvh] min-w-[100dvw] items-center justify-center bg-black bg-opacity-25"
    //   onClick={() => onShowMediaPlayer(false)}
    // >
    //   <div className="h-40 w-40 bg-red-500"></div>
    // </div>
  );
};

export default MediaPlayer;
