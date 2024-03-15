import initTranslations from '@/app/i18n';
import Image from 'next/image';
import React from 'react';
import { PiPlusSquareBold } from 'react-icons/pi';
import arrowOne from '@/public/assets/arrow-1.svg';
import arrowTwo from '@/public/assets/arrow-2.svg';
import { IconType } from 'react-icons';
import { VscPlayCircle } from 'react-icons/vsc';
import { RiFolderDownloadLine } from 'react-icons/ri';
import CircleWithIcon from '../UI/CircleWithIcon';

interface Props {
  translations: {
    heading: string;
    body: string;
    item_one: {
      title: string;
      body: string;
    };
    item_two: {
      title: string;
      body: string;
    };
    item_three: {
      title: string;
      body: string;
    };
  };
}

const WelcomeBlock: React.FC<Props> = ({ translations }) => {
  const { heading, body, item_one, item_two, item_three } = translations;
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-[48px] bg-base-100 px-10 py-[70px]">
      <div className="mb-16 flex w-full flex-col items-center">
        <h3 className="mb-6 text-center text-[44px] font-[500] leading-[44px]">
          {heading}
        </h3>
        <p className="text-center text-[18px] italic text-slate-300 xl:px-12">
          {body}
        </p>
      </div>
      <div className="flex w-full flex-col items-center justify-between xl:flex-row">
        <Item
          title={item_one.title}
          body={item_one.body}
          iconBgColor="bg-base-300"
          Icon={PiPlusSquareBold}
        />
        <Image
          className="min-h-[310px] rotate-90 xl:rotate-0"
          src={arrowOne}
          alt="vector arrow"
        />
        <Item
          title={item_two.title}
          body={item_two.body}
          iconBgColor="bg-accent"
          Icon={VscPlayCircle}
        />
        <Image
          className="min-h-[310px] rotate-90 xl:rotate-0"
          src={arrowTwo}
          alt="vector arrow"
        />
        <Item
          title={item_three.title}
          body={item_three.body}
          iconBgColor="bg-base-300"
          Icon={RiFolderDownloadLine}
        />
      </div>
    </div>
  );
};

interface ItemProps {
  /**
   * Tailwind/Daisy UI color
   */
  iconBgColor: string;
  Icon: IconType;
  title: string;
  body: string;
}

const Item: React.FC<ItemProps> = ({ iconBgColor, Icon, title, body }) => {
  return (
    <div className="flex max-w-[224px] flex-col items-center text-center">
      <CircleWithIcon styles={iconBgColor} Icon={Icon} />
      <h4 className="mb-4 mt-6 text-[20px] font-[500]">{title}</h4>
      <p className="text-[1rem] font-[300]">{body}</p>
    </div>
  );
};

export default WelcomeBlock;
