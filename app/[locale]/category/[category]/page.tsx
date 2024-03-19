import initTranslations from '@/app/i18n';
import BlogPage from '@/components/Blog/BlogPage/BlogPage';
import { getArticlesByCategory } from '@/lib/sanity';
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
  const articles = await getArticlesByCategory(category);
  return <BlogPage heading={t('title')} articles={articles} />;
};

export default Page;
