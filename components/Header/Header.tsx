import BRAND from '@/public/brand/static';
import Image from 'next/image';
import React from 'react';
import LinkMenu from './LinkMenu';
import LanguagePicker from './LanguagePicker';

const companyLinks = [
  {
    displayName: 'About Us',
    href: 'about us'
  },
  {
    displayName: 'Support',
    href: 'support'
  },
  {
    displayName: 'Terms of Service',
    href: 'terms of service'
  },
  {
    displayName: 'Policies',
    href: 'policies'
  }
];

const resourcesLinks = [
  {
    displayName: 'Blog',
    href: '/blog'
  },
  {
    displayName: 'Story Viewer',
    href: '/category/story-viewer'
  }
];

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
    <div className='w-full flex justify-center pt-5'>
      <div className='lg:h-[84px] py-6 w-full gap-4 max-w-[1200px] rounded-btn lg:rounded-[90px] flex-col flex lg:flex-row justify-between bg-base-200 px-8 bg-opacity-25'>
        <div className='flex gap-4 items-center justify-center'>
          <Image
            src={BRAND.logoSm}
            height={40}
            width={40}
            alt='anonypro logo'
            className='w-10 h-10'
          />
          <p className='text-[32px] font-semibold'>anonypro</p>
        </div>
        <div className='flex flex-col-reverse lg:flex-row'>
          <div className='flex gap-4 items-center justify-center'>
            <LinkMenu
              dropdownName={company.dropdown_name}
              links={company.links}
            />
            <LinkMenu
              dropdownName={resources.dropdown_name}
              links={resources.links}
            />
          </div>
          <div className='flex gap-4 items-center justify-center'>
            <LanguagePicker />
            <button className='hidden lg:inline-flex btn font-normal btn-accent text-white text-[1rem] px-4'>
              {contact_button_text}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
