import initTranslations from '@/app/i18n';
import Image from 'next/image';
import React from 'react';
import aboutOne from '@/public/assets/about-one.png';
import aboutTwo from '@/public/assets/about-two.svg';
import Link from 'next/link';
import BRAND from '@/lib/static';

interface Params {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: Params) {
  const { t } = await initTranslations(locale, ['about']);

  return {
    title: t('about:meta_title', { anonypro: BRAND.name }),
  };
}

const AboutUsPage: React.FC<Params> = async ({ params: { locale } }) => {
  const { t } = await initTranslations(locale, ['about']);

  return (
    <main className="mt-12 flex w-full flex-col items-center xl:mt-24">
      <div className="mb-24 flex w-full max-w-[1280px] flex-col-reverse items-center justify-between xl:flex-row">
        <div className="prose text-center xl:text-left">
          <h1 className="text-4xl font-semibold text-white xl:text-[44px]">
            {t('about:section_one.heading', { anonypro: 'AnonyPro' })}
          </h1>
          {(
            t('about:section_one.body', {
              anonypro: 'AnonyPro',
              br: '\n',
            }) as string
          )
            .split('\n')
            .map((p, i) => (
              <p key={i}>{p}</p>
            ))}
        </div>
        <Image
          src={aboutOne}
          alt=""
          height={416}
          width={478}
          className="mb-12 rounded-lg"
        />
      </div>
      <div className="flex w-[100dvw] flex-col items-center justify-center bg-[#4D428B] xl:flex-row">
        <div className="flex w-full max-w-[1280px] flex-col items-center justify-center px-4 py-12 xl:flex-row xl:justify-between xl:py-32">
          <Image
            src={aboutTwo}
            alt=""
            height={416}
            width={478}
            className="mb-12"
          />
          <div className="prose text-center xl:text-left">
            <h2 className="mb-2 text-4xl font-semibold text-white xl:text-[44px]">
              {t('about:section_two.heading', { anonypro: 'AnonyPro' })}
            </h2>
            <h3 className="text-[24px] font-normal text-white">
              {t('about:section_two.subheading')}
            </h3>
            {(
              t('about:section_two.body', {
                anonypro: 'AnonyPro',
                br: '\n',
              }) as string
            )
              .split('\n')
              .map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            <Link href="/support">{t('about:section_two.support')}</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutUsPage;
