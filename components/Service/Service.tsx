'use client';
import React, { useState } from 'react';
import Profile from '../Profile/Profile';
import ContentDisplay from './ContentDisplay';
import ServiceSelector from './ServiceSelector';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export enum Errors {
  INVALID_USERNAME,
}

interface Props {
  username: string;
  serviceButtonsText: string[];
  enabledServices: {
    stories: boolean;
    posts: boolean;
    highlights: boolean;
    reels: boolean;
  };
}

const Service: React.FC<Props> = ({ username, serviceButtonsText, enabledServices }) => {
  const [error, setError] = useState<Errors | null>(null);
  username = username.replaceAll('%2C', '.');

  return (
    <div className="flex w-full flex-col items-center gap-20">
      {error !== null ? (
        <Error type={error} />
      ) : (
        <>
          <Profile onError={setError} />
          <ServiceSelector displayNames={serviceButtonsText} />
          <ContentDisplay enabledServices={enabledServices} />
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
    <div className="flex flex-col items-center">
      <div role="alert" className="alert alert-error mb-4 !w-fit">
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
          <span>
            <p>
              {`@${username} was not found. Check the spelling or refresh the page!`}
            </p>
          </span>
        ) : null}
      </div>
      <Link href="/" className="btn btn-success w-full rounded-md sm:w-fit">
        Go Home
      </Link>
    </div>
  );
};

export default Service;
