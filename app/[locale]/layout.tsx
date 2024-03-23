import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import initTranslations from '../i18n';
import i18nConfig from '@/i18n.config';
import Providers from '../providers';
import Footer from '@/components/Footer/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Anonymous Instagram Story Viewer (View IG Anon: IGAnony)',
  description:
    'AnonyPro is a free anonymous Instagram story viewer which allows you to anonymously view IG stories and download them without anyone knowing. Go full IgAnony.',
};

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
        <body className={poppins.className}>
          <Header
            headerData={t('header', {
              aboutUs: '/about-us',
              support: '/support',
              termsOfService: '/terms-of-service',
              policies: '/policies',
              blog: '/blog',
              storyViewer: '/category/story-viewer',
              postHighlights: '/category/post-highlights',
              creatingPosts: '/category/creating-posts',
              returnObjects: true,
            })}
          />
          <div className="flex min-h-[100dvh] flex-col items-center px-4 py-4 lg:px-24 lg:py-12">
            {children}
          </div>
          <Footer />
        </body>
        <GoogleAnalytics gaId="G-XYZ" />
      </html>
    </Providers>
  );
}
