import React from 'react';
import Image from 'next/image';
import blogImage from '@/public/assets/blog-image-ph.png';
import { FiUser } from 'react-icons/fi';
import { LuCalendarDays } from 'react-icons/lu';

interface Props {
  translations: {
    heading: string;
  };
}
const BlogPreview: React.FC<Props> = ({ translations }) => {
  const { heading } = translations;
  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      <h3 className="mb-16 text-center text-4xl font-[500] leading-[44px] xl:text-[44px]">
        {heading}
      </h3>
      <div className="lg:items-between flex w-full flex-col flex-wrap items-center justify-between gap-8 lg:flex-row">
        <BlogCard
          thumbnailUrl={blogImage.src}
          authorName="Shimron Hetmyer"
          category="Story Viewer"
          title="Enhance Your Visual Experience: Opt for High-Resolution, Stunning Images!"
          datePosted="Jan 31, 2024"
        />
        <BlogCard
          thumbnailUrl={blogImage.src}
          authorName="Shimron Hetmyer"
          category="Story Viewer"
          title="Enhance Your Visual Experience: Opt for High-Resolution, Stunning Images!"
          datePosted="Jan 31, 2024"
        />
        <BlogCard
          thumbnailUrl={blogImage.src}
          authorName="Shimron Hetmyer"
          category="Story Viewer"
          title="Enhance Your Visual Experience: Opt for High-Resolution, Stunning Images!"
          datePosted="Jan 31, 2024"
        />
      </div>
    </div>
  );
};

interface BlogCardProps {
  thumbnailUrl: string;
  category: string;
  title: string;
  authorName: string;
  datePosted: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  thumbnailUrl,
  category,
  title,
  authorName,
  datePosted,
}) => {
  const toTruncatedTitle = (text: string) => {
    if (text.length <= 75) {
      return text;
    } else {
      return text.slice(0, 72) + '...';
    }
  };

  return (
    <div className="flex h-[472px] max-w-[376px] flex-col overflow-clip rounded-[48px] bg-base-100">
      <Image
        src={thumbnailUrl}
        alt={`${title} thumbnail image`}
        height={260}
        width={376}
        className="bg-base-300 object-cover object-center"
      />
      <div className="h-full w-full p-6">
        <p>#{category.toUpperCase()}</p>
        <h5 className="py-5">{toTruncatedTitle(title)}</h5>
        <hr className="!border-t-[2px] opacity-15" />
        <div className="mt-5 flex justify-between">
          <div className="flex gap-2">
            <FiUser size={20} />
            <p>{authorName}</p>
          </div>
          <div className="flex gap-2">
            <LuCalendarDays size={20} />
            <p>{datePosted}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPreview;
