'use client';

import { ReCaptchaProvider as RCProvider } from 'next-recaptcha-v3';
import Script from 'next/script';
import React, { PropsWithChildren } from 'react';

const ReCaptchaProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <RCProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}>
      <Script defer src='https://www.google.com/recaptcha/api.js' />
      {children}
    </RCProvider>
  );
};

export default ReCaptchaProvider;
