'use client';

import { getAllArticles, getArticlesByCategory } from '@/lib/sanity';
import React, { SetStateAction, useState } from 'react';

interface Props {
  totalCount: number;
  category?: string;
  onUpdatePaginatedArticles: (articles: any) => void;
}

const ArticlePagination: React.FC<Props> = ({
  totalCount,
  category,
  onUpdatePaginatedArticles,
}) => {
  const totalPages = Math.ceil(totalCount / 12);
  const [page, setPage] = useState(1);

  const handleClick = async (pageNum: number) => {
    if (category) {
      const newArticles = await getArticlesByCategory(category, pageNum);
      if (newArticles) {
        onUpdatePaginatedArticles(newArticles);
      }
    } else {
      const newArticles = await getAllArticles(pageNum);
      if (newArticles) {
        onUpdatePaginatedArticles(newArticles);
      }
    }
    setPage(pageNum);
  };

  console.log(totalPages)

  return (
    <div className="flex w-full justify-center gap-6">
      <button
        className={`${page < 3 ? 'btn-disabled' : ''} btn btn-circle bg-base-100`}
        onClick={() => handleClick(1)}
      >
        «
      </button>

      {page - 2 >= 1 && (
        <button
          className="btn btn-circle bg-base-100"
          onClick={() => handleClick(page - 2)}
        >
          {page - 2}
        </button>
      )}

      {page - 1 >= 1 && (
        <button
          className="btn btn-circle bg-base-100"
          onClick={() => handleClick(page - 1)}
        >
          {page - 1}
        </button>
      )}

      <button className="btn btn-circle btn-accent pointer-events-none text-white">
        {page}
      </button>

      {totalPages >= page + 1 && (
        <button
          className="btn btn-circle bg-base-100"
          onClick={() => handleClick(page + 1)}
        >
          {page + 1}
        </button>
      )}

      {totalPages >= page + 2 && (
        <button
          className="btn btn-circle bg-base-100"
          onClick={() => handleClick(page + 2)}
        >
          {page + 2}
        </button>
      )}

      {
        <button
          className={`${totalPages < page + 2 ? 'btn-disabled' : ''} btn btn-circle bg-base-100`}
          onClick={() => handleClick(totalPages)}
        >
          »
        </button>
      }
    </div>
  );
};

export default ArticlePagination;
