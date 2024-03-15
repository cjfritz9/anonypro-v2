import React from 'react';
import CircleWithIcon from '../UI/CircleWithIcon';
import { MdOutlineTravelExplore, MdPersonOff } from 'react-icons/md';
import { TbEyeCheck } from 'react-icons/tb';
import { IoCameraReverseOutline } from 'react-icons/io5';
import { TfiCommentsSmiley } from 'react-icons/tfi';

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
    item_five: {
      title: string;
      body: string;
    };
  };
}

const HowToBegin: React.FC<Props> = ({ translations }) => {
  const { heading, item_one, item_two, item_three, item_four, item_five } =
    translations;
  return (
    <div className="flex w-full flex-col items-center justify-center py-[70px]">
      <h3 className="mb-16 max-w-[720px] text-center text-4xl font-[500] leading-[44px] xl:text-[44px]">
        {heading}
      </h3>
      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-col gap-8 xl:flex-row">
          <Item
            title={item_one.title}
            body={item_one.body}
            Icon={() => (
              <CircleWithIcon
                Icon={MdPersonOff}
                styles="bg-base-300 absolute -top-2 -right-2"
              />
            )}
          />
          <Item
            title={item_two.title}
            body={item_two.body}
            Icon={() => (
              <CircleWithIcon
                Icon={MdOutlineTravelExplore}
                styles="bg-base-300 absolute -top-2 -right-2"
              />
            )}
          />
          <Item
            title={item_three.title}
            body={item_three.body}
            Icon={() => (
              <CircleWithIcon
                Icon={TbEyeCheck}
                styles="bg-base-300 absolute -top-2 -right-2"
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-8 xl:flex-row">
          <Item
            title={item_four.title}
            body={item_four.body}
            Icon={() => (
              <CircleWithIcon
                Icon={IoCameraReverseOutline}
                styles="bg-base-300 absolute -top-2 -right-2"
              />
            )}
          />{' '}
          <Item
            title={item_five.title}
            body={item_five.body}
            Icon={() => (
              <CircleWithIcon
                Icon={TfiCommentsSmiley}
                styles="bg-base-300 absolute -top-2 -right-2"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

interface ItemProps {
  Icon: React.FC;
  title: string;
  body: string;
}

const Item: React.FC<ItemProps> = ({ Icon, title, body }) => {
  return (
    <div className="relative flex h-fit min-h-[280px] w-full flex-col overflow-clip rounded-[48px] bg-base-100 px-6 pb-4 text-center">
      <Icon />
      <div className="mt-24">
        <h4 className="mb-2 text-[20px] font-[500]">{title}</h4>
        <p className="text-[14px] font-[300]">{body}</p>
      </div>
    </div>
  );
};

export default HowToBegin;
