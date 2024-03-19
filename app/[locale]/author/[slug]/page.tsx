import AuthorPage from '@/components/Blog/Author/AuthorPage/AuthorPage';
import Profile from '@/components/Blog/Author/Profile';
import { getAuthorBySlug } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import React from 'react';

interface Props {
  params: {
    slug: string;
  };
}

const Page: React.FC<Props> = async ({ params: { slug } }) => {
  const data = await getAuthorBySlug(slug);
  if (!data) return notFound();

  return <AuthorPage data={data} />;
};

export default Page;
