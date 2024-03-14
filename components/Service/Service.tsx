'use client';

import React, { useContext, useEffect } from 'react';
import Profile from '../Profile/Profile';
import { InstagramContext } from '../Context/InstagramProvider';
import ContentDisplay from './ContentDisplay';
import ServiceSelector from './ServiceSelector';
import {
  fetchHighlights,
  fetchPosts,
  fetchProfile,
  fetchReels,
  fetchStories,
} from '@/utils/requests';

interface Props {
  username: string;
  serviceButtonsText: string[];
}

const Service: React.FC<Props> = ({ username, serviceButtonsText }) => {
  const {
    resetUser,
    setIgProfile,
    setStories,
    setPosts,
    setHighlights,
    setReels,
    setPagination,
    igProfile,
    stories,
    posts,
    highlights,
    reels,
    mode,
    pagination,
  } = useContext(InstagramContext);

  username = username.replaceAll('%2C', '.');

  useEffect(() => {
    if (pagination.isLoading) return;
    (async () => {
      let setFunction: any = setStories;
      let fetchFunction: any = fetchStories.bind(this, username);

      if (!igProfile || igProfile.username !== username) {
        if (igProfile && igProfile.username !== username) {
          resetUser();
        }
        const profile = await fetchProfile(username);

        setIgProfile(profile);

        return;
      }

      if (mode === 0 && stories) return;

      if (mode === 1) {
        if (posts && igProfile.username === username) return;

        setFunction = setPosts;
        fetchFunction = fetchPosts.bind(this, igProfile.id);
      }

      if (mode === 2) {
        if (highlights) return;

        setFunction = setHighlights;
        fetchFunction = fetchHighlights.bind(this, username);
      }

      if (mode === 3) {
        if (reels) return;

        setFunction = setReels;
        fetchFunction = fetchReels.bind(this, igProfile.id);
      }

      const contentRes = await fetchFunction();

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
    pagination,
    setIgProfile,
    setHighlights,
    setStories,
    setPosts,
    setReels,
    resetUser,
  ]);

  return (
    <div className="flex w-full flex-col items-center gap-20">
      <Profile />
      <ServiceSelector displayNames={serviceButtonsText} />
      <ContentDisplay />
    </div>
  );
};

export default Service;
