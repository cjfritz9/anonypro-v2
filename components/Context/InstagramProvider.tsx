'use client';

import React, { useEffect, useState } from 'react';

interface Context {
  igProfile: {
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
    mediaUrl: string;
  }[];
  setStories: React.Dispatch<React.SetStateAction<Context['stories']>>;
  posts: { type: 'image' | 'video'; mediaUrl: string }[];
  setPosts: React.Dispatch<React.SetStateAction<Context['posts']>>;
  highlights: { type: 'image' | 'video'; mediaUrl: string }[];
  setHighlights: React.Dispatch<React.SetStateAction<Context['highlights']>>;
}

const baseContext: Context = {
  igProfile: null,
  setIgProfile: (profile) => undefined,
  stories: [{ type: 'image', mediaUrl: '' }],
  setStories: (stories) => undefined,
  posts: [{ type: 'image', mediaUrl: '' }],
  setPosts: (posts) => undefined,
  highlights: [{ type: 'image', mediaUrl: '' }],
  setHighlights: (highlights) => undefined
};

export const InstagramContext = React.createContext<Context>(baseContext);

const InstagramProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [igProfile, setIgProfile] = useState(baseContext.igProfile);
  const [stories, setStories] = useState(baseContext.stories);
  const [posts, setPosts] = useState(baseContext.posts);
  const [highlights, setHighlights] = useState(baseContext.highlights);

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
        setHighlights
      }}
    >
      {children}
    </InstagramContext.Provider>
  );
};

export default InstagramProvider;