import SearchBar from '@/components/SearchBar/SearchBar';
import ServiceSelector from '@/components/ServiceSelector/ServiceSelector';
import initTranslations from '../i18n';
import Service from '@/components/Service/Service';

interface Metadata {
  params: {
    locale: string;
  };
}

export default async function Home({ params: { locale } }: Metadata) {
  const { t } = await initTranslations(locale, ['home', 'common']);
  return (
    <main className="mt-12 flex min-h-[6000px] w-full max-w-[1280px] flex-col items-center lg:mt-24">
      <section className="flex w-full max-w-[668px] flex-col items-center">
        <div className="flex w-full max-w-[576px] flex-col items-center gap-10">
          <div className="flex max-w-[576px] flex-col gap-10 text-center">
            <h1 className="text-[32px] leading-[44px] lg:text-[56px] lg:leading-[66px]">
              {t('section_one.heading_one')}
            </h1>
            <h2>
              {t('section_one.heading_two.part_one')}
              <br />
              {t('section_one.heading_two.part_two')}
            </h2>
            <SearchBar
              placeholderText={t('section_one.search_bar.placeholder')}
            />
          </div>
        </div>
        <div className="mt-16 w-full max-w-[668px]">
          <ServiceSelector
            displayNames={t('section_one.service_buttons', {
              returnObjects: true,
            })}
          />
        </div>
      </section>
      <section className="flex w-full max-w-[720px] flex-col items-center">
        <Service />
      </section>
    </main>
  );
}
