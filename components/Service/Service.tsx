'use client';

import React, { useContext, useEffect, useState } from 'react';
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
} from '@/lib/requests';
import { useParams } from 'next/navigation';

enum Errors {
  INVALID_USERNAME,
}

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
    igProfile,
    stories,
    posts,
    highlights,
    reels,
    mode,
    pagination,
  } = useContext(InstagramContext);
  const [error, setError] = useState<Errors | null>(null);

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
        if (
          profile.status === 'error' &&
          profile.message === 'INVALID_USERNAME'
        ) {
          setError(Errors.INVALID_USERNAME);
        } else if (profile && profile.id) {
          setError(null);
          setIgProfile(profile);
        }
      }

      if (!igProfile) return;

      if (mode === 0 && stories) {
        return;
      }

      if (mode === 1) {
        if (posts && igProfile.username === username) {
          return;
        }

        setFunction = setPosts;
        fetchFunction = fetchPosts.bind(this, igProfile.id);
      }

      if (mode === 2) {
        if (highlights) {
          return;
        }

        setFunction = setHighlights;
        fetchFunction = fetchHighlights.bind(this, username);
      }

      if (mode === 3) {
        if (reels) {
          return;
        }

        setFunction = setReels;
        fetchFunction = fetchReels.bind(this, igProfile.id);
      }

      const contentRes = await fetchFunction();

      if (contentRes && !contentRes.error) {
        setFunction(contentRes);
      } else if (contentRes.error === 'RATE_LIMITED') {
        console.log(contentRes.error);
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
      {error !== null ? (
        <Error type={error} />
      ) : (
        <>
          <Profile />
          <ServiceSelector displayNames={serviceButtonsText} />
          <ContentDisplay />
        </>
      )}
    </div>
  );
};

interface ErrorProps {
  type: Errors;
}

const Error: React.FC<ErrorProps> = ({ type }) => {
  const { username } = useParams();

  return (
    <div role="alert" className="alert alert-error !w-fit">
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
      {type === Errors.INVALID_USERNAME ? (
        <span>{`@${username} was not found. Check the spelling or refresh the page!`}</span>
      ) : null}
    </div>
  );
};

export default Service;
