import initTranslations from '@/app/i18n';
import BlogPage from '@/components/Blog/BlogPage/BlogPage';
import { getAllArticles } from '@/lib/sanity';
import React from 'react';

interface Metadata {
  params: {
    locale: string;
    category: string;
  };
}

export const revalidate = 1800;

const Page: React.FC<Metadata> = async ({ params: { locale, category } }) => {
  const { t } = await initTranslations(locale, ['blogging']);

  const articles = await getAllArticles();
  return <BlogPage heading={t('blogging:title')} articles={articles} />;
};

export default Page;
