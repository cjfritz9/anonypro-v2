'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import LanguagePicker from '../Header/LanguagePicker';
import BRAND from '@/lib/static';

const Footer: React.FC = () => {
  return (
    <div className="mt-16 flex w-full justify-center lg:mt-0 lg:px-5 lg:py-20">
      <div className="flex w-full max-w-[1280px] flex-col justify-between gap-4 bg-[#544790] bg-opacity-35 px-8 pt-12 lg:flex-row lg:rounded-[48px] lg:px-[70px] lg:py-[52px] lg:pt-4">
        <div className="flex h-full w-full flex-col justify-between gap-6 text-center md:min-w-[512px] lg:gap-0 lg:text-left">
          <div className="flex w-full flex-col items-center justify-between gap-6 md:flex-row lg:gap-0">
            <Link href="/" className="flex items-center justify-center gap-4">
              <Image
                src={BRAND.logoSm}
                height={40}
                width={40}
                alt="anonypro logo"
                className="h-10 w-10"
              />
              <p className="text-[32px] font-semibold">anonypro</p>
            </Link>
            <div className="wrap flex gap-4">
              <Link href="/blog">Resources</Link>
              <Link href="/company">Company</Link>
              <Link href="/support">Support</Link>
            </div>
          </div>
          <p className="self-baseline">
            AnonyPro is not connected with Instagram. We do not host any of the
            Instagram content on our servers. All content belongs to the content
            authors. Download is available for informational purposes only.
          </p>
        </div>
        <div className="divider divider-horizontal xl:mx-[88px]" />
        <div className="flex flex-col items-center gap-8 p-4 md:min-w-[336px] lg:items-start">
          <LanguagePicker reverse />
          <p className="text-xs">@2024 Anonypro. All Rights Reserved</p>
          <div className="flex gap-2 text-xs">
            <Link href="/policies">Security</Link>
            <div className="divider divider-primary divider-horizontal mx-0 hidden opacity-50 lg:block" />
            <Link href="/policies">Your Privacy</Link>
            <div className="divider divider-primary divider-horizontal mx-0 hidden opacity-50 lg:block" />
            <Link href="/terms-of-service">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
