import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import initTranslations from '../i18n';
import i18nConfig from '@/i18n.config';
import Providers from '../providers';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

const i18nNamespaces = ['common', 'home'];

interface ProjectData {
  params: {
    locale: string;
  };
  children: React.ReactNode;
}

export default async function RootLayout({
  children,
  params: { locale },
}: ProjectData) {
  const { t, resources } = await initTranslations(locale, ['common']);

  return (
    <Providers
      translationProps={{
        resources,
        locale,
        namespaces: i18nNamespaces,
      }}
    >
      <html lang={locale}>
        <body className={poppins.className}>
          <Header headerData={t('header', { returnObjects: true })} />
          <div className="flex min-h-[100dvh] flex-col items-center px-4 py-4 lg:px-24 lg:py-12">
            {children}
          </div>
        </body>
      </html>
    </Providers>
  );
}
