import AuthorCard from '@/components/Blog/AuthorCard';
import ScrollToSection from '@/components/Blog/ScrollToSection';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { getArticleByCategorySlug } from '@/lib/sanity';
import { toDisplayCategory } from '@/lib/tools';
import { PortableTextComponents } from '@portabletext/react';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { PropsWithChildren } from 'react';
import { FiUser } from 'react-icons/fi';
import { LuCalendarDays } from 'react-icons/lu';

interface Metadata {
  params: {
    category: string;
    slug: string;
  };
}

interface LinkableHeaderProps {
  children: string;
  value: any;
}

const LinkableHeader = ({ children, value }: LinkableHeaderProps) => {
  if (value.style === 'h1') {
    return (
      <h1 className="text-white" id={value._key}>
        {children}
      </h1>
    );
  }

  if (value.style === 'h2') {
    return (
      <h2 className="text-4xl text-white" id={value._key}>
        {children}
      </h2>
    );
  }

  if (value.style === 'h3') {
    return (
      <h3 className="text-3xl text-white" id={value._key}>
        {children}
      </h3>
    );
  }

  if (value.style === 'h4') {
    return (
      <h4 className="text-3xl text-white" id={value._key}>
        {children}
      </h4>
    );
  }

  if (value.style === 'h5') {
    return (
      <h5 className="text-2xl text-white" id={value._key}>
        {children}
      </h5>
    );
  }

  return (
    <h6 className="text-white" id={value._key}>
      {children}
    </h6>
  );
};

const components: PortableTextComponents = {
  block: {
    //@ts-ignore
    h1: LinkableHeader,
    //@ts-ignore
    h2: LinkableHeader,
    //@ts-ignore
    h3: LinkableHeader,
    //@ts-ignore
    h4: LinkableHeader,
    //@ts-ignore
    h5: LinkableHeader,
    //@ts-ignore
    h6: LinkableHeader,
  },
};

const Page: React.FC<Metadata> = async ({ params: { category, slug } }) => {
  const article: any = await getArticleByCategorySlug(category, slug);
  console.log(article);

  if (!article) return notFound();

  const sections = article.content.filter((section: any) =>
    section.style.startsWith('h')
  );

  return (
    <div className="my-12 w-full max-w-[970px] text-center lg:text-left">
      <Breadcrumbs />
      <div className="prose">
        <h1 className="text-white">{article.title}</h1>
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
          className="max-h-[600px] w-auto rounded-[48px] object-cover"
        />
      </div>
      <ScrollToSection sections={sections} />
      <div className="prose w-full max-w-[1280px] text-white">
        <PortableText components={components} value={article.content} />
      </div>
      <div className="my-12 flex w-full max-w-[1280px] justify-center">
        <AuthorCard data={article.author} />
      </div>
    </div>
  );
};

export default Page;
