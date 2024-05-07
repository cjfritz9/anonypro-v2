import initTranslations from '@/app/i18n';
import DisplayAd from '@/components/Ads/DisplayAd';
import MultiplexAd from '@/components/Ads/MultiplexAd';
import Service from '@/components/Service/Service';
import ServiceSelector from '@/components/Service/ServiceSelector';
import BRAND from '@/lib/static';
import React from 'react';

interface Metadata {
  params: {
    locale: string;
    username: string;
  };
}

export async function generateMetadata({
  params: { locale, username },
}: Metadata) {
  const { t } = await initTranslations(locale, ['user-profile']);
  return {
    title: t('user-profile:meta_title', { username, anonypro: BRAND.name }),
  };
}

export default async function UsernamePage({ params }: Metadata) {
  const { locale, username } = params;
  const { t } = await initTranslations(locale, ['user-profile', 'common']);

  return (
    <main className="flex min-h-[100dvh] w-full max-w-[1280px] flex-col items-center">
      <section className="flex w-full flex-col items-center">
        <DisplayAd />
        <Service
          username={username}
          serviceButtonsText={t('common:service_selector.button_names', {
            returnObjects: true,
          })}
        />
        <MultiplexAd />
      </section>
    </main>
  );
}
