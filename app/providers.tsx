'use client';

import InstagramProvider from '@/components/Context/InstagramProvider';
import ReCaptchaProvider from '@/components/Context/ReCaptchaProvider';
import TranslationsProvider from '@/components/Context/TranslationsProvider';
import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  translationProps: {
    resources: any;
    locale: string;
    namespaces: string[];
  };
}

const Providers: React.FC<Props> = ({ translationProps, children }) => {
  const { resources, locale, namespaces } = translationProps;
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={namespaces}
    >
      <ReCaptchaProvider>
        <InstagramProvider>{children}</InstagramProvider>
      </ReCaptchaProvider>
    </TranslationsProvider>
  );
};

export default Providers;
