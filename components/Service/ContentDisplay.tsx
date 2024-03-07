'use client';

import React, { useContext, useState } from 'react';
import { InstagramContext } from '../Context/InstagramProvider';
import Image from 'next/image';
import MediaPlayer from './MediaPlayer';
import { FaClone, FaPlay, FaVideo } from 'react-icons/fa6';
import { TbBoxMultiple } from 'react-icons/tb';
import { LuGalleryHorizontalEnd } from 'react-icons/lu';
import { BiSolidCarousel } from 'react-icons/bi';
import { fetchHighlightById } from '@/utils/requests';
import { formatNumber } from '@/utils/tools';

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
        reels && reels.items.length > 0 ? (
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
        posts.items.slice(0, 6).map((post, i) => (
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
        ))}
    </div>
  );
};

const Highlights: React.FC = () => {
  const [showMediaPlayer, setShowMediaPlayer] = useState(false);
  const { igProfile, highlights } = useContext(InstagramContext);
  const [slides, setSlides] = useState<LightboxSlide[]>([]);

  const handleSelect = async (id: string) => {
    const highlight = await fetchHighlightById(id);

    if (highlight) {
      const slidesFromHighlight: LightboxSlide[] = highlight.items.map(
        (item) => ({
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
      {highlights?.map((highlight, i) => (
        <div
          key={i}
          className="relative h-[150px] w-[150px] cursor-pointer bg-opacity-25"
        >
          <Image
            key={i}
            src={highlight.imageUrl}
            alt={`${igProfile!.username} highlight #${i + 1}`}
            height={150}
            width={150}
            className=" h-full max-h-[150px] w-full rounded-full object-cover object-center"
            onClick={() => handleSelect(highlight.id)}
          />
          <div className="mt-2 text-center text-sm font-semibold">
            <p>{highlight.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const Reels: React.FC = () => {
  const [showMediaPlayer, setShowMediaPlayer] = useState(false);
  const [selection, setSelection] = useState(0);
  const [slides, setSlides] = useState<LightboxSlide[]>([]);
  const { igProfile, reels } = useContext(InstagramContext);

  if (!reels) return;

  const multiSlideData = reels.items.map((reel) => ({
    createdAt: reel.created_at,
    caption: reel.caption,
    likeCount: reel.like_count,
    commentCount: reel.comment_count,
  }));

  const handleSelect = async (idx: number) => {
    setSelection(idx);

    const formattedSlides: LightboxSlide[] = reels.items.map((reel) => ({
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
      {reels.items.slice(0, 12).map((reel, i) => (
        <div
          key={i}
          className={`${reels.items.length > 2 ? 'lg:w-[23%]' : reels.items.length === 2 ? 'lg:w-[48%]' : ''} relative h-auto w-full object-cover object-center duration-150 hover:-translate-y-2`}
        >
          <Image
            src={reel.thumbnail}
            alt={`${igProfile!.username} reel #${i + 1}`}
            height={640}
            width={360}
            className="h-auto w-full cursor-pointer rounded-xl"
            onClick={() => handleSelect(i)}
          />
          <div className="backdrop absolute bottom-4 left-4 flex items-center gap-2 drop-shadow-lg">
            <FaPlay size={30} />
            <p className="font-semibold">{formatNumber(reel.play_count)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const NoContent: React.FC<NoContentProps> = ({ message }) => {
  return <div>{message}</div>;
};

export default ContentDisplay;
