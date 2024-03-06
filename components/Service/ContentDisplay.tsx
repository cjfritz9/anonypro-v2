'use client';

import React, { useContext, useState } from 'react';
import { InstagramContext } from '../Context/InstagramProvider';
import Image from 'next/image';
import MediaPlayer from './MediaPlayer';
import { FaClone, FaPlay, FaVideo } from 'react-icons/fa6';
import { TbBoxMultiple } from 'react-icons/tb';
import { LuGalleryHorizontalEnd } from 'react-icons/lu';
import { BiSolidCarousel } from 'react-icons/bi';

interface NoContentProps {
  message: string;
}

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
}

const ContentDisplay: React.FC = () => {
  const { igProfile, stories, posts, highlights, reels, mode } =
    useContext(InstagramContext);

  if (!igProfile) return null;

  return (
    <div>
      {mode === 0 ? (
        stories && stories.length > 0 ? (
          <Stories />
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
          <Highlights />
        ) : (
          <NoContent message={`${igProfile.username} has no highlights`} />
        )
      ) : null}
      {mode === 3 ? (
        reels && reels.length > 0 ? (
          <Reels />
        ) : (
          <NoContent message={`${igProfile.username} has no reels`} />
        )
      ) : null}
    </div>
  );
};

const Stories: React.FC = () => {
  const [showMediaPlayer, setShowMediaPlayer] = useState(false);
  const [selection, setSelection] = useState(0);
  const { igProfile, stories } = useContext(InstagramContext);

  const onHandleSelect = (idx: number) => {
    setSelection(idx);
    setShowMediaPlayer(true);
  };

  const slides: LightboxSlide[] = stories.map((story) => ({
    type: story.type,
    src: story.thumbnailUrl,
    autoPlay: true,
    sources: [
      {
        src: story.mediaUrl,
        type: 'video/mp4',
      },
    ],
  }));

  return (
    <div className="flex flex-wrap justify-evenly gap-4">
      {showMediaPlayer && (
        <MediaPlayer
          onShowMediaPlayer={setShowMediaPlayer}
          selectedIndex={selection}
          slides={slides}
        />
      )}
      {stories.map((story, i) => (
        <div
          key={i}
          className={`${stories.length > 2 ? 'lg:w-[23%]' : stories.length === 2 ? 'lg:w-[48%]' : ''} relative h-auto w-full object-cover object-center`}
        >
          <Image
            src={story.thumbnailUrl}
            alt={`${igProfile!.username} story #${i + 1}`}
            height={640}
            width={360}
            className="h-auto w-full cursor-pointer rounded-xl duration-150 hover:-translate-y-2"
            onClick={() => onHandleSelect(i)}
          />
          {story.type === 'video' && (
            <FaPlay size={36} className="absolute right-[44%] top-[50%]" />
          )}
        </div>
      ))}
    </div>
  );
};

const Posts: React.FC = () => {
  const [showMediaPlayer, setShowMediaPlayer] = useState(false);
  const [slides, setSlides] = useState<LightboxSlide[]>([]);
  const [postData, setPostData] = useState({
    createdAt: 0,
    likeCount: 0,
    commentCount: 0,
    caption: '',
  });
  const { igProfile, posts } = useContext(InstagramContext);

  const onHandleSelect = (idx: number) => {
    const post = posts!.items[idx];
    const formattedSlides: LightboxSlide[] = post.media.map((media) => ({
      type: media.type,
      autoPlay: media.type === 'video',
      src: media.url,
      sources: [{ src: media.url, type: 'video/mp4' }],
    }));
    setPostData({
      createdAt: post.created_at,
      likeCount: post.like_count,
      commentCount: post.comment_count,
      caption: post.caption,
    });
    setSlides(formattedSlides);
    setShowMediaPlayer(true);
  };

  return (
    <div className="flex flex-wrap justify-evenly gap-4">
      {showMediaPlayer && (
        <MediaPlayer
          onShowMediaPlayer={setShowMediaPlayer}
          selectedIndex={0}
          slides={slides}
          sidePanelData={postData}
        />
      )}
      {posts &&
        posts.items.slice(0, 9).map((post, i) => (
          <div
            key={i}
            className="relative h-[420px] w-full bg-opacity-25 lg:w-[32%]"
          >
            {post.type === 'image' ? (
              <Image
                key={i}
                src={post.thumbnail}
                alt={`${igProfile!.username} post #${i + 1}`}
                height={640}
                width={360}
                className="h-full max-h-[420px] w-full rounded-xl object-cover object-center"
                onClick={() => onHandleSelect(i)}
              />
            ) : post.type === 'video' ? (
              <>
                <Image
                  key={i}
                  src={post.thumbnail}
                  alt={`${igProfile!.username} post #${i + 1}`}
                  height={640}
                  width={360}
                  className="h-full max-h-[420px] w-full rounded-xl object-cover object-center"
                  onClick={() => onHandleSelect(i)}
                />
                <FaVideo
                  size={32}
                  className="absolute right-4 top-2 text-white opacity-90 drop-shadow-md"
                />
              </>
            ) : (
              <>
                <Image
                  key={i}
                  src={post.thumbnail}
                  alt={`${igProfile!.username} post #${i + 1}`}
                  height={1080}
                  width={1920}
                  className="h-full max-h-[420px] w-full rounded-xl object-cover object-center"
                  onClick={() => onHandleSelect(i)}
                />
                <BiSolidCarousel
                  fill="white"
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

const Highlights: React.FC = () => {
  const { igProfile, highlights } = useContext(InstagramContext);

  console.log(highlights);

  return (
    <div className="overflow-x-autp flex flex-wrap justify-evenly gap-4 py-8">
      {highlights?.map((highlight, i) => (
        <div key={i} className="relative h-[150px] w-[150px] bg-opacity-25">
          <Image
            key={i}
            src={highlight.imageUrl}
            alt={`${igProfile!.username} highlight #${i + 1}`}
            height={150}
            width={150}
            className="h-full max-h-[150px] w-full rounded-full object-cover object-center"
            // onClick={() => onHandleSelect(i)}
          />
          <div className="mt-2 text-center text-xs font-semibold">
            <p>{highlight.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const Reels: React.FC = () => {
  return <div></div>;
};

const NoContent: React.FC<NoContentProps> = ({ message }) => {
  return <div>{message}</div>;
};

export default ContentDisplay;
