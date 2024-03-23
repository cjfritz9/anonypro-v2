import initTranslations from '@/app/i18n';
import BRAND from '@/lib/static';
import React from 'react';

interface Params {
  params: {
    locale: string;
  };
}

export async function generateMetadata() {
  
  return {
    title: `Terms of Service | ${BRAND.name} | Anonymous Instagram Story Viewer (View IG Anon: IGAnony)`,
  };
}

const ToSPage: React.FC<Params> = async ({ params: { locale } }) => {
  const { t } = await initTranslations(locale, ['tos']);

  return (
    <main className="mt-12 flex w-full max-w-[1280px] flex-col items-center lg:mt-24">
      <div className="prose flex w-full max-w-[720px] flex-col text-left prose-p:my-2">
        <div>
          <h1 className="mb-2 text-center text-4xl font-[500] text-white  lg:text-[56px]">
            {t('tos:heading', { anonypro: 'AnonyPro' })}
          </h1>
          <h2 className="mt-2 text-center text-xl lg:text-2xl font-normal text-white">
            {t('tos:subheading', {
              date: new Date().toLocaleDateString(locale, {
                month: 'long',
                day: '2-digit',
                year: 'numeric',
              }),
            })}
          </h2>
          {(
            t('tos:main', {
              anonypro: 'AnonyPro',
              url: 'www.anonypro.com',
              br: '\n',
            }) as string
          )
            .split('\n')
            .map((p, i) => (
              <p key={i} className={p.startsWith('-') ? 'ml-4' : 'ml-0'}>
                {p}
              </p>
            ))}
        </div>
        <div>
          <h3 className="text-3xl font-semibold">
            {t('tos:general.heading', { anonypro: 'AnonyPro' })}
          </h3>
          {(
            t('tos:general.body', {
              anonypro: 'AnonyPro',
              br: '\n',
            }) as string
          )
            .split('\n')
            .map((p, i) => (
              <p key={i} className={p.startsWith('-') ? 'ml-4' : 'ml-0'}>
                {p}
              </p>
            ))}
        </div>
        <div>
          <h3 className="text-3xl font-semibold">
            {t('tos:privacy.heading', { anonypro: 'AnonyPro' })}
          </h3>
          {(
            t('tos:privacy.body', {
              anonypro: 'AnonyPro',
              br: '\n',
            }) as string
          )
            .split('\n')
            .map((p, i) => (
              <p key={i} className={p.startsWith('-') ? 'ml-4' : 'ml-0'}>
                {p}
              </p>
            ))}
        </div>
        <div>
          <h3 className="text-3xl font-semibold">
            {t('tos:cookies.heading', { anonypro: 'AnonyPro' })}
          </h3>
          {(
            t('tos:cookies.body', {
              anonypro: 'AnonyPro',
              br: '\n',
            }) as string
          )
            .split('\n')
            .map((p, i) => (
              <p key={i} className={p.startsWith('-') ? 'ml-4' : 'ml-0'}>
                {p}
              </p>
            ))}
        </div>
        <div>
          <h3 className="text-3xl font-semibold">
            {t('tos:disclaimer.heading', { anonypro: 'AnonyPro' })}
          </h3>
          {(
            t('tos:disclaimer.body', {
              anonypro: 'AnonyPro',
              br: '\n',
            }) as string
          )
            .split('\n')
            .map((p, i) => (
              <p key={i} className={p.startsWith('-') ? 'ml-4' : 'ml-0'}>
                {p}
              </p>
            ))}
        </div>
        <div>
          <h3 className="text-3xl font-semibold">
            {t('tos:change_of_terms.heading', { anonypro: 'AnonyPro' })}
          </h3>
          {(
            t('tos:change_of_terms.body', {
              anonypro: 'AnonyPro',
              br: '\n',
            }) as string
          )
            .split('\n')
            .map((p, i) => (
              <p key={i} className={p.startsWith('-') ? 'ml-4' : 'ml-0'}>
                {p}
              </p>
            ))}
        </div>
        <div>
          <h3 className="text-3xl font-semibold">
            {t('tos:content_liability.heading', { anonypro: 'AnonyPro' })}
          </h3>
          {(
            t('tos:content_liability.body', {
              anonypro: 'AnonyPro',
              br: '\n',
            }) as string
          )
            .split('\n')
            .map((p, i) => (
              <p key={i} className={p.startsWith('-') ? 'ml-4' : 'ml-0'}>
                {p}
              </p>
            ))}
        </div>
      </div>
    </main>
  );
};

export default ToSPage;
