'use client';

import React, { useEffect, useState } from 'react';
import useIsClient from '@/lib/hooks/useIsClient';

const DisplayAd: React.FC = () => {
  const isClient = useIsClient();
  useEffect(() => {
    if (window) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);

  if (isClient) {
    return (
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9924000383649266"
        data-ad-slot="7391767564"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    );
  }
};

export default DisplayAd;
