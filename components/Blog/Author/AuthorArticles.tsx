'use client';
import React, { useState, useTransition } from 'react';
import BlogCard from '../BlogCard';
import AuthorArticlePagination from './AuthorArticlePagination';
import { useTranslation } from 'react-i18next';

interface Props {
  author: {
    name: string;
    slug: string;
  };
  articles: any[];
}

const AuthorArticles: React.FC<Props> = ({ author, articles }) => {
  const [paginatedArticles, setPaginatedArticles] = useState(articles);
  const { t } = useTranslation(['blogging']);

  // const translatedTitle = t('author.articles.heading');

  const onUpdatePaginatedArticles = (articles: typeof paginatedArticles) => {
    setPaginatedArticles(articles);
  };

  return (
    <div className="mt-12 lg:mt-20">
      <h1 className="mb-12 text-center text-4xl font-semibold">
        {t('author.articles.heading', { name: author.name })}
      </h1>
      <div className="overflow flex w-full max-w-[1280px] flex-wrap justify-center gap-8">
        {paginatedArticles && paginatedArticles[0] ? (
          paginatedArticles.map((article: any) => (
            <BlogCard
              key={article.id}
              author={author}
              category={article.category}
              datePosted={article.datePosted}
              thumbnailUrl={article.heroImage.url.url}
              title={article.title}
              slug={article.slug}
            />
          ))
        ) : (
          <h2 className="prose my-6 w-full text-center">
            This author currently has no public articles
          </h2>
        )}
      </div>
      {articles && articles[0] && (
        <div className="my-12 flex w-full justify-center">
          <AuthorArticlePagination
            authorSlug={author.slug}
            totalCount={articles[0].total}
            onUpdatePaginatedArticles={onUpdatePaginatedArticles}
          />
        </div>
      )}
    </div>
  );
};

export default AuthorArticles;
