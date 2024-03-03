'use client';

import React, { useContext, useState } from 'react';
import { InstagramContext } from '../Context/InstagramProvider';
import Image from 'next/image';
import MediaPlayer from './MediaPlayer';

interface NoContentProps {
  message: string;
}

interface SharedProps {
  onHandleSelect: (index: number) => void;
}

const ContentDisplay: React.FC = () => {
  const [showMediaPlayer, setShowMediaPlayer] = useState(false);
  const [selection, setSelection] = useState(0);

  const { igProfile, stories, posts, highlights, reels, mode } =
    useContext(InstagramContext);

  const onShowMediaPlayer = (bool: boolean) => {
    setShowMediaPlayer(bool);
  };

  const onHandleSelect = (index: number) => {
    setSelection(index);
    setShowMediaPlayer(true);
  };

  if (!igProfile) return null;

  return (
    <div>
      {showMediaPlayer && <MediaPlayer onShowMediaPlayer={onShowMediaPlayer} selectedIndex={selection} />}
      {mode === 0 ? (
        stories && stories.length > 0 ? (
          <Stories
            onHandleSelect={onHandleSelect}
          />
        ) : (
          <NoContent
            message={`${igProfile.username} has no stories right now`}
          />
        )
      ) : null}
      {mode === 1 ? (
        posts && posts.length > 0 ? (
          <Posts
            onHandleSelect={onHandleSelect}
          />
        ) : (
          <NoContent message={`${igProfile.username} has no posts`} />
        )
      ) : null}
      {mode === 2 ? (
        highlights && highlights.length > 0 ? (
          <Highlights
            onHandleSelect={onHandleSelect}
          />
        ) : (
          <NoContent message={`${igProfile.username} has no highlights`} />
        )
      ) : null}
      {mode === 3 ? (
        reels && reels.length > 0 ? (
          <Reels
            onHandleSelect={onHandleSelect}
          />
        ) : (
          <NoContent message={`${igProfile.username} has no reels`} />
        )
      ) : null}
    </div>
  );
};

const Stories: React.FC<SharedProps> = ({ onHandleSelect }) => {
  const { igProfile, stories } = useContext(InstagramContext);

  return (
    <div className="flex flex-wrap justify-evenly gap-4">
      {stories.map((story, i) =>
        story.type === 'image' ? (
          <Image
            key={i}
            src={story.mediaUrl}
            alt={`${igProfile!.username} story #${i + 1}`}
            height={1080}
            width={1920}
            className="h-auto w-[23%] rounded-xl object-cover object-center"
            onClick={() => onHandleSelect(i)}
          />
        ) : (
          <video
            key={i}
            loop
            controls
            className="h-auto w-[23%] rounded-xl object-cover object-center"
            onClick={() => onHandleSelect(i)}
          >
            <source src={story.mediaUrl} type="video/mp4" />
            <source src={story.mediaUrl} type="video/webm" />
          </video>
        )
      )}
    </div>
  );
};

const Posts: React.FC<SharedProps> = ({ onHandleSelect }) => {
  return <div></div>;
};

const Highlights: React.FC<SharedProps> = ({ onHandleSelect }) => {
  return <div></div>;
};

const Reels: React.FC<SharedProps> = ({ onHandleSelect }) => {
  return <div></div>;
};

const NoContent: React.FC<NoContentProps> = ({ message }) => {
  return <div>{message}</div>;
};

export default ContentDisplay;
