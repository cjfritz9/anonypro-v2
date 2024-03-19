import initTranslations from '@/app/i18n';
import BlogPage, { categories } from '@/components/Blog/BlogPage/BlogPage';
import { getArticlesByCategory } from '@/lib/sanity';
import { redirect } from 'next/navigation';
import React from 'react';

interface Metadata {
  params: {
    locale: string;
    category: string;
  };
}

const Page: React.FC<Metadata> = async ({ params: { locale, category } }) => {
  const { t } = await initTranslations(locale, ['blogging']);
  const articles = await getArticlesByCategory(category);
  return <BlogPage heading={t('title')} articles={articles} />;
};

export default Page;
