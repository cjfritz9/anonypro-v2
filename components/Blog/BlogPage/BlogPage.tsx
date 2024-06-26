'use client';
import React, { useRef, useState } from 'react';
import BlogCard from '../BlogCard';
import CategorySelector from '../CategorySelector';
import ArticlePagination from '../ArticlePagination';
import MultiplexAd from '@/components/Ads/MultiplexAd';

interface Props {
  category?: string;
  articles: any[];
  heading: string;
}

const BlogPage: React.FC<Props> = ({ articles, category, heading }) => {
  const [paginatedArticles, setPaginatedArticles] = useState(articles);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const onUpdatePaginatedArticles = (articles: typeof paginatedArticles) => {
    setPaginatedArticles(articles);
    headingRef?.current?.scrollIntoView({
      behavior: 'smooth',
      inline: 'nearest',
    });
  };

  return (
    <div className="my-12 lg:my-20">
      <h1 ref={headingRef} className="mb-12 text-center text-4xl font-semibold">
        {heading}
      </h1>
      <CategorySelector />
      <div className="overflow flex w-full max-w-[1280px] flex-wrap justify-center gap-8">
        {paginatedArticles && paginatedArticles[0] ? (
          paginatedArticles.map((article: any, i) => (
            <BlogCard
              key={article.id}
              author={{ name: article.author.name, slug: article.author.slug }}
              category={article.category}
              datePosted={article.datePosted}
              thumbnailUrl={article.heroImage.url.url}
              title={article.title}
              slug={article.slug}
            />
          ))
        ) : (
          <h2 className="prose my-6 w-full text-center">
            No articles here yet, stay tuned!
          </h2>
        )}
      </div>
      {articles && articles[0] && (
        <div className="my-12 flex w-full justify-center">
          <ArticlePagination
            category={category}
            totalCount={articles[0].total}
            onUpdatePaginatedArticles={onUpdatePaginatedArticles}
          />
        </div>
      )}
      <MultiplexAd />
    </div>
  );
};

export default BlogPage;
