import BlogPage from '@/components/Blog/BlogPage/BlogPage';
import { getAllArticles } from '@/lib/sanity';
import React from 'react';

const Page: React.FC = async () => {
  const articles = await getAllArticles();
  return <BlogPage articles={articles} />;
};

export default Page;
