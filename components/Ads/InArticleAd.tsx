'use client';

import useIsClient from '@/lib/hooks/useIsClient';
import { Adsense } from '@ctrl/react-adsense';
import React, { useEffect } from 'react';

const InArticleAd: React.FC = () => {
  const isClient = useIsClient();

  if (!isClient) return null;

  return (
    <div className="h-auto w-full py-4">
      <Adsense
        client="ca-pub-9924000383649266"
        slot="5273736659"
        format="fluid"
        layout="in-article"
      />
    </div>
  );
};

export default InArticleAd;
