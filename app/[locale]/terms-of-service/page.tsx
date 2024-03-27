import initTranslations from '@/app/i18n';
import BRAND from '@/lib/static';
import React from 'react';

interface Params {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: Params) {
  const { t } = await initTranslations(locale, ['tos']);

  return {
    title: t('tos:meta_title', { anonypro: 'AnonyPro' }),
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
          <h2 className="mt-2 text-center text-xl font-normal text-white lg:text-2xl">
            {t('tos:subheading', {
              date: new Date('11/26/22').toLocaleDateString(locale, {
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
            {t('tos:interpretations.heading')}
          </h3>
          <h3>{t('tos:interpretations.section_one.heading')}</h3>
          {(
            t('tos:interpretations.section_one.body', {
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
          <h3>{t('tos:interpretations.section_two.heading')}</h3>
          {(
            t('tos:interpretations.section_two.body', {
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
            {t('tos:relationship.heading')}
          </h3>
          {(
            t('tos:relationship.body', {
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
            {t('tos:notes.heading')}
          </h3>
          {(
            t('tos:notes.body', {
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
            {t('tos:ack.heading')}
          </h3>
          {(
            t('tos:ack.body', {
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
            {t('tos:links.heading')}
          </h3>
          {(
            t('tos:links.body', {
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
            {t('tos:termination.heading')}
          </h3>
          {(
            t('tos:termination.body', {
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
            {t('tos:liability.heading')}
          </h3>
          {(
            t('tos:liability.body', {
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
            {t('tos:as_is.heading')}
          </h3>
          {(
            t('tos:as_is.body', {
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
            {t('tos:gov.heading')}
          </h3>
          {(
            t('tos:gov.body', {
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
            {t('tos:disputes.heading')}
          </h3>
          {(
            t('tos:disputes.body', {
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
            {t('tos:eu.heading')}
          </h3>
          {(
            t('tos:eu.body', {
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
            {t('tos:us.heading')}
          </h3>
          {(
            t('tos:us.body', {
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
            {t('tos:severability.heading')}
          </h3>
          {(
            t('tos:severability.body', {
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
            {t('tos:translation.heading')}
          </h3>
          {(
            t('tos:translation.body', {
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
            {t('tos:changes.heading')}
          </h3>
          {(
            t('tos:changes.body', {
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
            {t('tos:contact.heading')}
          </h3>
          {(
            t('tos:contact.body', {
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
            <a className='ml-4' href='mailto:support@anonypro.com'>support@anonypro.com
          </a>
        </div>
      </div>
    </main>
  );
};

export default ToSPage;
