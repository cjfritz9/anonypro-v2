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
    title: `Policies | ${BRAND.name} | Anonymous Instagram Story Viewer (View IG Anon: IGAnony)`,
  };
}

const PoliciesPage: React.FC<Params> = async ({ params: { locale } }) => {
  const { t } = await initTranslations(locale, ['policies']);

  return (
    <main
      className="mt-12 flex w-full max-w-[1280px] flex-col items-center lg:mt-24"
    >
      <div className="prose flex w-full max-w-[720px] flex-col text-left prose-p:my-2">
        <div>
          <h2 className="text-3xl font-semibold">
            {t('policies:general.heading', { anonypro: 'AnonyPro' })}
          </h2>
          {(
            t('policies:general.body', {
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
            {t('policies:service.heading', { anonypro: 'AnonyPro' })}
          </h2>
          {(
            t('policies:service.body', {
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
            {t('policies:payment.heading', { anonypro: 'AnonyPro' })}
          </h2>
          {(
            t('policies:payment.body', {
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
            {t('policies:privacy.heading', { anonypro: 'AnonyPro' })}
          </h2>
          {(
            t('policies:privacy.body', {
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
            {t('policies:refunds.heading', { anonypro: 'AnonyPro' })}
          </h2>
          {(
            t('policies:refunds.body', {
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
            {t('policies:usage.heading', { anonypro: 'AnonyPro' })}
          </h2>
          {(
            t('policies:usage.body', {
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
            {t('policies:copyright.heading', { anonypro: 'AnonyPro' })}
          </h2>
          {(
            t('policies:copyright.body', {
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
            {t('policies:instagram.heading', { anonypro: 'AnonyPro' })}
          </h2>
          {(
            t('policies:instagram.body', {
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
            {t('policies:liabilities.heading', { anonypro: 'AnonyPro' })}
          </h2>
          {(
            t('policies:liabilities.body', {
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
            {t('policies:disclaimer.heading', { anonypro: 'AnonyPro' })}
          </h2>
          {(
            t('policies:disclaimer.body', {
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
            {t('policies:change_of_terms.heading', { anonypro: 'AnonyPro' })}
          </h2>
          {(
            t('policies:change_of_terms.body', {
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

export default PoliciesPage;
