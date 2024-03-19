'use client';

import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa6';

interface Props {
  articleId: string;
}

interface ArticleRating {
  articleId: string;
  rating: number;
}

const ArticleRating: React.FC<Props> = ({ articleId }) => {
  const [savedRating, setSavedRating] = useState({ exists: false, rating: -1 });
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const storageKey = 'article-ratings';

  const handleClick = (ratingIndex: number) => {
    setSavedRating({ exists: true, rating: ratingIndex });
    const ratingData: ArticleRating = {
      articleId,
      rating: ratingIndex,
    };

    const storedRatings = localStorage.getItem(storageKey);
    if (!storedRatings) {
      localStorage.setItem(storageKey, JSON.stringify([ratingData]));
    } else {
      const parsedRatings: ArticleRating[] = JSON.parse(storedRatings);
      localStorage.setItem(
        storageKey,
        JSON.stringify([...parsedRatings, ratingData])
      );
    }
  };

  const handleUndo = () => {
    setSavedRating({ exists: false, rating: -1 });
    const ratings = localStorage.getItem(storageKey);

    if (ratings) {
      const parsedRatings: ArticleRating[] = JSON.parse(ratings);
      const updatedRatings = parsedRatings.filter(
        (rating) => rating.articleId !== articleId
      );
      localStorage.setItem(storageKey, JSON.stringify(updatedRatings));
    }
  };

  useEffect(() => {
    const existingRatings = localStorage.getItem(storageKey);

    if (existingRatings) {
      const parsedRatings: ArticleRating[] = JSON.parse(existingRatings);
      parsedRatings.forEach((rating) => {
        if (rating.articleId === articleId) {
          setSavedRating({ exists: true, rating: rating.rating });
        }
      });
    }
  }, [articleId]);

  return (
    <div className="flex w-full max-w-[720px] flex-col items-center justify-center gap-6 lg:flex-row lg:items-start">
      <div>
        <h4 className="text-2xl font-semibold">
          {savedRating.exists
            ? 'You rated this article'
            : 'Share your thoughts on this article'}
        </h4>
        {savedRating.exists && (
          <p
            className="cursor-pointer text-center text-sm underline"
            onClick={handleUndo}
          >
            Undo
          </p>
        )}
      </div>
      <div
        className={`${savedRating.exists ? 'pointer-events-none' : 'pointer-events-auto'} flex gap-4`}
        onMouseLeave={() => setHoveredIndex(-1)}
      >
        <FaStar
          size={24}
          className={`${hoveredIndex >= 0 || (savedRating.exists && savedRating.rating >= 0) ? 'text-yellow-400' : 'text-white'} cursor-pointer`}
          onMouseEnter={() => setHoveredIndex(0)}
          onClick={() => handleClick(0)}
        />
        <FaStar
          size={24}
          className={`${hoveredIndex >= 1 || (savedRating.exists && savedRating.rating >= 1) ? 'text-yellow-400' : 'text-white'} cursor-pointer`}
          onMouseEnter={() => setHoveredIndex(1)}
          onClick={() => handleClick(1)}
        />
        <FaStar
          size={24}
          className={`${hoveredIndex >= 2 || (savedRating.exists && savedRating.rating >= 2) ? 'text-yellow-400' : 'text-white'} cursor-pointer`}
          onMouseEnter={() => setHoveredIndex(2)}
          onClick={() => handleClick(2)}
        />
        <FaStar
          size={24}
          className={`${hoveredIndex >= 3 || (savedRating.exists && savedRating.rating >= 3) ? 'text-yellow-400' : 'text-white'} cursor-pointer`}
          onMouseEnter={() => setHoveredIndex(3)}
          onClick={() => handleClick(3)}
        />
        <FaStar
          size={24}
          className={`${hoveredIndex >= 4 || (savedRating.exists && savedRating.rating >= 4) ? 'text-yellow-400' : 'text-white'} cursor-pointer`}
          onMouseEnter={() => setHoveredIndex(4)}
          onClick={() => handleClick(4)}
        />
      </div>
    </div>
  );
};

export default ArticleRating;
