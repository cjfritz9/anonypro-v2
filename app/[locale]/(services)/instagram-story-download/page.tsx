import SearchBar from '@/components/Service/SearchBar';
import ServiceSelector from '@/components/Service/ServiceSelector';
import initTranslations from '@/app/i18n';
import { WelcomeBlockServices } from '@/components/WelcomeBlock/WelcomeBlock';
import HowToBegin from '@/components/HowTo/HowToBegin';
import HowToUse from '@/components/HowTo/HowToUse';
import { CardGridServices } from '@/components/CardGrid/CardGrid';
import FAQ from '@/components/FAQ/FAQ';
import BlogPreview from '@/components/Blog/BlogPreview';
import { getLatestThreeArticles } from '@/lib/sanity';
import Script from 'next/script';
import DisplayAd from '@/components/Ads/DisplayAd';

interface Metadata {
  params: {
    locale: string;
  };
}

export async function generateMetadata() {
  return {
    title: 'Instagram Story Video Download 1080p - IG Anonymous',
    description:
      'Choose AnonyPro for high-definition Instagram story downloading. Explore anonymously, save in 1080p, and stay connected effortlessly with your favorite creators.',
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
          name: 'AnonyPro Instagram Story Downloader',
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
              Instagram Story Download
            </h1>
            <h2>
              Download IG stories anonymously at 1080p
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
        <DisplayAd />
      </section>
      <section className="mt-32 w-full">
        <WelcomeBlockServices
          titles={['Surf Stories', 'Anonymously View', 'Download & Inspect']}
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
            heading: 'How to Use Our IG Story Downloader?',
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
          heading="What Makes Our Story Downloader Different?"
          item_one={{
            title: 'View & Download',
            body: 'Effortlessly browse and save stories. Explore freely, then download your favorites in 1080p for offline access anytime, ensuring you never miss a moment.',
          }}
          item_two={{
            title: 'Download Stories Anonymously',
            body: 'Explore IG stories discreetly. Download anonymously in 1080p and browse stories without leaving a trace. Enjoy private browsing without compromising privacy.',
          }}
          item_three={{
            title: 'Reliability & Speed',
            body: 'Experience dependable performance and rapid 1080p story downloading.',
          }}
          item_four={{
            title: 'Favorite Users',
            body: 'Stay connected with preferred creators by favoriting them and never miss their updates. Customize your experience effortlessly to prioritize 1080p story downloads.',
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
                'How does AnonyPro maintain privacy while downloading Instagram stories at top resolution?',
              answer:
                'AnonyPro ensures user anonymity when downloading Instagram stories in 1080p, safeguarding privacy through advanced encryption methods.',
            },
            faq_two: {
              question:
                'Does AnonyPro support anonymous downloading of Instagram stories in high definition?',
              answer:
                'Yes, AnonyPro allows discreet downloading of Instagram stories in crisp 1080p resolution, prioritizing user privacy throughout.',
            },
            faq_three: {
              question:
                'Is AnonyPro compliant with legal standards for anonymous Instagram story downloading?',
              answer:
                "AnonyPro operates within legal boundaries, respecting Instagram's terms of service and users' rights while enabling anonymous story downloading.",
            },
            faq_four: {
              question:
                'Will downloading Instagram stories anonymously with AnonyPro alert the story owners?',
              answer:
                'No, AnonyPro ensures discreet downloading, preserving user privacy without triggering alerts to the story owners.',
            },
            faq_five: {
              question:
                'Can AnonyPro be used to download Instagram stories anonymously on mobile platforms?',
              answer:
                'Yes, AnonyPro seamlessly extends its functionality to mobile devices, enabling anonymous downloading of Instagram stories in 1080p resolution on smartphones or tablets.',
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
