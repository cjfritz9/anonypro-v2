import React from 'react';
import CircleWithIcon from '../UI/CircleWithIcon';
import { FiHeart, FiUnlock } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { RiFolderDownloadLine } from 'react-icons/ri';
import { TbEyeCheck } from 'react-icons/tb';
import { IoCompassOutline } from 'react-icons/io5';

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
    <div className="flex w-full flex-col items-center justify-center rounded-[48px] bg-base-100 bg-opacity-45 px-2 py-[70px] lg:px-10">
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
          Icon={TbEyeCheck}
        />
        <Card
          title={item_four.title}
          body={item_four.body}
          Icon={IoCompassOutline}
        />
      </div>
    </div>
  );
};

interface FeaturesProps {
  heading: string;
}

export const BrandPageFeatures: React.FC<FeaturesProps> = ({ heading }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-[48px] bg-base-100 bg-opacity-45 px-6 py-[70px] lg:px-10">
      <h3 className="mb-6 text-center text-[44px] font-[500] leading-[44px]">
        {heading}
      </h3>
      <div className="mt-8 flex w-full flex-col items-center gap-8 lg:flex-row">
        <FeaturesCard title="Anonymous Viewer" Icon={FiUnlock} />
        <FeaturesCard title="Downloader" Icon={RiFolderDownloadLine} />
      </div>
      <div className="mt-8 flex w-full flex-col items-center gap-8 lg:flex-row">
        <FeaturesCard title="Highlights Viewer" Icon={TbEyeCheck} />
        <FeaturesCard title="Favorite Users" Icon={FiHeart} />
      </div>
    </div>
  );
};

interface ServicesProps {
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
}

export const CardGridServices: React.FC<ServicesProps> = ({
  heading,
  item_one,
  item_two,
  item_three,
  item_four,
}) => {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-[48px] bg-base-100 bg-opacity-45 px-2 py-[70px] lg:px-10">
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
          Icon={TbEyeCheck}
        />
        <Card title={item_four.title} body={item_four.body} Icon={FiHeart} />
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
    <div className="min-h-[348px] rounded-[48px] bg-base-100 bg-opacity-45 p-8 lg:w-[48%] lg:max-w-[584px]">
      <div className="flex flex-col">
        <CircleWithIcon Icon={Icon} styles="bg-base-300" />
        <h4 className="my-4 text-[20px] font-[500]">{title}</h4>
        <p className="text-[14px] font-[300]">{body}</p>
      </div>
    </div>
  );
};

interface FeaturesCardProps {
  Icon: IconType;
  title: string;
}

const FeaturesCard: React.FC<FeaturesCardProps> = ({ Icon, title }) => {
  return (
    <div className="w-full rounded-[48px] bg-base-100 bg-opacity-45 p-8 lg:w-[48%] lg:max-w-[584px]">
      <div className="flex flex-col gap-8 xl:flex-row">
        <CircleWithIcon Icon={Icon} styles="bg-base-300" />
        <h4 className="my-4 text-[32px] font-[500]">{title}</h4>
      </div>
    </div>
  );
};

export default CardGrid;
