'use client';
import React, { useState } from 'react';
import BlogCard from '../BlogCard';
import CategorySelector from '../CategorySelector';
import ArticlePagination from '../ArticlePagination';

interface Props {
  category?: string;
  articles: any[];
  heading: string;
}

const BlogPage: React.FC<Props> = ({ articles, category, heading }) => {
  const [paginatedArticles, setPaginatedArticles] = useState(articles);

  const onUpdatePaginatedArticles = (articles: typeof paginatedArticles) => {
    setPaginatedArticles(articles);
  };

  return (
    <div className="my-12 lg:my-20">
      <h1 className="mb-12 text-center text-4xl font-semibold">{heading}</h1>
      <CategorySelector />
      <div className="overflow w-full max-w-[1280px] flex flex-wrap justify-center gap-8">
        {paginatedArticles && paginatedArticles[0] ? (
          paginatedArticles.map((article: any) => (
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
    </div>
  );
};

export default BlogPage;
