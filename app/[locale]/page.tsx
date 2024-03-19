import SearchBar from '@/components/Service/SearchBar';
import ServiceSelector from '@/components/Service/ServiceSelector';
import initTranslations from '../i18n';
import WelcomeBlock from '@/components/WelcomeBlock/WelcomeBlock';
import HowToBegin from '@/components/HowTo/HowToBegin';
import HowToUse from '@/components/HowTo/HowToUse';
import CardGrid from '@/components/CardGrid/CardGrid';
import FAQ from '@/components/FAQ/FAQ';
import BlogPreview from '@/components/Blog/BlogPreview';
import { getLatestThreeArticles } from '@/lib/sanity';

interface Metadata {
  params: {
    locale: string;
  };
}

export default async function Home({ params: { locale } }: Metadata) {
  const { t } = await initTranslations(locale, ['home', 'common']);
  const articles = await getLatestThreeArticles();

  return (
    <main className="mt-12 flex w-full max-w-[1280px] flex-col items-center lg:mt-24">
      <section className="flex w-full max-w-[668px] flex-col items-center">
        <div className="flex w-full max-w-[576px] flex-col items-center gap-10">
          <div className="flex max-w-[576px] flex-col gap-10 text-center">
            <h1 className="text-[32px] leading-[44px] font-[500] lg:text-[56px] lg:leading-[66px]">
              {t('section_one.heading_one')}
            </h1>
            <h2>
              {t('section_one.heading_two.part_one')}
              <br />
              {t('section_one.heading_two.part_two')}
            </h2>
            <SearchBar />
          </div>
        </div>
        <div className="mt-16 w-full max-w-[668px]">
          <ServiceSelector
            displayNames={t('common:service_selector.button_names', {
              returnObjects: true,
            })}
          />
        </div>
      </section>
      <section className="mt-32 w-full">
        <WelcomeBlock
          translations={t('section_two', {
            returnObjects: true,
          })}
        />
      </section>
      <section className="mt-32 w-full">
        <HowToBegin
          translations={t('section_three', {
            returnObjects: true,
          })}
        />
      </section>
      <section className="mt-32 w-full">
        <HowToUse
          translations={t('section_four', {
            returnObjects: true,
          })}
        />
      </section>
      <section className="mt-32 w-full">
        <CardGrid
          translations={t('section_five', {
            returnObjects: true,
          })}
        />
      </section>
      <section className="mt-32 w-full">
        <FAQ
          translations={t('section_six', {
            returnObjects: true,
          })}
        />
      </section>
      <section className="mt-32 w-full">
        <BlogPreview
          articles={articles}
          heading={t('section_seven.heading')}
        />
      </section>
    </main>
  );
}
