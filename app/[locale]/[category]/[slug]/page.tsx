import { sanityClient } from '@/app/api/clients';
import { getArticleByCategorySlug } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import React from 'react';

interface Metadata {
  params: {
    category: string;
    slug: string;
  };
}

const Page: React.FC<Metadata> = async ({ params: { category, slug } }) => {
  const article = await getArticleByCategorySlug(category, slug);
  console.log(article);

  if (!article) return notFound();

  return <div></div>;
};

export default Page;
