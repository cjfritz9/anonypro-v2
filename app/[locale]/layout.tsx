import { GoogleAnalytics } from '@next/third-parties/google';
import { Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import initTranslations from '../i18n';
import i18nConfig from '@/i18n.config';
import Providers from '../providers';
import Footer from '@/components/Footer/Footer';
import BRAND from '@/lib/static';
import Canonical from '@/components/Canonical/Canonical';
import Favorites from '@/components/Favorites/Favorites';
import Announcement from '@/components/Header/Announcement';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export async function generateMetadata({ params: { locale } }: any) {
  const { t } = await initTranslations(locale, ['home']);

  return {
    title: t('home:meta_title', { anonypro: BRAND.name }),
    description: t('home:meta_desc'),
  };
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

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
        namespaces: i18nConfig.namespaces,
      }}
    >
      <html lang={locale} className="overflow-x-clip">
        <head>
          <Canonical locale={locale} />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9924000383649266"
            crossOrigin="anonymous"
          ></script>
        </head>
        <body className={poppins.className}>
          {/* <Announcement /> */}
          <Header
            headerData={t('header', {
              aboutUs: '/about-us',
              support: '/support',
              termsOfService: '/terms-of-service',
              policies: '/policies',
              blog: '/blog',
              glossary: '/category/glossary',
              instagramCaptions: '/category/instagram-captions',
              quotes: '/category/quotes',
              returnObjects: true,
            })}
          />
          <div className="flex min-h-[100dvh] flex-col items-center px-4 py-4 lg:px-24 lg:py-12">
            {children}
          </div>
          <Favorites />
          <Footer />
        </body>
        <GoogleAnalytics gaId="G-325NSSQH59" />
      </html>
    </Providers>
  );
}
