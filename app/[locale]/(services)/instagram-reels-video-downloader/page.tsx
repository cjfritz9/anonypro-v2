import SearchBar from '@/components/Service/SearchBar';
import ServiceSelector from '@/components/Service/ServiceSelector';
import initTranslations from '@/app/i18n';
import WelcomeBlock, {
  WelcomeBlockServices,
} from '@/components/WelcomeBlock/WelcomeBlock';
import HowToBegin from '@/components/HowTo/HowToBegin';
import HowToUse from '@/components/HowTo/HowToUse';
import CardGrid, { CardGridServices } from '@/components/CardGrid/CardGrid';
import FAQ from '@/components/FAQ/FAQ';
import BlogPreview from '@/components/Blog/BlogPreview';
import { getLatestThreeArticles } from '@/lib/sanity';
import Script from 'next/script';
import BRAND from '@/lib/static';

interface Metadata {
  params: {
    locale: string;
  };
}

export async function generateMetadata() {
  return {
    title: 'Instagram Reels Video Download 1080p - IG Anonymous',
    description:
      'AnonyPro is #1 for Instagram reels downloading. Explore anonymously, save in 1080p, and enjoy Instagram while ensuring 100% anonymity.',
  };
}

export default async function Home({ params: { locale } }: Metadata) {
  const { t } = await initTranslations(locale, ['home', 'common']);
  const articles = await getLatestThreeArticles();

  return (
    <main className="mt-12 flex w-full max-w-[1280px] flex-col items-center lg:mt-24">
      <Script id="main-schema" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'AnonyPro Instagram Reels Video Downloader',
          applicationCategory: 'LifestyleApplication',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        })}
      </Script>
      <section className="flex w-full max-w-[720px] flex-col items-center">
        <div className="flex w-full max-w-[576px] flex-col items-center gap-10">
          <div className="flex max-w-[576px] flex-col gap-10 text-center">
            <h1 className="text-[32px] font-[500] leading-[44px] lg:text-[56px] lg:leading-[66px]">
              Instagram Reels Download
            </h1>
            <h2>
              Download IG Reels anonymously
              <br />
              (without anyone knowing)
            </h2>
            <SearchBar />
          </div>
        </div>
        <div className="mt-16 w-full max-w-[720px]">
          <ServiceSelector
            displayNames={t('service_selector.button_names', {
              returnObjects: true,
            })}
          />
        </div>
      </section>
      <section className="mt-32 w-full">
        <WelcomeBlockServices
          titles={['Surf Reels', 'Anonymously View', 'Download & Inspect']}
        />
      </section>
      {/* <section className="mt-32 w-full">
        <HowToBegin
          translations={t('home:section_three', {
            returnObjects: true,
          })}
        />
      </section> */}
      <section className="mt-32 w-full">
        <HowToUse
          translations={{
            heading: 'How to Use Our IG Reels Downloader?',
            item_one: t('home:section_four.item_one', { returnObjects: true }),
            item_two: t('home:section_four.item_two', { returnObjects: true }),
            item_three: t('home:section_four.item_three', {
              returnObjects: true,
            }),
          }}
        />
      </section>
      <section className="mt-32 w-full">
        <CardGridServices
          heading="What Makes Our Reels Downloader Different?"
          item_one={{
            title: 'View & Download',
            body: 'Easily explore and download IG reels. Navigate effortlessly, then save your favorites in high-definition for anytime, anywhere access, ensuring uninterrupted enjoyment.',
          }}
          item_two={{
            title: 'Download Reels Anonymously',
            body: ' Privately explore IG reels. Anonymously download in high definition and browse without leaving any digital footprint. Enjoy easy viewing without sacrificing privacy.',
          }}
          item_three={{
            title: 'Reliability & Speed',
            body: 'Encounter reliable performance and swift Instagram reel downloads. Experience consistent functionality for effortless browsing, ensuring a seamless user experience every time.',
          }}
          item_four={{
            title: 'Favorite Users',
            body: 'Stay in touch with favored creators. Easily prioritize reel downloads, ensuring you never miss updates from your preferred accounts. Tailor your browsing experience effortlessly.',
          }}
        />
      </section>
      <section className="mt-32 w-full">
        <FAQ
          translations={{
            heading: 'Frequently Asked Questions',
            subheading:
              'Watch and download content seamlessly the constraints of account registration.',
            faq_one: {
              question:
                ' How does AnonyPro maintain privacy when downloading Instagram reels?',
              answer:
                'AnonyPro uses advanced encryption techniques to protect user anonymity while downloading Instagram reels, ensuring privacy throughout the process.',
            },
            faq_two: {
              question:
                'Can I download Instagram reels anonymously with AnonyPro?',
              answer:
                'Yes, AnonyPro enables anonymous downloading of Instagram reels, ensuring your identity remains hidden throughout the process.',
            },
            faq_three: {
              question:
                'Is it lawful to download Instagram reels anonymously using AnonyPro?',
              answer:
                "Yes, AnonyPro operates within Instagram's terms of service, respecting user rights and privacy while facilitating anonymous reel downloads.",
            },
            faq_four: {
              question:
                'Will Instagram reel creators receive notifications when downloaded anonymously?',
              answer:
                'No, AnonyPro ensures discreet downloading, preventing notifications to reel creators, preserving user privacy.',
            },
            faq_five: {
              question:
                'Can I use AnonyPro for anonymous Instagram reel downloads on mobile devices?',
              answer:
                'Absolutely! AnonyPro seamlessly extends its functionality to mobile devices, enabling anonymous Instagram reel downloads on smartphones and tablets.',
            },
          }}
        />
      </section>
      <section className="mt-32 w-full">
        <BlogPreview
          articles={articles}
          heading={t('home:section_seven.heading')}
        />
      </section>
    </main>
  );
}
