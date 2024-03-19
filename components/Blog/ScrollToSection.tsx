'use client';

import React, { useState } from 'react';
import downArrow from '@/public/assets/down-arrow.svg';
import Image from 'next/image';
import { FaCircleArrowDown } from 'react-icons/fa6';

interface Props {
  sections: any[];
}

const ScrollToSection: React.FC<Props> = ({ sections }) => {
  return (
    <div className="mb-12 flex w-full flex-col items-center">
      <div className="w-full max-w-[720px] rounded-[48px] bg-[#43427F] bg-opacity-65 px-8 py-8 text-white lg:px-20">
        <h3 className="my-12 text-center text-4xl font-semibold text-white">
          In This Article:
        </h3>

        <ul className="my-4 flex flex-col gap-4">
          {sections.map((section: any) => (
            <SectionHeading
              key={section._key}
              title={section.children[0].text}
              sectionId={section._key}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

interface SectionHeadingProps {
  title: string;
  sectionId: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  sectionId,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleClick = () => {
    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <li
      className="flex w-full cursor-pointer items-center gap-4 py-2 text-left"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex h-5 w-5 items-center justify-center rounded-full bg-white">
        <FaCircleArrowDown
          size={24}
          className={`absolute ${isHovered ? 'text-accent' : 'text-base-300'}`}
        />
      </div>
      <p>{title}</p>
    </li>
  );
};

export default ScrollToSection;
