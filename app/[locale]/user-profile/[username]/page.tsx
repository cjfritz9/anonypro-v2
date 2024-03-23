import initTranslations from '@/app/i18n';
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

export async function generateMetadata({ params: { username } }: Metadata) {
  return {
    title: `${username} | View Instagram Anonymously | Profile | Posts | Stories`,
  };
}

export default async function UsernamePage({ params }: Metadata) {
  const { locale, username } = params;
  const { t } = await initTranslations(locale, ['user-profile', 'common']);

  return (
    <main className="flex min-h-[6000px] w-full max-w-[1280px] flex-col items-center">
      <section className="flex w-full flex-col items-center">
        <Service
          username={username}
          serviceButtonsText={t('common:service_selector.button_names', {
            returnObjects: true,
          })}
        />
      </section>
    </main>
  );
}
