import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  FaFacebook,
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaLinkedinIn,
  FaTwitter,
} from 'react-icons/fa6';

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

const Profile: React.FC<Props> = ({ data }) => {
  const { name, bio, profilePic, socialLinks, titles } = data;

  return (
    <div className="flex w-full max-w-[600px] flex-col items-center">
      <figure className="mb-10 flex h-[310px] w-[310px] items-center justify-center rounded-full bg-gradient-to-b from-[#E09B3D] via-[#C21975] via-80% to-[#7024C4]">
        <Image
          priority
          src={profilePic.asset.url}
          alt={`${name}'s Author Photo`}
          height={360}
          width={360}
          className="h-[300px] w-[300px] rounded-full"
        />
      </figure>
      <div>
        <h2 className="mb-6 text-4xl text-center font-semibold">{name}</h2>
        {titles && titles[0] && (
          <div className="wrap mb-8 flex justify-center gap-4">
            {titles.map((title, i) => (
              <div
                key={i}
                className={`${i % 2 === 0 ? 'bg-base-100' : 'badge-accent'} badge rounded-sm p-4 text-white`}
              >
                {title}
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center gap-4 mb-6">
          {socialLinks && socialLinks[0].Facebook && (
            <Link href={socialLinks[0].Facebook}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-base-100">
                <FaFacebookF size={24} />
              </div>
            </Link>
          )}
          {socialLinks && socialLinks[0].Twitter && (
            <Link href={socialLinks[0].Twitter}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-base-100">
                <FaTwitter size={24} />
              </div>
            </Link>
          )}
          {socialLinks && socialLinks[0].Linkedin && (
            <Link href={socialLinks[0].Linkedin}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-base-100">
                <FaLinkedinIn size={24} />
              </div>
            </Link>
          )}
          {socialLinks && socialLinks[0].Instagram && (
            <Link href={socialLinks[0].Instagram}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-base-100">
                <FaInstagram size={24} />
              </div>
            </Link>
          )}
        </div>
        <div className="flex flex-col gap-4 text-center text-slate-200">
          {bio.split('\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
