'use client';

import React, { useContext, useEffect, useState } from 'react';
import Profile from '../Profile/Profile';
import { InstagramContext } from '../Context/InstagramProvider';
import ContentDisplay from './ContentDisplay';
import ServiceSelector from './ServiceSelector';
import { fetchProfile, fetchStories } from '@/utils/requests';
import { postcss } from 'tailwindcss';

interface Props {
  username: string;
  serviceButtonsText: string[];
}

const Service: React.FC<Props> = ({ username, serviceButtonsText }) => {
  const {
    setIgProfile,
    setStories,
    setPosts,
    setHighlights,
    setReels,
    stories,
    posts,
    highlights,
    reels,
    mode,
  } = useContext(InstagramContext);

  useEffect(() => {
    (async () => {
      const profile = await fetchProfile(username);
      setIgProfile(profile);
    })();
  }, [username, setIgProfile]);

  useEffect(() => {
    (async () => {
      let contentEndpoint = '/api/stories';
      let setFunction = setStories;

      if (mode === 0 && stories.length > 0) return;

      if (mode === 1) {
        if (posts.length > 0) return;

        contentEndpoint = '/api/posts';
        setFunction = setPosts;
      }

      if (mode === 2) {
        if (highlights.length > 0) return;

        contentEndpoint = '/api/highlights';
        setFunction = setHighlights;
      }

      if (mode === 3) {
        if (reels.length > 0) return;
        contentEndpoint = '/api/reels';
        setFunction = setReels;
      }

      const contentRes = await fetchStories(username);

      if (contentRes) {
        setFunction(contentRes);
      }
    })();
  }, [
    username,
    mode,
    stories,
    posts,
    highlights,
    reels,
    setHighlights,
    setStories,
    setPosts,
    setReels,
  ]);

  return (
    <div className="mt-20 flex w-full flex-col items-center gap-20">
      <Profile />
      <ServiceSelector displayNames={serviceButtonsText} />
      <ContentDisplay />
    </div>
  );
};

export default Service;
