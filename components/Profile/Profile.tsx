'use client';

import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { InstagramContext } from '../Context/InstagramProvider';
import Link from 'next/link';
import verifiedBadge from '@/public/assets/verified-badge.svg';
import {
  addToFavorites,
  formatNumber,
  getFavorites,
  removeFavorite,
} from '@/lib/tools';
import { useParams } from 'next/navigation';
import { fetchProfile } from '@/lib/requests';
import { Errors } from '../Service/Service';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

interface Props {
  onError: (type: null | Errors) => void;
}

const Profile: React.FC<Props> = ({ onError }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const { igProfile, setIgProfile, resetUser } = useContext(InstagramContext);
  const { username }: { username: string } = useParams();

  const handleFavorite = () => {
    if (isFavorited) {
      removeFavorite(username);
      setIsFavorited(false);
    } else {
      addToFavorites(username);
      setIsFavorited(true);
    }
  };

  useEffect(() => {
    if (!username) return;
    (async () => {
      setIsLoading(true);
      if (!igProfile || igProfile.username !== username) {
        if (igProfile && igProfile.username !== username) {
          resetUser();
        }

        const profile = await fetchProfile(username);
        if (
          profile.status === 'error' &&
          profile.message === 'INVALID_USERNAME'
        ) {
          onError(Errors.INVALID_USERNAME);
        } else if (profile && profile.id) {
          onError(null);
          setIgProfile(profile);
        }
      }
      setIsLoading(false);
    })();
    if (window) {
      const favorites = getFavorites();
      if (favorites?.includes(username)) {
        setIsFavorited(true);
      }
    }
  }, [username, igProfile, resetUser, setIgProfile, onError]);

  if (isLoading) return <LoadingProfile />;
  if (!igProfile) return null;

  return (
    <div className="flex !w-full flex-col items-center justify-between gap-10 lg:max-w-[720px] lg:flex-row">
      <div className="flex w-[250px] flex-col items-center">
        <figure className="flex h-[250px] w-[250px] items-center justify-center rounded-full bg-gradient-to-b from-[#E09B3D] via-[#C21975] via-80% to-[#7024C4]">
          <Image
            priority
            src={igProfile.profilePictureUrl}
            alt={`${igProfile.username}'s Instagram picture`}
            height={360}
            width={360}
            className="h-[240px] w-[240px] rounded-full"
          />
        </figure>
        {isFavorited ? (
          <button className="btn mt-4 bg-accent" onClick={handleFavorite}>
            <MdFavorite size={20} />
            <p>Saved</p>
          </button>
        ) : (
          <button className="btn mt-4" onClick={handleFavorite}>
            <MdFavoriteBorder size={20} />
            <p>Save</p>
          </button>
        )}
      </div>
      <div className="w-fit text-center lg:min-w-[400px] lg:text-start">
        <p className="text-2xl font-[500]">{igProfile.displayName}</p>
        <div className="mt-2 flex items-center justify-center gap-2 lg:justify-start">
          <p>@{igProfile.username}</p>
          {igProfile.isVerified && (
            <Image src={verifiedBadge} alt="verified badge" />
          )}
        </div>
        <div className="mt-4 flex justify-center gap-6 lg:justify-start">
          <div className="flex flex-col items-center gap-1">
            <p className="text-xl font-semibold">
              {formatNumber(igProfile.postCount)}
            </p>
            <p>Posts</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-xl font-semibold">
              {formatNumber(igProfile.followerCount)}
            </p>
            <p>Followers</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-xl font-semibold">
              {formatNumber(igProfile.followingCount)}
            </p>
            <p>Following</p>
          </div>
        </div>
        <div className="mt-4 text-start">
          {igProfile.biography.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        {igProfile.externalLink && (
          <div className="mt-4 text-start">
            <Link
              href={igProfile.externalLink}
              target="_blank"
              className="hover:underline"
            >
              {igProfile.externalLink
                .replace('https://', '')
                .replace('http://', '')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const LoadingProfile: React.FC = () => {
  const { username }: { username: string } = useParams();

  return (
    <div className="flex !w-full animate-pulse flex-col items-center justify-between gap-10 opacity-25 lg:max-w-[720px] lg:flex-row">
      <div className="h-[250px] w-[250px]">
        <figure className="flex h-[250px] w-[250px] items-center justify-center rounded-full bg-gradient-to-b from-[#E09B3D] via-[#C21975] to-[#7024C4]">
          <div className="h-[240px] w-[240px] rounded-full" />
        </figure>
      </div>
      <div className="w-fit text-center lg:min-w-[400px] lg:text-start">
        <p className="h-8 w-[60%] rounded-md bg-white"></p>
        <div className="mt-2 flex items-center justify-center gap-2 lg:justify-start">
          {username && <p>@{username.replaceAll('%2C', '.')}</p>}
        </div>
        <div className="mt-4 flex justify-center gap-6 lg:justify-start">
          <div className="flex w-16 flex-col items-center gap-1">
            <p className="h-8 w-12 rounded-md bg-white"></p>
            <p>Posts</p>
          </div>
          <div className="flex w-20 flex-col items-center gap-1">
            <p className="h-8 w-16 rounded-md bg-white"></p>
            <p>Followers</p>
          </div>
          <div className="flex w-12 flex-col items-center gap-1">
            <p className="h-8 w-12 rounded-md bg-white"></p>
            <p>Following</p>
          </div>
        </div>
        <div className="mt-4 flex w-full flex-col gap-2 text-start">
          <p className="h-5 w-[75%] rounded-md bg-white"></p>
          <p className="h-5 w-[83%] rounded-md bg-white"></p>
          <p className="h-5 w-[69%] rounded-md bg-white"></p>
          <p className="h-5 w-[90%] rounded-md bg-white"></p>
          <p className="h-5 w-[35%] rounded-md bg-white"></p>
        </div>
        <p className="mt-4 h-5 w-[60%] rounded-md bg-white"></p>
      </div>
    </div>
  );
};

export default Profile;
