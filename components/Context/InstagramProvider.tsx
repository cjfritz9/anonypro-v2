'use client';

import React, { useState } from 'react';

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
  stories:
    | {
        id: string;
        type: 'image' | 'video';
        thumbnailUrl: string;
        mediaUrl: string;
      }[]
    | null;
  setStories: React.Dispatch<React.SetStateAction<Context['stories']>>;
  posts: {
    more_available: boolean;
    num_results: number;
    next_max_id: string;
    items: {
      shortcode: string;
      thumbnail: string;
      created_at: number;
      like_count: number;
      comment_count: number;
      type: 'image' | 'video' | 'album';
      media: {
        id: string;
        type: 'image' | 'video';
        height: number;
        width: number;
        url: string;
      }[];
      caption: string;
    }[];
  } | null;
  setPosts: React.Dispatch<React.SetStateAction<Context['posts']>>;
  highlights: { id: string; title: string; imageUrl: string }[] | null;
  setHighlights: React.Dispatch<React.SetStateAction<Context['highlights']>>;
  reels: {
    more_available: boolean;
    next_max_id: 'string' | null;
    items: {
      id: string;
      created_at: number;
      like_count: number;
      comment_count: number;
      play_count: number;
      type: 'image' | 'video';
      thumbnail: string;
      mediaUrl: string;
      caption: string;
      shortcode: string;
    }[];
  } | null;
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
  pagination: {
    page: number;
    isLoading: boolean;
  };
  setPagination: React.Dispatch<React.SetStateAction<Context['pagination']>>;
  resetUser: () => void;
}

const baseContext: Context = {
  igProfile: null,
  setIgProfile: (profile) => undefined,
  stories: null,
  setStories: (stories) => undefined,
  posts: null,
  setPosts: (posts) => undefined,
  highlights: null,
  setHighlights: (highlights) => undefined,
  reels: null,
  setReels: (reels) => undefined,
  mode: 0,
  setMode: (mode) => undefined,
  pagination: {
    page: 1,
    isLoading: false,
  },
  setPagination: (pagination) => undefined,
  resetUser: () => undefined,
};

export const InstagramContext = React.createContext<Context>(baseContext);

const InstagramProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [igProfile, setIgProfile] = useState(baseContext.igProfile);
  const [stories, setStories] = useState(baseContext.stories);
  const [posts, setPosts] = useState(baseContext.posts);
  const [highlights, setHighlights] = useState(baseContext.highlights);
  const [reels, setReels] = useState(baseContext.reels);
  const [mode, setMode] = useState(baseContext.mode);
  const [pagination, setPagination] = useState(baseContext.pagination);

  const resetUser = () => {
    setIgProfile(null);
    setStories(null);
    setPosts(null);
    setHighlights(null);
    setReels(null);
    setPagination(baseContext.pagination);
  };

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
        pagination,
        setPagination,
        resetUser,
      }}
    >
      {children}
    </InstagramContext.Provider>
  );
};

export default InstagramProvider;
