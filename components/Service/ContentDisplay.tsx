'use client';

import React, { useContext, useState } from 'react';
import { InstagramContext } from '../Context/InstagramProvider';
import Image from 'next/image';
import MediaPlayer from './MediaPlayer';
import { FaClone, FaVideo } from 'react-icons/fa6';
import { TbBoxMultiple } from 'react-icons/tb';
import { LuGalleryHorizontalEnd } from 'react-icons/lu';
import { BiSolidCarousel } from 'react-icons/bi';

interface SharedProps {
  onHandleSelect: (index: number) => void;
}

interface NoContentProps {
  message: string;
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

  console.log(igProfile);

  return (
    <div>
      {showMediaPlayer && (
        <MediaPlayer
          onShowMediaPlayer={onShowMediaPlayer}
          selectedIndex={selection}
        />
      )}
      {mode === 0 ? (
        stories && stories.length > 0 ? (
          <Stories onHandleSelect={onHandleSelect} />
        ) : (
          <NoContent
            message={`${igProfile.username} has no stories right now`}
          />
        )
      ) : null}
      {mode === 1 ? (
        posts && posts.items.length > 0 ? (
          <Posts />
        ) : (
          <NoContent message={`${igProfile.username} has no posts`} />
        )
      ) : null}
      {mode === 2 ? (
        highlights && highlights.length > 0 ? (
          <Highlights onHandleSelect={onHandleSelect} />
        ) : (
          <NoContent message={`${igProfile.username} has no highlights`} />
        )
      ) : null}
      {mode === 3 ? (
        reels && reels.length > 0 ? (
          <Reels onHandleSelect={onHandleSelect} />
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

const Posts: React.FC = () => {
  const { igProfile, posts } = useContext(InstagramContext);

  return (
    <div className="flex flex-wrap justify-evenly gap-4">
      {posts!.items.map((post, i) => (
        <div key={i} className="relative h-auto w-[24%]">
          {post.type === 'image' ? (
            <>
              <Image
                key={i}
                src={post.media[0].url}
                alt={`${igProfile!.username} post #${i + 1}`}
                height={1080}
                width={1920}
                className="h-full w-full rounded-xl object-cover object-center"
              />
            </>
          ) : post.type === 'video' ? (
            <>
              <video
                key={i}
                loop
                className="h-full w-full rounded-xl object-cover object-center"
              >
                <source src={post.media[0].url} type="video/mp4" />
                <source src={post.media[0].url} type="video/webm" />
              </video>
              <FaVideo
                size={32}
                className="absolute right-4 top-2 text-white opacity-90 drop-shadow-md"
              />
            </>
          ) : (
            <>
              <Image
                key={i}
                src={post.media[0].url}
                alt={`${igProfile!.username} post #${i + 1}`}
                height={1080}
                width={1920}
                className="h-full w-full rounded-xl object-cover object-center"
              />
                  <BiSolidCarousel
                    fill='white'
                size={32}
                className="absolute right-4 top-2 text-white opacity-90 drop-shadow-md"
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
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
