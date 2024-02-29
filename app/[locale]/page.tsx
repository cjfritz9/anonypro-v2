import SearchBar from '@/components/SearchBar/SearchBar';
import ServiceSelector from '@/components/ServiceSelector/ServiceSelector';
import initTranslations from '../i18n';

interface Metadata {
  params: {
    locale: string;
  };
}

export default async function Home({ params: { locale } }: Metadata) {
  const { t } = await initTranslations(locale, ['home', 'common']);
  return (
    <main className='mt-12 lg:mt-24 w-full max-w-[668px] flex min-h-[6000px] flex-col items-center'>
      <div className='flex flex-col gap-10 w-full max-w-[576px] items-center'>
        <div className='max-w-[576px] text-center gap-10 flex flex-col'>
          <h1 className='text-[32px] leading-[44px] lg:text-[56px] lg:leading-[66px]'>
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
      <div className='mt-16 w-full'>
        <ServiceSelector
          displayNames={t('section_one.service_buttons', {
            returnObjects: true
          })}
        />
      </div>
    </main>
  );
}
