import initTranslations from '@/app/i18n';
import BRAND from '@/lib/static';
import React from 'react';

interface Params {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: Params) {
  const { t } = await initTranslations(locale, ['policies']);

  return {
    title: t('policies:meta_title', { anonypro: 'AnonyPro' }),
  };
}

const PoliciesPage: React.FC<Params> = async ({ params: { locale } }) => {
  const { t } = await initTranslations(locale, ['policies']);

  return (
    <main className="mt-12 flex w-full max-w-[1280px] flex-col items-center lg:mt-24" suppressHydrationWarning>
      <div className="prose flex w-full max-w-[720px] flex-col text-left prose-p:my-2">
        <div>
          <h2 className="mb-2 text-3xl font-semibold">
            {t('policies:main.heading')}
          </h2>
          <h3>
            {t('policies:main.subheading', {
              date: new Date('11/26/22').toLocaleDateString(locale, {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              }),
            })}
          </h3>
          {(
            t('policies:main.body', {
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
          <h2 className="text-3xl font-semibold">
            {t('policies:interpretation.heading')}
          </h2>
          <h3>{t('policies:interpretation.section_one.heading')}</h3>
          {(
            t('policies:interpretation.section_one.body', {
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
          <h3>{t('policies:interpretation.section_two.heading')}</h3>
          {(
            t('policies:interpretation.section_two.body', {
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
          <h2 className="text-3xl font-semibold">
            {t('policies:personal_data.heading')}
          </h2>
          <h3 className="text-2xl font-semibold">
            {t('policies:personal_data.subheading')}
          </h3>
          <h3>{t('policies:personal_data.section_one.heading')}</h3>
          {(
            t('policies:personal_data.section_one.body', {
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
          <h3>{t('policies:personal_data.section_two.heading')}</h3>
          {(
            t('policies:personal_data.section_two.body', {
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
          <h3>{t('policies:personal_data.section_three.heading')}</h3>
          {(
            t('policies:personal_data.section_three.body', {
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
          <h3>{t('policies:personal_data.section_four.heading')}</h3>
          {(
            t('policies:personal_data.section_four.body', {
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
          <h3>{t('policies:personal_data.section_five.heading')}</h3>
          {(
            t('policies:personal_data.section_five.body', {
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
          <h3>{t('policies:personal_data.section_six.heading')}</h3>
          {(
            t('policies:personal_data.section_six.body', {
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
          <h3>{t('policies:personal_data.section_seven.heading')}</h3>
          {(
            t('policies:personal_data.section_seven.body', {
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
          <h3>{t('policies:personal_data.section_eight.heading')}</h3>
          {(
            t('policies:personal_data.section_eight.body', {
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
          <h2 className="text-3xl font-semibold">
            {t('policies:childrens_privacy.heading')}
          </h2>
          {(
            t('policies:childrens_privacy.body', {
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
          <h2 className="text-3xl font-semibold">
            {t('policies:links.heading')}
          </h2>
          {(
            t('policies:links.body', {
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
          <h2 className="text-3xl font-semibold">
            {t('policies:changes.heading')}
          </h2>
          {(
            t('policies:changes.body', {
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
          <h2 className="text-3xl font-semibold">
            {t('policies:contact.heading')}
          </h2>
          {(
            t('policies:contact.body', {
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
          <a className="ml-4" href="mailto:support@anonypro.com">
            support@anonypro.com
          </a>
        </div>
      </div>
    </main>
  );
};

export default PoliciesPage;
