'use client';

import useIsClient from '@/lib/hooks/useIsClient';
import React, { useEffect } from 'react';

const MultiplexAd: React.FC = () => {
  const isClient = useIsClient();

  useEffect(() => {
    if (isClient && window.adsbygoogle.loaded === false) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, [isClient]);

  if (!isClient) return null;

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-format="autorelaxed"
      data-ad-client="ca-pub-9924000383649266"
      data-ad-slot="8529389724"
    />
  );
};

export default MultiplexAd;
