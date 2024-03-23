import initTranslations from '@/app/i18n';
import SupportForm from '@/components/Support/SupportForm';
import BRAND from '@/lib/static';
import Link from 'next/link';
import React from 'react';
import { MdOutlineMailOutline } from 'react-icons/md';

interface Params {
  params: {
    locale: string;
  };
}

export async function generateMetadata() {
  
  return {
    title: `Support | ${BRAND.name} | Anonymous Instagram Story Viewer (View IG Anon: IGAnony)`,
  };
}

const SupportPage: React.FC<Params> = async ({ params: { locale } }) => {
  const { t } = await initTranslations(locale, ['support']);

  return (
    <main className="mt-12 flex w-full max-w-[1280px] flex-col items-center lg:mt-24">
      <div className="flex w-full flex-col items-center justify-between gap-8 xl:flex-row xl:items-start">
        <SupportForm />
        <div className="prose max-w-[600px] text-center xl:text-left">
          <h1 className="text-3xl font-semibold text-white xl:text-[44px]">
            {t('support:section_one.info.heading')}
          </h1>
          {(
            t('support:section_one.info.body', {
              anonypro: 'AnonyPro',
              br: '\n',
            }) as string
          )
            .split('\n')
            .map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          <Link
            href="mailto:support@anonypro.com"
            target="_blank"
            className="mt-8 flex w-full rounded-[19px] bg-[#383A76] bg-opacity-70 p-4 text-white no-underline xl:p-8"
          >
            <MdOutlineMailOutline size={40} className="mr-5" />
            <div>
              <p className="m-0 text-left">
                {t('support:section_one.info.contact_methods.email')}
              </p>
              <p className="mb-0 mt-2 text-xl font-semibold xl:mt-5 xl:text-2xl">
                support@anonypro.com
              </p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SupportPage;
