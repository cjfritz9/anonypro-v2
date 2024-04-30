import Script from 'next/script';
import React, { ReactElement } from 'react';
import WelcomeBlock from '../WelcomeBlock/WelcomeBlock';
import initTranslations from '@/app/i18n';
import HowToUse from '../HowTo/HowToUse';
import CardGrid, { BrandPageFeatures } from '../CardGrid/CardGrid';
import { features } from 'process';
import FAQ from '../FAQ/FAQ';
import BlogPreview from '../Blog/BlogPreview';
import { getLatestThreeArticles } from '@/lib/sanity';
import SearchBar from '../Service/SearchBar';
import ServiceSelector from '../Service/ServiceSelector';

interface Props {
  locale: string;
  headings: {
    main: string;
    sub: string;
  };
  description: {
    title: string;
    body: ReactElement;
  };
  features: {
    heading: string;
  };
  howToUseTitle: string;
  FAQs: {
    heading: string;
    subheading?: string;
    faq_one: {
      question: string;
      answer: string;
    };
    faq_two: {
      question: string;
      answer: string;
    };
    faq_three?: {
      question: string;
      answer: string;
    };
    faq_four?: {
      question: string;
      answer: string;
    };
    faq_five?: {
      question: string;
      answer: string;
    };
    faq_six?: {
      question: string;
      answer: string;
    };
  };
}

const BrandPage: React.FC<Props> = async ({
  locale,
  headings,
  description,
  features,
  howToUseTitle,
  FAQs,
}) => {
  const { t } = await initTranslations(locale, ['home', 'common']);
  const articles = await getLatestThreeArticles();

  return (
    <main className="mt-12 flex w-full max-w-[1280px] flex-col items-center lg:mt-24">
      <section className="flex w-full max-w-[720px] flex-col items-center">
        <div className="flex w-full max-w-[576px] flex-col items-center gap-10">
          <div className="flex max-w-[576px] flex-col gap-10 text-center">
            <h1 className="text-[32px] font-[500] leading-[44px] lg:text-[56px] lg:leading-[66px]">
              {headings.main}
            </h1>
            <h2>{headings.sub}</h2>
            <SearchBar />
          </div>
        </div>
        <div className="mt-16 w-full max-w-[720px]">
          <ServiceSelector
            displayNames={t('service_selector.button_names', {
              returnObjects: true,
            })}
          />
        </div>
      </section>
      <section className="mt-32 w-full">
        <WelcomeBlock
          translations={{
            heading: description.title,
            body: description.body,
            item_one: t('home:section_two.item_one', { returnObjects: true }),
            item_two: t('home:section_two.item_two', { returnObjects: true }),
            item_three: t('home:section_two.item_three', {
              returnObjects: true,
            }),
          }}
          forBrandPage
        />
      </section>
      <section className="mt-32 w-full">
        <HowToUse
          altTitle={howToUseTitle}
          translations={t('home:section_four', {
            returnObjects: true,
          })}
        />
      </section>
      <section className="mt-32 w-full">
        <BrandPageFeatures heading={features.heading} />
      </section>
      <section className="mt-32 w-full">
        <FAQ translations={FAQs} />
      </section>
      <section className="mt-32 w-full">
        <BlogPreview
          articles={articles}
          heading={t('home:section_seven.heading')}
        />
      </section>
    </main>
  );
};

export default BrandPage;
