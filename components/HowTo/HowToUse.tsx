import React, { PropsWithChildren } from 'react';
import GetStartedButton from './GetStartedButton';

interface Props {
  translations: {
    heading: string;
    item_one: {
      title: string;
    };
    item_two: {
      title: string;
    };
    item_three: {
      title: string;
    };
  };
}

const HowToUse: React.FC<Props> = ({ translations }) => {
  const { heading, item_one, item_two, item_three } = translations;

  return (
    <div className="relative flex w-full flex-col items-center justify-center py-[70px]">
      <h3 className="mb-16 text-center text-4xl font-[500] leading-[44px] xl:text-[44px]">
        {heading}
      </h3>
      <ul className="timeline timeline-vertical absolute -left-[47%] bottom-5 h-[880px] w-full justify-between xl:timeline-horizontal xl:static xl:h-auto">
        <li className="grow">
          <div className="timeline-middle flex h-12 w-12 items-center justify-center rounded-full bg-base-100">
            <p className="text-xl font-semibold">1</p>
          </div>

          <hr className="bg-base-100" />
        </li>

        <li className="grow">
          <hr className="bg-base-100" />
          <div className="timeline-middle flex h-12 w-12 items-center justify-center rounded-full bg-accent">
            <p className="text-xl font-semibold">2</p>
          </div>

          <hr className="bg-base-100" />
        </li>

        <li className="grow">
          <hr className="bg-base-100" />
          <div className="timeline-middle flex h-12 w-12 items-center justify-center rounded-full bg-base-100">
            <p className="text-xl font-semibold">3</p>
          </div>
        </li>
      </ul>
      <div className="mt-12 flex w-full flex-col gap-8 xl:flex-row">
        <Item title={item_one.title}>
          <label className="input input-bordered pointer-events-none flex select-none items-center gap-2 rounded-md bg-base-300">
            <input type="text" className="grow" placeholder="Search" readOnly />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </Item>

        <Item title={item_two.title}>
          <label className="input input-bordered pointer-events-none flex select-none items-center gap-2 rounded-md bg-base-300">
            <input
              type="text"
              className="grow"
              readOnly
              value="instagram_user123"
            />
          </label>
        </Item>

        <Item title={item_three.title}>
          <div className="pointer-events-none flex w-[240px] select-none items-center justify-center gap-4">
            <p>480p</p>
            <p className="underline">720p</p>
            <p>1080p</p>
          </div>
        </Item>
      </div>
      <div>
        <GetStartedButton />
      </div>
    </div>
  );
};

interface ItemProps extends PropsWithChildren {
  title: string;
}

const Item: React.FC<ItemProps> = ({ title, children }) => {
  return (
    <div className="flex h-[248px] w-full flex-col items-center">
      <h4 className="mb-4">{title}</h4>
      <div className="flex h-[200px] w-full items-center justify-center rounded-[48px] bg-base-100 px-8 py-[72px] xl:mr-0">
        {children}
      </div>
    </div>
  );
};

export default HowToUse;
