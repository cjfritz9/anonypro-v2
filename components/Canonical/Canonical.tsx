'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

interface Props {
  locale: string;
}

const Canonical: React.FC<Props> = ({ locale }) => {
  const baseUrl = 'https://anonypro.com';
  const pathname = usePathname();

  if (locale === 'en') {
    return (
      <link rel="canonical" href={baseUrl + pathname.replaceAll('/en', '/')} />
    );
  } else {
    return <link rel="canonical" href={baseUrl + pathname} />;
  }
};

export default Canonical;
