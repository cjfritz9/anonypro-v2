import initTranslations from '@/app/i18n';
import BlogPage from '@/components/Blog/BlogPage/BlogPage';
import { getArticlesByCategory } from '@/lib/sanity';
import BRAND from '@/lib/static';
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
    title: `${category.replaceAll('-', ' ').toUpperCase()} | ${BRAND.name} | Anonymous Instagram Story Viewer (View IG Anon: IGAnony)`,
  };
}

const Page: React.FC<Metadata> = async ({ params: { locale, category } }) => {
  const { t } = await initTranslations(locale, ['blogging']);
  const articles = await getArticlesByCategory(category);
  return <BlogPage heading={t('blogging:title')} articles={articles} />;
};

export default Page;
