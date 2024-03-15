'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { InstagramContext } from '../Context/InstagramProvider';
import Image from 'next/image';
import MediaPlayer, { LightboxSlide } from './MediaPlayer';
import { FaComment, FaHeart, FaPlay, FaVideo } from 'react-icons/fa6';
import { BiSolidCarousel, BiSolidErrorCircle } from 'react-icons/bi';
import {
  fetchHighlightById,
  getBoostViews,
  postRecaptchaToken,
} from '@/utils/requests';
import { formatNumber, isBoostLimited } from '@/utils/tools';
import { BsLightningFill } from 'react-icons/bs';
import { IoCheckmarkCircle } from 'react-icons/io5';
import Pagination from './Pagination';
import useWindowSize from '@/utils/hooks/useWindowSize';
import { useReCaptcha } from 'next-recaptcha-v3';

interface NoContentProps {
  message: string;
}

const ContentDisplay: React.FC = () => {
  const { igProfile, mode } = useContext(InstagramContext);

  if (!igProfile) return;

  return (
    <div>
      {igProfile.isPrivate ? (
        <PrivateProfile />
      ) : mode === 0 ? (
        <Stories />
      ) : mode === 1 ? (
        <Posts />
      ) : mode === 2 ? (
        <Highlights />
      ) : (
        <Reels />
      )}
    </div>
  );
};

const PrivateProfile: React.FC = () => {
  const { igProfile } = useContext(InstagramContext);

  if (!igProfile) return;

  return (
    <div role="alert" className="alert alert-error">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="font-semibold">{`@${igProfile.username}'s profile is private.`}</span>
    </div>
  );
};

