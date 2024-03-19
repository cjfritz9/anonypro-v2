import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa6';

interface Props {
  data: {
    profilePic: {
      asset: {
        url: string;
      };
    };
    name: string;
    titles: string[];
    socialLinks: {
      Facebook?: string;
      Twitter?: string;
      Linkedin?: string;
      Instagram?: string;
    }[];
    bio: string;
  };
}

const AuthorCard: React.FC<Props> = ({ data }) => {
  const { name, titles, bio, profilePic, socialLinks } = data;
  console.log(socialLinks);
  return (
    <div className="relative flex max-w-[720px] flex-col items-center rounded-[48px] bg-base-100 px-10 py-12 md:flex-row">
      <figure className="my-6 flex h-[128px] w-[128px] min-w-[128px] items-center justify-center rounded-full bg-accent lg:my-0 lg:mr-8">
        <Image
          src={profilePic.asset.url}
          alt={`${name}'s profile picture`}
          height={128}
          width={128}
          className="h-[120px] w-[120px] rounded-full"
        />
      </figure>
      <div className="flex flex-col gap-2">
        <p className="text-3xl font-[500]">{name}</p>
        <p className="text-accent">{titles.join(', ')}</p>
        <p>{bio}</p>
      </div>
      <div className="absolute right-8 top-6 flex gap-2">
        {socialLinks && socialLinks[0].Facebook && (
          <Link href={socialLinks[0].Facebook}>
            <FaFacebook size={28} />
          </Link>
        )}
        {socialLinks && socialLinks[0].Twitter && (
          <Link href={socialLinks[0].Twitter}>
            <FaTwitter size={28} />
          </Link>
        )}
        {socialLinks && socialLinks[0].Linkedin && (
          <Link href={socialLinks[0].Linkedin}>
            <FaLinkedin size={28} />
          </Link>
        )}
        {socialLinks && socialLinks[0].Instagram && (
          <Link href={socialLinks[0].Instagram}>
            <FaInstagram size={28} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default AuthorCard;
