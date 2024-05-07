'use client';

import useIsClient from '@/lib/hooks/useIsClient';
import { Adsense } from '@ctrl/react-adsense';
import React, { useEffect } from 'react';

const MultiplexAd: React.FC = () => {
  // const isClient = useIsClient();

  // if (!isClient) return null;

  return (
    <Adsense
      client="ca-pub-9924000383649266"
      slot="8529389724"
      format="autorelaxed"
    />
  );
};

export default MultiplexAd;
