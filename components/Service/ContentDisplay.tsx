'use client';

import React, { useContext, useState } from 'react';
import { InstagramContext } from '../Context/InstagramProvider';
import Image from 'next/image';
import MediaPlayer from './MediaPlayer';
import { FaClone, FaComment, FaHeart, FaPlay, FaVideo } from 'react-icons/fa6';
import { TbBoxMultiple } from 'react-icons/tb';
import { LuGalleryHorizontalEnd } from 'react-icons/lu';
import { BiSolidCarousel } from 'react-icons/bi';
import { fetchHighlightById } from '@/utils/requests';
import { formatNumber } from '@/utils/tools';

interface NoContentProps {
  message: string;
}

interface LightboxSlide {
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
  code?: string;
  download?: boolean | string | { url: string; filename?: string };
}

const ContentDisplay: React.FC = () => {
  const { mode } = useContext(InstagramContext);

  return (
    <div>
      {mode === 0 && <Stories />}
      {mode === 1 && <Posts />}
      {mode === 2 && <Highlights />}
      {mode === 3 && <Reels />}
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

  console.log(slides);

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
          ))
        : igProfile && (
            <NoContent
              message={`${igProfile.username} has no active stories`}
            />
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
  const { igProfile, posts } = useContext(InstagramContext);

  if (!posts) {
    return <LoadingContent />;
  }

  const onHandleSelect = (idx: number) => {
    const post = posts.items[idx];
    const formattedSlides: LightboxSlide[] = post.media.map((media) => ({
      id: media.id,
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
      {posts.items[0]
        ? posts.items.slice(0, 6).map((post, i) => (
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
                  className="h-full max-h-[420px] w-full cursor-pointer rounded-xl object-cover object-center"
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
                    className="h-full max-h-[420px] w-full cursor-pointer rounded-xl object-cover object-center"
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
                    className="h-full max-h-[420px] w-full cursor-pointer rounded-xl object-cover object-center"
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
          ))
        : igProfile && (
            <NoContent message={`${igProfile.username} has no posts`} />
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
  const { igProfile, reels } = useContext(InstagramContext);

  if (!reels) {
    return <LoadingContent />;
  }

  const handleSelect = async (idx: number) => {
    setSelection(idx);

    const formattedSlides: LightboxSlide[] = reels.items.map((reel) => ({
      id: reel.id,
      download: false,
      code: reel.shortcode,
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
        ? reels.items.slice(0, 12).map((reel, i) => (
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
  const { reelCount, thumbnail, playCount, commentCount, likeCount } = reelData;

  return (
    <div
      key={index}
      className={`${reelCount > 2 ? 'lg:w-[300px]' : reelCount === 2 ? 'lg:w-[300px]' : ''} relative h-auto w-full cursor-pointer object-cover object-center`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onHandleSelect(index)}
    >
      <Image
        src={thumbnail}
        alt={`${username} reel #${index + 1}`}
        height={640}
        width={360}
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
