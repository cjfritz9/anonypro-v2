import initTranslations from '@/app/i18n';
import AuthorPage from '@/components/Blog/Author/AuthorPage/AuthorPage';
import Profile from '@/components/Blog/Author/Profile';
import { getAuthorBySlug } from '@/lib/sanity';
import BRAND from '@/lib/static';
import { slugToMetaTitle, titlesToMetaTitle } from '@/lib/tools';
import { notFound } from 'next/navigation';
import React from 'react';

interface Props {
  params: {
    slug: string;
  };
}

export const revalidate = 1800;

export async function generateMetadata({ params: { slug } }: Props) {
  const data = await getAuthorBySlug(slug);
  console.log(data);
  return {
    title: `${data.name} | ${titlesToMetaTitle(data.titles)} - ${BRAND.name}`,
  };
}

const Page: React.FC<Props> = async ({ params: { slug } }) => {
  const data = await getAuthorBySlug(slug);
  if (!data) return notFound();

  return <AuthorPage data={data} />;
};

export default Page;
