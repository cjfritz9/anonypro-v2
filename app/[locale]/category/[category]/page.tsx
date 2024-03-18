import BlogPage from '@/components/Blog/BlogPage/BlogPage';
import { getArticlesByCategory } from '@/lib/sanity';
import React from 'react';

interface Metadata {
  params: {
    category: string;
  };
}

const Page: React.FC<Metadata> = async ({ params: { category } }) => {
  const articles = await getArticlesByCategory(category);
  return <BlogPage articles={articles} />;
};

export default Page;
