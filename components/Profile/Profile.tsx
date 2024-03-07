'use client';
import Image from 'next/image';
import React, { useContext } from 'react';
import { InstagramContext } from '../Context/InstagramProvider';
import Link from 'next/link';
import verifiedBadge from '@/public/assets/verified-badge.svg';
import { useTranslation } from 'react-i18next';
import { formatNumber } from '@/utils/tools';

const Profile: React.FC = () => {
  const { igProfile } = useContext(InstagramContext);
  const { i18n } = useTranslation();
  const locale = i18n.language;

  if (!igProfile) return null;

  return (
    <div className="flex !w-full flex-col items-center justify-between gap-10 lg:max-w-[720px] lg:flex-row">
      <div className="h-[250px] w-[250px]">
        <figure className="flex h-[250px] w-[250px] items-center justify-center rounded-full bg-gradient-to-b from-[#E09B3D] via-[#C21975] to-[#7024C4]">
          <Image
            priority
            src={igProfile.profilePictureUrl}
            alt={`${igProfile.username}'s Instagram picture`}
            height={360}
            width={360}
            className="h-[240px] w-[240px] rounded-full"
          />
        </figure>
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

export default Profile;
