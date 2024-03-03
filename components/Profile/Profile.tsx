'use client';
import Image from 'next/image';
import React, { useContext } from 'react';
import { InstagramContext } from '../Context/InstagramProvider';
import { MdVerified } from 'react-icons/md';
import Link from 'next/link';
import verifiedBadge from '@/public/assets/verified-badge.svg';

const Profile: React.FC = () => {
  const { igProfile } = useContext(InstagramContext);

  const formatNumber = (baseNumber: number) => {
    const stringNum = baseNumber.toString();

    if (stringNum.length < 4) {
      return baseNumber.toLocaleString();
    } else if (stringNum.length < 7) {
      return stringNum.slice(0, stringNum.length - 3) + 'k';
    } else if (stringNum.length < 10) {
      return (
        stringNum.slice(0, stringNum.length - 6) +
        '.' +
        stringNum.charAt(1) +
        'M'
      );
    } else if (stringNum.length < 13) {
      return (
        stringNum.slice(0, stringNum.length - 9) +
        '.' +
        stringNum.charAt(1) +
        'B'
      );
    } else {
      return (
        stringNum.slice(0, stringNum.length - 12) +
        '.' +
        stringNum.charAt(1) +
        'T'
      );
    }
  };

  if (!igProfile) return null;

  return (
    <div className="flex !w-full max-w-[720px] items-center justify-between gap-10">
      <div className="h-[246px] w-[246px]">
        <figure className="flex h-[246px] w-[246px] items-center justify-center rounded-full bg-gradient-to-b from-[#E09B3D] via-[#C21975] to-[#7024C4]">
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
      <div className="w-fit min-w-[400px]">
        <p className="text-2xl font-[500]">{igProfile.displayName}</p>
        <div className="mt-2 flex items-center gap-2">
          <p>@{igProfile.username}</p>
          {igProfile.isVerified && (
            <Image src={verifiedBadge} alt="verified badge" />
          )}
        </div>
        <div className="mt-4 flex gap-6">
          <div className="flex flex-col items-center gap-1">
            <p className="text-xl font-semibold">{igProfile.postCount}</p>
            <p>Posts</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-xl font-semibold">
              {formatNumber(igProfile.followerCount)}
            </p>
            <p>Followers</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-xl font-semibold">{igProfile.followingCount}</p>
            <p>Following</p>
          </div>
        </div>
        <div className="mt-4">
          {igProfile.biography.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        {igProfile.externalLink && (
          <div className="mt-4">
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
