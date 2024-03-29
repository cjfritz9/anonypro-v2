import initTranslations from '@/app/i18n';
import BlogPage from '@/components/Blog/BlogPage/BlogPage';
import { getAllArticles } from '@/lib/sanity';
import BRAND from '@/lib/static';
import React from 'react';

export const revalidate = 1800;

interface Params {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: Params) {
  const { t } = await initTranslations(locale, ['blogging']);

  return {
    title: t('blogging:meta_title', { anonypro: 'AnonyPro' }),
  };
}

const Page: React.FC<Params> = async ({ params: { locale } }) => {
  const { t } = await initTranslations(locale, ['blogging']);

  const articles = await getAllArticles();
  return <BlogPage heading={t('blogging:title')} articles={articles} />;
};

export default Page;
