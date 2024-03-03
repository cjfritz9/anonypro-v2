'use client';

import React, { useContext, useEffect } from 'react';
import Profile from '../Profile/Profile';
import { InstagramContext } from '../Context/InstagramProvider';
import ContentDisplay from './ContentDisplay';
import ServiceSelector from './ServiceSelector';
import { fetchPosts, fetchProfile, fetchStories } from '@/utils/requests';

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
    igProfile,
    stories,
    posts,
    highlights,
    reels,
    mode,
  } = useContext(InstagramContext);

  useEffect(() => {
    console.log('use effect');
    (async () => {
      let contentEndpoint = '/api/stories';
      let setFunction: any = setStories;
      let fetchFunction: any = fetchStories.bind(this, username);

      if (!igProfile) {
        const profile = await fetchProfile(username);

        setIgProfile(profile);

        return;
      }

      if (mode === 0 && stories.length > 0) return;

      if (mode === 1) {
        if (posts) return;

        contentEndpoint = '/api/posts';
        setFunction = setPosts;
        fetchFunction = fetchPosts.bind(this, igProfile.id);
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

      const contentRes = await fetchFunction();

      console.log(contentRes)

      if (contentRes && !contentRes.error) {
        setFunction(contentRes);
      }
    })();
  }, [
    username,
    igProfile,
    mode,
    stories,
    posts,
    highlights,
    reels,
    setIgProfile,
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
