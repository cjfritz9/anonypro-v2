'use client';

import React, { useState } from 'react';
import { FaCircleArrowDown } from 'react-icons/fa6';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

interface Props {
  sections: any[];
}

const ScrollToSection: React.FC<Props> = ({ sections }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-12 flex w-full flex-col items-center">
      <div className="w-full max-w-[720px] rounded-[48px] bg-[#43427F] bg-opacity-65 px-8 py-8 text-white lg:px-20">
        <h3 className="my-12 text-center text-4xl font-semibold text-white">
          In This Article:
        </h3>

        <ul className="my-4 flex flex-col gap-4">
          {sections.length > 4
            ? isExpanded
              ? sections.map((section: any) => (
                  <SectionHeading
                    key={section._key}
                    title={section.children[0].text}
                    sectionId={section._key}
                  />
                ))
              : sections
                  .slice(0, 4)
                  .map((section: any) => (
                    <SectionHeading
                      key={section._key}
                      title={section.children[0].text}
                      sectionId={section._key}
                    />
                  ))
            : null}
        </ul>
        {!isExpanded ? (
          <div
            className="flex w-full cursor-pointer items-center justify-center gap-2 hover:text-accent"
            onClick={() => setIsExpanded(true)}
          >
            <p>Show More</p>
            <BiChevronDown size={20} />
          </div>
        ) : (
          <div
            className="flex w-full cursor-pointer items-center justify-center gap-2 hover:text-accent"
            onClick={() => setIsExpanded(false)}
          >
            <p>Show Less</p>
            <BiChevronUp size={20} />
          </div>
        )}
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
