'use client';

import { notFound, useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type Category =
  | null
  | ''
  | 'story-viewer'
  | 'glossary'
  | 'instagram-captions'
  | 'quotes';

const CategorySelector: React.FC = () => {
  const { category: paramCategory } = useParams();
  const [category, setCategory] = useState<Category>(null);
  const router = useRouter();

  const handleClick = (category: Category) => {
    if (category === '') {
      router.push('/blog');
    } else {
      router.push(`/category/${category}`);
    }
  };

  useEffect(() => {
    if (!paramCategory) {
      setCategory('');
    } else if (
      paramCategory !== 'story-viewer' &&
      paramCategory !== 'glossary' &&
      paramCategory !== 'instagram-captions' &&
      paramCategory !== 'quotes'
    ) {
      return notFound();
    } else {
      setCategory(paramCategory);
    }
  }, [paramCategory]);

  return (
    <div className="my-8 flex w-full flex-wrap items-center justify-center gap-4">
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
        className={`${category === 'glossary' ? 'btn-accent' : ''} btn no-animation text-white`}
        onClick={() => handleClick('glossary')}
      >
        Glossary
      </button>
      <button
        className={`${category === 'instagram-captions' ? 'btn-accent' : ''} btn no-animation text-white`}
        onClick={() => handleClick('instagram-captions')}
      >
        Instagram Captions
      </button>
      <button
        className={`${category === 'quotes' ? 'btn-accent' : ''} btn no-animation text-white`}
        onClick={() => handleClick('quotes')}
      >
        Quotes
      </button>
    </div>
  );
};

export default CategorySelector;
