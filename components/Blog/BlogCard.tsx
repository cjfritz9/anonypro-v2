'use client';

import { toDisplayCategory } from '@/lib/tools';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiUser } from 'react-icons/fi';
import { LuCalendarDays } from 'react-icons/lu';

interface Props {
  thumbnailUrl: string;
  category: string;
  title: string;
  slug: string;
  author: {
    name: string;
    slug: string;
  };
  datePosted: string;
}

const BlogCard: React.FC<Props> = ({
  thumbnailUrl,
  category,
  title,
  slug,
  author,
  datePosted,
}) => {
  const {
    i18n: { language: locale },
  } = useTranslation();

  const toTruncatedTitle = (text: string) => {
    if (text.length <= 75) {
      return text;
    } else {
      return text.slice(0, 72) + '...';
    }
  };

  return (
    <div className="flex h-[480px] max-w-[376px] flex-col overflow-clip rounded-[48px] bg-base-100 bg-opacity-45">
      <Link href={`/${category}/${slug}`}>
        <Image
          src={thumbnailUrl}
          alt={`${title} thumbnail image`}
          height={264}
          width={376}
          className="min-h-[264px] bg-base-300 object-cover object-center duration-300 hover:scale-110"
        />
      </Link>
      <div className="h-full w-full p-6">
        <Link href={`/${category}`} className="hover:underline">
          {toDisplayCategory(category)}
        </Link>
        <Link href={`/${category}/${slug}`}>
          <h5 className="h-[88px] py-5 hover:underline">
            {toTruncatedTitle(title)}
          </h5>
        </Link>
        <hr className="!border-t-[2px] opacity-15" />
        <div className="mt-5 flex justify-between">
          <Link href={`/author/${author.slug}`} className="flex gap-2">
            <FiUser size={20} />
            <p className="max-w-[162px] hover:underline">{author.name}</p>
          </Link>
          <div className="flex gap-2">
            <LuCalendarDays size={20} />
            <p>
              {new Date(datePosted).toLocaleDateString(locale, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
