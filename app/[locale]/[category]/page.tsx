import initTranslations from '@/app/i18n';
import BlogPage from '@/components/Blog/BlogPage/BlogPage';
import { getArticlesByCategory } from '@/lib/sanity';
import BRAND from '@/lib/static';
import { slugToMetaTitle } from '@/lib/tools';
import { redirect } from 'next/navigation';
import React from 'react';

interface Metadata {
  params: {
    locale: string;
    category: string;
  };
}

export const revalidate = 1800;

export async function generateMetadata({
  params: { category },
}: {
  params: { category: string };
  }) {
  
  return {
    title: `${slugToMetaTitle(category)} | ${BRAND.name}`,
  };
}

const Page: React.FC<Metadata> = async ({ params: { locale, category } }) => {
  const { t } = await initTranslations(locale, ['blogging']);
  const articles = await getArticlesByCategory(category);
  return <BlogPage heading={t('blogging:title')} articles={articles} />;
};

export default Page;
