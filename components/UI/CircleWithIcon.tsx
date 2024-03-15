import React from 'react';
import { IconType } from 'react-icons';

interface Props {
  /**
   * Tailwind/Daisy UI color
   */
  Icon: IconType;
  styles: string;
}

const CircleWithIcon: React.FC<Props> = ({ Icon, styles }) => {
  return (
    <div
      className={`${styles} flex h-20 w-20 items-center justify-center rounded-full`}
    >
      <Icon className="text-[40px] text-white" />
    </div>
  );
};

export default CircleWithIcon;
