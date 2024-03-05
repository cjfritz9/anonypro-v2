'use client';

import React, { useEffect, useState } from 'react';

interface Context {
  igProfile: {
    id: string;
    displayName: string;
    username: string;
    profilePictureUrl: string;
    isVerified: boolean;
    postCount: number;
    followerCount: number;
    followingCount: number;
    biography: string;
    externalLink: string;
  } | null;
  setIgProfile: React.Dispatch<React.SetStateAction<Context['igProfile']>>;
  stories: {
    type: 'image' | 'video';
    thumbnailUrl: string;
    mediaUrl: string;
  }[];
  setStories: React.Dispatch<React.SetStateAction<Context['stories']>>;
  posts: {
    more_available: boolean;
    num_results: number;
    next_max_id: string;
    items: {
      id: string;
      shortcode: string;
      thumbnail: string;
      created_at: number;
      like_count: number;
      comment_count: number;
      type: 'image' | 'video' | 'album';
      media: {
        type: 'image' | 'video';
        height: number;
        width: number;
        url: string;
      }[];
      caption: string;
    }[];
  } | null;
  setPosts: React.Dispatch<React.SetStateAction<Context['posts']>>;
  highlights: { type: 'image' | 'video'; mediaUrl: string }[];
  setHighlights: React.Dispatch<React.SetStateAction<Context['highlights']>>;
  reels: { type: 'image' | 'video'; mediaUrl: string }[];
  setReels: React.Dispatch<React.SetStateAction<Context['reels']>>;
  /**
   * 0: Stories
   *
   * 1: Posts
   *
   * 2: Highlights
   *
   * 3: Reels
   */
  mode: number;
  setMode: React.Dispatch<React.SetStateAction<Context['mode']>>;
}

const baseContext: Context = {
  igProfile: null,
  setIgProfile: (profile) => undefined,
  stories: [],
  setStories: (stories) => undefined,
  posts: null,
  setPosts: (posts) => undefined,
  highlights: [],
  setHighlights: (highlights) => undefined,
  reels: [],
  setReels: (reels) => undefined,
  mode: 0,
  setMode: (mode) => undefined,
};

export const InstagramContext = React.createContext<Context>(baseContext);

const InstagramProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [igProfile, setIgProfile] = useState(baseContext.igProfile);
  const [stories, setStories] = useState(baseContext.stories);
  const [posts, setPosts] = useState(baseContext.posts);
  const [highlights, setHighlights] = useState(baseContext.highlights);
  const [reels, setReels] = useState(baseContext.reels);
  const [mode, setMode] = useState(baseContext.mode);

  return (
    <InstagramContext.Provider
      value={{
        igProfile,
        setIgProfile,
        stories,
        setStories,
        posts,
        setPosts,
        highlights,
        setHighlights,
        reels,
        setReels,
        mode,
        setMode,
      }}
    >
      {children}
    </InstagramContext.Provider>
  );
};

export default InstagramProvider;
