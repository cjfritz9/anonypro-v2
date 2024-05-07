'use client';

import useIsClient from '@/lib/hooks/useIsClient';
import React, { useEffect } from 'react';

const InArticleAd: React.FC = () => {
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
      style={{ display: 'block', textAlign: 'center' }}
      data-ad-client="ca-pub-9924000383649266"
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-slot="5273736659"
    />
  );
};

export default InArticleAd;
