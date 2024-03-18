import React from 'react';
import Image from 'next/image';
import blogImage from '@/public/assets/blog-image-ph.png';
import { FiUser } from 'react-icons/fi';
import { LuCalendarDays } from 'react-icons/lu';
import BlogCard from './BlogCard';

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
          author={{ name: 'Shimron Hetmyer', slug: 'shimron-hetmyer' }}
          category="story-viewer"
          slug='Enhance Your Visual Experience: Opt for High-Resolution, Stunning Images'
          title="Enhance Your Visual Experience: Opt for High-Resolution, Stunning Images!"
          datePosted="Jan 31, 2024"
        />
        <BlogCard
          thumbnailUrl={blogImage.src}
          author={{ name: 'Shimron Hetmyer', slug: 'shimron-hetmyer' }}
          category="story-viewer"
          slug=''
          title="Enhance Your Visual Experience: Opt for High-Resolution, Stunning Images!"
          datePosted="Jan 31, 2024"
        />
        <BlogCard
          thumbnailUrl={blogImage.src}
          author={{ name: 'Shimron Hetmyer', slug: 'shimron-hetmyer' }}
          category="story-viewer"
          slug=''
          title="Enhance Your Visual Experience: Opt for High-Resolution, Stunning Images!"
          datePosted="Jan 31, 2024"
        />
      </div>
    </div>
  );
};

export default BlogPreview;
