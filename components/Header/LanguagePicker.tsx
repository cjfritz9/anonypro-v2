'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { PiGlobeLight } from 'react-icons/pi';
import i18nConfig from '@/i18n.config';

const languages = [
  'en',
  'it',
  'fr',
  'uk',
  'nl',
  'ru',
  'ar',
  'da',
  'sv',
  'id',
  'ko',
  'no',
  'es',
  'tr',
  'de',
  'pt',
  'tl'
];

const LanguagePicker: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();
  const nameGenerator = new Intl.DisplayNames(currentLocale, {
    type: 'language'
  });
  const displayName = nameGenerator.of(currentLocale);

  const handleClick = (newLocale: string) => {
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `ANONYPRO_LOCALE=${newLocale};expires=${expires};path=/`;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      //@ts-ignore
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  return (
    <div className='dropdown w-full'>
      <div
        tabIndex={0}
        role='button'
        className='btn w-full m-1 font-normal bg-base-200 bg-opacity-50 text-white'
      >
        <PiGlobeLight className='text-[20px]' />
        {displayName}
        <div className='flex flex-col'>
          <IoChevronUp size={12} />
          <IoChevronDown size={12} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className='dropdown-content z-[1] menu p-2 mt-[16px] shadow bg-[#3E3186] rounded-box w-full flex flex-col'
      >
        {languages.map((languageCode) => {
          const nameGenerator = new Intl.DisplayNames(languageCode, {
            type: 'language'
          });
          const displayName = nameGenerator.of(languageCode);
          return (
            <li
              key={languageCode}
              onClick={() => handleClick(languageCode)}
              className='cursor-pointer py-2'
            >
              {displayName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LanguagePicker;
