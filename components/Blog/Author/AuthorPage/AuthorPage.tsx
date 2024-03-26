import React from 'react';
import Profile from '../Profile';
import AuthorArticles from '../AuthorArticles';
import Script from 'next/script';

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
    <div className="mt-12 flex flex-col items-center lg:mt-20">
      <Script id="author-schema" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          mainEntity: {
            '@type': 'Person',
            name: name,
            alternateName: slug,
            identifier: slug,
            description: data.bio,
            image: data.profilePic.asset.url,
          },
        })}
      </Script>
      <Profile data={data} />
      <AuthorArticles articles={articles} author={{ name, slug }} />
    </div>
  );
};

export default AuthorPage;
