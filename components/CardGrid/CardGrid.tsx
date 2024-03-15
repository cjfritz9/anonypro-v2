import React from 'react';
import CircleWithIcon from '../UI/CircleWithIcon';
import { FiUnlock } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { RiFolderDownloadLine } from 'react-icons/ri';

interface Props {
  translations: {
    heading: string;
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
    item_four: {
      title: string;
      body: string;
    };
  };
}

const CardGrid: React.FC<Props> = ({ translations }) => {
  const { heading, item_one, item_two, item_three, item_four } = translations;
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-[48px] bg-base-100 bg-opacity-50 px-10 py-[70px]">
      <h3 className="mb-6 text-center text-[44px] font-[500] leading-[44px]">
        {heading}
      </h3>
      <div className="mt-8 flex w-full flex-col items-center gap-8 lg:flex-row">
        <Card title={item_one.title} body={item_one.body} Icon={FiUnlock} />
        <Card
          title={item_two.title}
          body={item_two.body}
          Icon={RiFolderDownloadLine}
        />
      </div>
      <div className="mt-8 flex w-full flex-col items-center gap-8 lg:flex-row">
        <Card
          title={item_three.title}
          body={item_three.body}
          Icon={RiFolderDownloadLine}
        />
        <Card
          title={item_four.title}
          body={item_four.body}
          Icon={RiFolderDownloadLine}
        />
      </div>
    </div>
  );
};

interface CardProps {
  Icon: IconType;
  title: string;
  body: string;
}

const Card: React.FC<CardProps> = ({ Icon, title, body }) => {
  return (
    <div className="min-h-[348px] rounded-[48px] bg-base-100 p-8 lg:w-[48%] lg:max-w-[584px]">
      <div className="flex flex-col">
        <CircleWithIcon Icon={Icon} styles="bg-base-300" />
        <h4 className="my-4 text-[20px] font-[500]">{title}</h4>
        <p className="text-[14px] font-[300]">{body}</p>
      </div>
    </div>
  );
};

export default CardGrid;
