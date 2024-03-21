import React from 'react';
import Profile from '../Profile';
import AuthorArticles from '../AuthorArticles';

interface Props {
  data: {
    name: string;
    slug: string;
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
    articles: any[];
  };
}

const AuthorPage: React.FC<Props> = ({ data }) => {
  const { name, slug, articles } = data;
  return (
    <div className="mt-12 lg:mt-20 flex flex-col items-center">
      <Profile data={data} />
      <AuthorArticles articles={articles} author={{ name, slug }} />
    </div>
  );
};

export default AuthorPage;
