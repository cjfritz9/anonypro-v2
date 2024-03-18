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
  'tl',
];

interface Props {
  reverse?: boolean;
}

const LanguagePicker: React.FC<Props> = ({ reverse }) => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();
  const nameGenerator = new Intl.DisplayNames(currentLocale, {
    type: 'language',
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
    <div
      className={`dropdown ${reverse ? 'dropdown-top' : 'dropdown-bottom'} w-full min-w-[140px]`}
    >
      <div
        tabIndex={0}
        role="button"
        className="btn m-1 w-full lg:w-[140px] bg-base-200 bg-opacity-50 font-normal text-white"
      >
        <PiGlobeLight className="text-[20px]" />
        {displayName}
        <div className="flex flex-col">
          <IoChevronUp size={12} />
          <IoChevronDown size={12} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content flex-nowrap z-[1] mt-[16px] h-[196px] w-full lg:w-[140px] overflow-y-auto rounded-box bg-[#3E3186] p-2 shadow"
      >
        {languages.map((languageCode) => {
          const nameGenerator = new Intl.DisplayNames(languageCode, {
            type: 'language',
          });
          const displayName = nameGenerator.of(languageCode);
          return (
            <li
              key={languageCode}
              onClick={() => handleClick(languageCode)}
              className="cursor-pointer p-2"
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
