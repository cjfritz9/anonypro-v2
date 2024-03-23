import initTranslations from '@/app/i18n';
import BlogPage from '@/components/Blog/BlogPage/BlogPage';
import { getAllArticles } from '@/lib/sanity';
import BRAND from '@/lib/static';
import React from 'react';

interface Metadata {
  params: {
    locale: string;
    category: string;
  };
}

export const revalidate = 1800;

export async function generateMetadata() {
  
  return {
    title: `Blog | ${BRAND.name} | Anonymous Instagram Story Viewer (View IG Anon: IGAnony)`,
  };
}

const Page: React.FC<Metadata> = async ({ params: { locale } }) => {
  const { t } = await initTranslations(locale, ['blogging']);

  const articles = await getAllArticles();
  return <BlogPage heading={t('blogging:title')} articles={articles} />;
};

export default Page;