const Stories: React.FC = () => {
  const [showMediaPlayer, setShowMediaPlayer] = useState(false);
  const [selection, setSelection] = useState(0);
  const { igProfile, stories } = useContext(InstagramContext);

  if (!stories) {
    return <LoadingContent />;
  }

  const onHandleSelect = (idx: number) => {
    setSelection(idx);
    setShowMediaPlayer(true);
  };

  const slides: LightboxSlide[] = stories.map((story) => ({
    id: story.id,
    type: story.type,
    src: story.thumbnailUrl,
    autoPlay: true,
    sources: [
      {
        src: story.mediaUrl,
        type: 'video/mp4',
      },
    ],
    download: {
      url: `/api/download/proxy?origin=${story.mediaUrl ?? story.thumbnailUrl}`,
      filename: story.id,
    },
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
      {stories[0]
        ? stories.map((story, i) => (
            <Story
              onHandleSelect={onHandleSelect}
              storiesCount={stories.length}
              username={igProfile!.username}
              story={story}
              key={i}
              index={i}
            />
          ))
        : igProfile && (
            <NoContent
              message={`${igProfile.username} has no active stories`}
            />
          )}
    </div>
  );
};

interface StoryProps {
  onHandleSelect: (i: number) => void;
  storiesCount: number;
  index: number;
  username: string;
  story: {
    thumbnailUrl: string;
    type: 'image' | 'video';
  };
}

const Story: React.FC<StoryProps> = ({
  onHandleSelect,
  storiesCount,
  username,
  index,
  story,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [boostStatus, setBoostStatus] = useState<'success' | 'error' | null>(
    null
  );
  const [boostLimited, setBoostLimited] = useState({
    isLimited: false,
    remainder: 0,
  });
  const windowSize = useWindowSize();
  const { executeRecaptcha } = useReCaptcha();

  const resetStatus = () => {
    setTimeout(() => {
      setBoostStatus(null);
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
    const token = await executeRecaptcha('story_boost');
    const captchaResponse = await postRecaptchaToken(token);

    if (
      !captchaResponse ||
      !captchaResponse.success ||
      captchaResponse.score < 0.7
    ) {
      const response = await getBoostViews(username);
      setIsLoading(false);
      if (response && response.status === 'ok') {
        setBoostStatus('success');
      } else {
        setBoostStatus('error');
      }
    } else {
      setIsLoading(false);
      setBoostStatus('error');
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
    <div
      className={`${isImageLoading ? 'animate-pulse bg-slate-700 opacity-75' : 'animate-none'} relative h-[654px] w-[368px] rounded-xl object-cover object-center duration-150 hover:-translate-y-2`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={story.thumbnailUrl}
        alt={`${username} story #${index + 1}`}
        height={640}
        width={360}
        className="h-[654px] w-[368px] cursor-pointer rounded-xl"
        onClick={() => onHandleSelect(index)}
        onLoad={() => setIsImageLoading(false)}
      />
      {story.type === 'video' && (
        <FaPlay
          size={36}
          className="absolute right-[44%] top-[50%] drop-shadow-lg"
        />
      )}
      {(isHovered || (windowSize.width && windowSize.width < 1424)) && (
        <button
          className={`${boostLimited.isLimited ? 'pointer-events-none' : ''} btn btn-success absolute right-4 top-4 flex items-center rounded-lg`}
          onClick={handleBoost}
        >
          {isLoading ? (
            <span className="loading loading-spinner" />
          ) : boostLimited.isLimited ? (
            <p>
              {Math.floor(boostLimited.remainder / 3600)}:
              {Math.floor((boostLimited.remainder % 3600) / 60)}:
              {Math.floor(boostLimited.remainder % 60)}
            </p>
          ) : boostStatus === 'error' ? (
            <BiSolidErrorCircle size={20} className="text-error" />
          ) : boostStatus === 'success' ? (
            <IoCheckmarkCircle size={20} />
          ) : (
            <>
              <BsLightningFill size={20} className="" />
              <p>Boost Viewers</p>
            </>
          )}
        </button>
      )}
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
  const {
    igProfile,
    posts,
    pagination: { page },
  } = useContext(InstagramContext);

  if (!posts) {
    return <LoadingContent />;
  }

  const onHandleSelect = (idx: number) => {
    const post = posts.items[idx];
    const formattedSlides: LightboxSlide[] = post.media.map((media) => ({
      id: media.id,
      shortcode: post.shortcode,
      type: media.type,
      autoPlay: media.type === 'video',
      src: media.url,
      sources: [{ src: media.url, type: 'video/mp4' }],
      download: false,
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
      {posts.items && posts.items[0]
        ? posts.items
            .slice((page - 1) * 6, page * 6)
            .map((post, i) => (
              <Post
                key={i}
                index={i}
                onHandleSelect={onHandleSelect}
                post={post}
              />
            ))
        : igProfile && (
            <NoContent message={`${igProfile.username} has no posts`} />
          )}
      <Pagination />
    </div>
  );
};

interface PostProps {
  onHandleSelect: (i: number) => void;
  index: number;
  post: {
    thumbnail: string;
    type: 'image' | 'video' | 'album';
  };
}

const Post: React.FC<PostProps> = ({ onHandleSelect, index: i, post }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const { igProfile } = useContext(InstagramContext);

  return (
    <div className="relative h-[420px] w-full bg-opacity-25 lg:w-[32%]">
      {post.type === 'image' ? (
        <Image
          key={i}
          src={post.thumbnail}
          alt={`${igProfile!.username} post #${i + 1}`}
          height={640}
          width={360}
          className={`${isImageLoading ? 'animate-pulse bg-slate-700 opacity-75' : 'animate-none'} h-full max-h-[420px] w-full cursor-pointer rounded-xl object-cover object-center`}
          onClick={() => onHandleSelect(i)}
          onLoad={() => setIsImageLoading(false)}
        />
      ) : post.type === 'video' ? (
        <>
          <Image
            key={i}
            src={post.thumbnail}
            alt={`${igProfile!.username} post #${i + 1}`}
            height={640}
            width={360}
            className={`${isImageLoading ? 'animate-pulse opacity-75' : 'animate-none'} h-full max-h-[420px] w-full cursor-pointer rounded-xl bg-slate-700 object-cover object-center`}
            onClick={() => onHandleSelect(i)}
            onLoad={() => setIsImageLoading(false)}
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
            className={`${isImageLoading ? 'animate-pulse opacity-75' : 'animate-none'} h-full max-h-[420px] w-full cursor-pointer rounded-xl bg-slate-700 object-cover object-center`}
            onClick={() => onHandleSelect(i)}
            onLoad={() => setIsImageLoading(false)}
          />
          <BiSolidCarousel
            fill="white"
            size={32}
            className="absolute right-4 top-2 text-white opacity-90 drop-shadow-md"
          />
        </>
      )}
    </div>
  );
};

const Highlights: React.FC = () => {
  const [showMediaPlayer, setShowMediaPlayer] = useState(false);
  const { igProfile, highlights } = useContext(InstagramContext);
  const [slides, setSlides] = useState<LightboxSlide[]>([]);

  if (!highlights) {
    return <LoadingContent />;
  }

  const handleSelect = async (id: string) => {
    const highlight = await fetchHighlightById(id);

    if (highlight) {
      const slidesFromHighlight: LightboxSlide[] = highlight.items.map(
        (item) => ({
          id: item.id,
          type: item.type,
          src: item.imageUrl,
          sources: item.videoUrl
            ? [
                {
                  src: item.videoUrl,
                  type: 'video/mp4',
                },
              ]
            : undefined,
          autoPlay: true,
          download: {
            url: `/api/download/proxy?origin=${item.videoUrl ?? item.imageUrl}`,
            filename: item.id,
          },
        })
      );
      setSlides(slidesFromHighlight);
      setShowMediaPlayer(true);
    }
  };

  return (
    <div className="flex flex-wrap justify-evenly gap-4 py-8">
      {showMediaPlayer && (
        <MediaPlayer
          onShowMediaPlayer={setShowMediaPlayer}
          selectedIndex={0}
          slides={slides}
        />
      )}
      {highlights.length > 0
        ? highlights.map((highlight, i) => (
            <div key={i}>
              <div className="relative h-[150px] w-[150px] cursor-pointer bg-opacity-25">
                <Image
                  key={i}
                  src={highlight.imageUrl}
                  alt={`${igProfile!.username} highlight #${i + 1}`}
                  height={150}
                  width={150}
                  className=" h-full max-h-[150px] w-full rounded-full object-cover object-center"
                  onClick={() => handleSelect(highlight.id)}
                />
              </div>
              <div className="mt-2 text-center text-sm font-semibold">
                <p>{highlight.title}</p>
              </div>
            </div>
          ))
        : igProfile && (
            <NoContent message={`${igProfile.username} has no highlights`} />
          )}
    </div>
  );
};

const Reels: React.FC = () => {
  const [showMediaPlayer, setShowMediaPlayer] = useState(false);
  const [selection, setSelection] = useState(0);
  const [slides, setSlides] = useState<LightboxSlide[]>([]);
  const {
    igProfile,
    reels,
    pagination: { page },
  } = useContext(InstagramContext);

  if (!reels) {
    return <LoadingContent />;
  }

  const handleSelect = async (idx: number) => {
    setSelection(idx);

    const formattedSlides: LightboxSlide[] = reels.items.map((reel) => ({
      id: reel.id,
      download: false,
      shortcode: reel.shortcode,
      type: reel.type,
      src: reel.thumbnail,
      autoPlay: true,
      sources: [
        {
          src: reel.mediaUrl,
          type: 'video/mp4',
        },
      ],
    }));
    setSlides(formattedSlides);
    setShowMediaPlayer(true);
  };

  const multiSlideData = reels.items.map((reel) => ({
    createdAt: reel.created_at,
    caption: reel.caption,
    likeCount: reel.like_count,
    commentCount: reel.comment_count,
  }));

  return (
    <div className="flex flex-wrap justify-evenly gap-4">
      {showMediaPlayer && (
        <MediaPlayer
          onShowMediaPlayer={setShowMediaPlayer}
          selectedIndex={selection}
          slides={slides}
          multiSidePanelData={multiSlideData}
        />
      )}
      {reels.items[0]
        ? reels.items.slice((page - 1) * 12, page * 12).map((reel, i) => (
            <Reel
              key={i}
              reelData={{
                reelCount: reels.items.length,
                thumbnail: reel.thumbnail,
                playCount: reel.play_count,
                commentCount: reel.comment_count,
                likeCount: reel.like_count,
              }}
              onHandleSelect={handleSelect}
              username={igProfile!.username}
              index={i}
            />
          ))
        : igProfile && (
            <NoContent message={`${igProfile.username} has no reels`} />
          )}
      <Pagination />
    </div>
  );
};

interface ReelProps {
  reelData: {
    reelCount: number;
    thumbnail: string;
    playCount: number;
    commentCount: number;
    likeCount: number;
  };
  username: string;
  index: number;
  onHandleSelect: (i: number) => void;
}

const Reel: React.FC<ReelProps> = ({
  reelData,
  username,
  index,
  onHandleSelect,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const { reelCount, thumbnail, playCount, commentCount, likeCount } = reelData;

  return (
    <div
      key={index}
      className={`${isImageLoading ? 'animate-pulse bg-slate-700 opacity-75' : 'animate-none'} relative h-[534px] w-full cursor-pointer object-cover object-center lg:w-[300px]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onHandleSelect(index)}
    >
      <Image
        src={thumbnail}
        alt={`${username} reel #${index + 1}`}
        height={640}
        width={360}
        onLoad={() => setIsImageLoading(false)}
        className="h-full w-full cursor-pointer rounded-xl object-cover object-center"
      />
      <div
        className={`${isHovered ? 'items-center justify-center bg-gray-950' : 'items-end bg-gradient-to-t from-gray-950 to-transparent to-35%'} absolute top-0 flex h-full w-full rounded-xl bg-opacity-50 p-4 duration-200`}
      >
        {isHovered ? (
          <div className="flex w-full items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <FaHeart size={30} />
              <p className="font-semibold">{formatNumber(likeCount)}</p>
            </div>
            <div className="flex items-center gap-2">
              <FaComment size={30} />
              <p className="font-semibold">{formatNumber(commentCount)}</p>
            </div>
          </div>
        ) : (
          playCount && (
            <div className="flex items-center gap-2">
              <FaPlay size={30} />
              <p className="font-semibold">{formatNumber(playCount)}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const LoadingContent: React.FC = () => {
  return <span className="loading loading-bars w-40 text-accent"></span>;
};

const NoContent: React.FC<NoContentProps> = ({ message }) => {
  return <div>{message}</div>;
};

export default ContentDisplay;
