'use client';

import React, { useState } from 'react';
import { Category, categories } from './BlogPage/BlogPage';

interface Props {
  categoryParam?: Category;
  onUpdateCategory: (category: string) => void;
}

const CategorySelector: React.FC<Props> = ({
  categoryParam = categories[0],
  onUpdateCategory,
}) => {
  const [category, setCategory] = useState<Category>(categoryParam);

  return <div className="flex w-full items-center justify-center gap-8"></div>;
};

export default CategorySelector;
