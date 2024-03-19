import React, { useEffect, useState } from 'react';
import blogImage from '@/public/assets/blog-image-ph.png';
import BlogCard from './BlogCard';
import { getLatestThreeArticles } from '@/lib/sanity';

interface Props {
  articles: any[];
  heading: string;
}
const BlogPreview: React.FC<Props> = ({ articles, heading }) => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      <h3 className="mb-16 text-center text-4xl font-[500] leading-[44px] xl:text-[44px]">
        {heading}
      </h3>
      <div className="lg:items-between flex w-full flex-col flex-wrap items-center justify-between gap-8 lg:flex-row">
        {articles.map((article) => (
          <BlogCard
            key={article.id}
            thumbnailUrl={article.heroImage.url.url}
            author={{ name: article.author.name, slug: article.author.slug }}
            category={article.category}
            slug={article.slug}
            title={article.title}
            datePosted={article.datePosted}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogPreview;
