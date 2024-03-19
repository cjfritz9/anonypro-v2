'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiHome } from 'react-icons/fi';

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();
  const {
    i18n: { language: locale },
  } = useTranslation();

  const crumbs = [
    { name: 'home', path: '/' },
    ...pathname
      .split('/')
      .slice(1)
      .map((crumb, i, arr) => ({
        name: crumb.replaceAll('-', ' '),
        path: arr.slice(0, i + 1).join('/'),
      })),
  ];

  return (
    <div className="breadcrumbs hidden items-center gap-2 text-xs uppercase text-primary xl:flex">
      <Link href="/">
        <FiHome size={20} />
      </Link>
      <ul className="pl-0">
        {crumbs.map((crumb, i) =>
          i < crumbs.length - 1 ? (
            crumb.name === locale ? null : (
              <li key={crumb.name}>
                <Link
                  prefetch={false}
                  href={`/${crumb.path}`}
                  className="font-bold underline underline-offset-2 hover:text-secondary"
                >
                  {crumb.name}
                </Link>
              </li>
            )
          ) : (
            <li key={crumb.name} className="select-none">
              {crumb.name}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
