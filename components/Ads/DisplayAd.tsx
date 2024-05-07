'use client';

import React, { useEffect } from 'react';
import { Adsense } from '@ctrl/react-adsense';
import useIsClient from '@/lib/hooks/useIsClient';

const DisplayAd: React.FC = () => {
  const isClient = useIsClient();

  if (!isClient) return null;

  return (
    <div className="h-auto w-full py-4">
      <Adsense client="ca-pub-9924000383649266" slot="7391767564" />
    </div>
  );
};

export default DisplayAd;
