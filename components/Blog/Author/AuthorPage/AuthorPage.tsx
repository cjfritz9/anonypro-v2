import React from 'react';
import Profile from '../Profile';

interface Props {
  data: {
    name: string;
    bio: string;
    profilePic: {
      asset: {
        url: string;
      };
    };
    socialLinks: {
      Facebook?: string;
      Twitter?: string;
      Instagram?: string;
      Linkedin?: string;
    }[];
    titles: string[];
  };
}

const AuthorPage: React.FC<Props> = ({ data }) => {
  return <div>
    <Profile data={data} />
  </div>;
};

export default AuthorPage;
