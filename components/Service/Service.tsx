'use client';

import React, { useContext } from 'react';
import Profile from '../Profile/Profile';
import { InstagramContext } from '../Context/InstagramProvider';

const Service: React.FC = () => {
  const { igProfile } = useContext(InstagramContext);

  return <div className="mt-20 w-full">{igProfile && <Profile />}</div>;
};

export default Service;
