import initTranslations from '@/app/i18n';
import ArticleRating from '@/components/Blog/ArticleRating';
import AuthorCard from '@/components/Blog/Author/AuthorCard';
import BlogPreview from '@/components/Blog/BlogPreview';
import ScrollToSection from '@/components/Blog/ScrollToSection';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { getArticleByCategorySlug, getLatestThreeArticles } from '@/lib/sanity';
import urlBuilder from '@sanity/image-url';
import { getImageDimensions } from '@sanity/asset-utils';
import BRAND from '@/lib/static';
import { toDisplayCategory } from '@/lib/tools';
import { PortableTextComponents } from '@portabletext/react';
import { PortableText, SanityClient } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import React from 'react';
import { FiUser } from 'react-icons/fi';
import { LuCalendarDays } from 'react-icons/lu';

interface Metadata {
  params: {
    locale: string;
    category: string;
    slug: string;
  };
}

interface LinkableHeaderProps {
  children: string;
  value: any;
}

export const revalidate = 1800;

export async function generateMetadata({
  params: { category, slug },
}: {
  params: { category: string; slug: string };
}) {
  const article = await getArticleByCategorySlug(category, slug);
  if (!article) {
    return notFound();
  }
  return {
    title: article.metaTitle ?? `${article.title} - ${BRAND.name}`,
    description: article.metaDesc ?? undefined,
  };
}

const PortableImage = ({ value, isInline }: any) => {
  const { width, height } = getImageDimensions(value);
  return (
    <Image
      src={urlBuilder({ dataset: 'production', projectId: 'vvw86v5i' })
        .image(value)
        .width(isInline ? 100 : 800)
        .fit('max')
        .auto('format')
        .url()}
      height={height}
      width={width}
      alt={value.alt || ' '}
      loading="lazy"
      className={`${isInline ? 'inline-block' : 'block'} rounded-lg`}
      style={{ aspectRatio: width / height }}
    />
  );
};

const LinkableHeader = ({ children, value }: LinkableHeaderProps) => {
  // if (value.style === 'h1') {
  //   return (
  //     <h1 className="text-white" id={value._key}>
  //       {children}
  //     </h1>
  //   );
  // }

  // if (value.style === 'h2') {
  return (
    <h2 className="text-4xl text-white" id={value._key}>
      {children}
    </h2>
  );
  // }

  // if (value.style === 'h3') {
  //   return (
  //     <h3 className="text-3xl text-white" id={value._key}>
  //       {children}
  //     </h3>
  //   );
  // }

  // if (value.style === 'h4') {
  //   return (
  //     <h4 className="text-3xl text-white" id={value._key}>
  //       {children}
  //     </h4>
  //   );
  // }

  // if (value.style === 'h5') {
  //   return (
  //     <h5 className="text-2xl text-white" id={value._key}>
  //       {children}
  //     </h5>
  //   );
  // }

  // return (
  //   <h6 className="text-white" id={value._key}>
  //     {children}
  //   </h6>
  // );
};

const components: PortableTextComponents = {
  block: {
    //@ts-ignore
    // h1: LinkableHeader,
    //@ts-ignore
    h2: LinkableHeader,
    //@ts-ignore
    // h3: LinkableHeader,
    //@ts-ignore
    // h4: LinkableHeader,
    //@ts-ignore
    // h5: LinkableHeader,/=
    //@ts-ignore
    // h6: LinkableHeader,
  },
  types: {
    //@ts-ignore
    image: PortableImage,
  },
};

const Page: React.FC<Metadata> = async ({
  params: { locale, category, slug },
}) => {
  const { t } = await initTranslations(locale, ['blogging']);
  const article: any = await getArticleByCategorySlug(category, slug);
  const latestArticles = await getLatestThreeArticles();

  if (!article) return notFound();

  const sections = article.content.filter((section: any) =>
    section.style?.startsWith('h2')
  );

  return (
    <div className="flex max-w-[100dvw] flex-col items-center">
      <Script id="article-schema" type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: article.title,
          image: [article.heroImage.url.url],
          datePublished: new Date(article.datePosted).toISOString(),
          dateModified: new Date(article.datePosted).toISOString(),
          author: [
            {
              '@type': 'Person',
              name: article.author.name,
              url: `https://anonypro.com/author/${article.author.slug}`,
            },
          ],
          publisher: {
            name: 'AnonyPro Blog',
            url: 'https://anonypro.com',
          },
        })}
      </Script>
      <div className="my-12 w-full max-w-[970px] text-center lg:text-left">
        <Breadcrumbs />
        <div className="prose px-4 lg:px-0">
          <h1 className="text-3xl text-white md:text-4xl">{article.title}</h1>
          <p>{article.description}</p>
        </div>
        <div className="prose mt-8 flex flex-col items-center gap-2 text-white lg:flex-row lg:gap-6">
          <Link
            href={`/${article.category}`}
            className="flex w-fit gap-4 rounded-sm bg-[#505186] px-2 py-1 text-white hover:brightness-110"
            style={{ textDecoration: 'none' }}
          >
            {toDisplayCategory(article.category)}
          </Link>
          <Link
            href={`/author/${article.author.slug}`}
            className="flex items-center gap-2 text-white"
            style={{ textDecoration: 'none' }}
          >
            <FiUser size={20} />
            <p className=" m-0 hover:underline">{article.author.name}</p>
          </Link>
          <div className="flex items-center gap-2">
            <LuCalendarDays size={20} />
            <p className="m-0">{article.datePosted}</p>
          </div>
        </div>
        <div className="my-12 flex w-full justify-center lg:my-20">
          <Image
            src={article.heroImage.url.url}
            alt="Hero Image"
            height={600}
            width={970}
            className="max-h-[600px] min-h-[480px] w-auto rounded-[48px] object-cover"
          />
        </div>
        <ScrollToSection sections={sections} />
        <div className="prose w-full max-w-[1280px] px-4 text-white">
          <PortableText components={components} value={article.content} />
        </div>
        <div className="my-12 flex w-full max-w-[1280px] justify-center">
          <AuthorCard data={article.author} />
        </div>
        <div className="my-12 flex w-full max-w-[1280px] justify-center">
          <ArticleRating articleId={article.id} />
        </div>
      </div>
      <section className="flex w-[100dvw] justify-center bg-[#6346A1] py-20">
        <div className="w-full max-w-[1280px]">
          <BlogPreview
            articles={latestArticles}
            heading={t('blogging:title')}
          />
        </div>
      </section>
    </div>
  );
};

export default Page;
