import Image from 'next/image';
import React from 'react';
import LinkMenu from './LinkMenu';
import LanguagePicker from './LanguagePicker';
import Link from 'next/link';
import { HeaderSearchBar } from '../Service/SearchBar';
import BRAND from '@/lib/static';

interface Props {
  headerData: {
    company: {
      dropdown_name: string;
      links: { display_name: string; href: string }[];
    };
    resources: {
      dropdown_name: string;
      links: { display_name: string; href: string }[];
    };
    contact_button_text: string;
  };
}

const Header: React.FC<Props> = ({ headerData }) => {
  const { company, resources, contact_button_text } = headerData;

  return (
    <div className="flex w-full justify-center lg:px-5 lg:pt-5">
      <div className="flex w-full max-w-[1280px] flex-col justify-between gap-4 bg-base-200 bg-opacity-25 px-8 pt-4 lg:h-[84px] lg:flex-row lg:rounded-btn lg:py-6">
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
        <HeaderSearchBar />
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="flex items-center justify-center gap-4">
            <LinkMenu
              dropdownName={company.dropdown_name}
              links={company.links}
            />
            <LinkMenu
              dropdownName={resources.dropdown_name}
              links={resources.links}
            />
          </div>
          <div className="flex items-center justify-center gap-4">
            <LanguagePicker />
            <Link
              href="/support"
              className=" hidden px-4 text-[1rem] lg:inline-flex"
            >
              <button className="btn btn-accent font-normal text-white">
                {contact_button_text}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
