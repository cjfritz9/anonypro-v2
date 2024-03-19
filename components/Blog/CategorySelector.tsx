'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type Category =
  | null
  | ''
  | 'story-viewer'
  | 'post-highlights'
  | 'creating-posts';

const CategorySelector: React.FC = () => {
  const { category: paramCategory } = useParams();
  const [category, setCategory] = useState<Category>(null);
  const router = useRouter();

  const handleClick = (category: Category) => {
    if (category === '') {
      router.push('/blog');
    } else {
      router.push(`/${category}`);
    }
  };

  useEffect(() => {
    if (
      !paramCategory ||
      (paramCategory !== 'story-viewer' &&
        paramCategory !== 'post-highlights' &&
        paramCategory !== 'creating-posts')
    ) {
      setCategory('');
    } else {
      setCategory(paramCategory);
    }
  }, [paramCategory]);

  return (
    <div className="my-8 flex w-full items-center justify-center gap-6">
      <button
        className={`${category === '' ? 'btn-accent' : ''} btn no-animation text-white`}
        onClick={() => handleClick('')}
      >
        All Articles
      </button>
      <button
        className={`${category === 'story-viewer' ? 'btn-accent' : ''} btn no-animation text-white`}
        onClick={() => handleClick('story-viewer')}
      >
        Story Viewer
      </button>
      <button
        className={`${category === 'post-highlights' ? 'btn-accent' : ''} btn no-animation text-white`}
        onClick={() => handleClick('post-highlights')}
      >
        Post Highlights
      </button>
      <button
        className={`${category === 'creating-posts' ? 'btn-accent' : ''} btn no-animation text-white`}
        onClick={() => handleClick('creating-posts')}
      >
        Creating Posts
      </button>
    </div>
  );
};

export default CategorySelector;
