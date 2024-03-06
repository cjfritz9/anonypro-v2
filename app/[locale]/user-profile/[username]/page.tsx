import initTranslations from '@/app/i18n';
import Service from '@/components/Service/Service';
import ServiceSelector from '@/components/Service/ServiceSelector';
import React from 'react';

interface Metadata {
  params: {
    locale: string;
    username: string;
  };
}

export default async function UsernamePage({ params }: Metadata) {
  const { locale, username } = params;
  const { t } = await initTranslations(locale, ['user-profile']);

  return (
    <main className="flex min-h-[6000px] w-full max-w-[1280px] flex-col items-center">
      <section className="flex w-full flex-col items-center">
        <Service
          username={username}
          serviceButtonsText={t('section_one.service_buttons', {
            returnObjects: true,
          })}
        />
      </section>
    </main>
  );
}
