import SearchBar from '@/components/Service/SearchBar';
import ServiceSelector from '@/components/Service/ServiceSelector';
import initTranslations from '@/app/i18n';
import { WelcomeBlockServices } from '@/components/WelcomeBlock/WelcomeBlock';
import HowToBegin from '@/components/HowTo/HowToBegin';
import HowToUse from '@/components/HowTo/HowToUse';
import CardGrid, { CardGridServices } from '@/components/CardGrid/CardGrid';
import FAQ from '@/components/FAQ/FAQ';
import BlogPreview from '@/components/Blog/BlogPreview';
import { getLatestThreeArticles } from '@/lib/sanity';
import Script from 'next/script';

interface Metadata {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: Metadata) {
  return {
    title: 'Instagram Highlights Viewer & Downloader - IG Anonymous',
    description:
      'Your ultimate solution for anonymous Instagram highlight viewing and seamless downloading. Enjoy IG highlights viewing discreetly with our secure and intuitive platform.',
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
          name: 'AnonyPro Instagram Highlight Viewer',
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
              Instagram Highlights Viewer
            </h1>
            <h2>
              View & download IG highlights anonymously
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
          translations={t('home:section_four', {
            returnObjects: true,
          })}
        />
      </section>
      <section className="mt-32 w-full">
        <CardGridServices
          heading="What Makes Our Highlights Viewer Different?"
          item_one={{
            title: 'View & Download',
            body: 'Easily view and save content. Explore freely, then download your favorites for offline access anytime.',
          }}
          item_two={{
            title: 'View Highlights Anonymously',
            body: 'Explore IG highlights discreetly. Browse anonymously and freely view highlights without leaving a trace. Enjoy private browsing without compromising privacy.',
          }}
          item_three={{
            title: 'Reliability & Speed',
            body: 'Experience dependable performance and rapid IG highlights viewing. Enjoy swift and consistent functionality for seamless user experience.',
          }}
          item_four={{
            title: 'Favorite Users',
            body: 'Stay connected with preferred creators by favoriting them and never miss their updates. Customize your experience effortlessly.',
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
                'How does AnonyPro ensure anonymity when viewing IG story highlights?',
              answer:
                'AnonyPro uses advanced encryption techniques to ensure that your identity remains completely anonymous when viewing Instagram story highlights. Your IP address and other identifying information are masked to protect your privacy, making it a secure IG highlights viewer.',
            },
            faq_two: {
              question:
                'Can I anonymously check out Instagram story highlights using AnonyPro?',
              answer:
                'Yes, AnonyPro enables you to discreetly view Instagram story highlights without any user knowing. Simply input the profile username, and AnonyPro will securely fetch and display the highlights, maintaining your privacy.',
            },
            faq_three: {
              question:
                'Is it legal to view Instagram story highlights anonymously using AnonyPro?',
              answer:
                'Yes, it is legal to view Instagram story highlights anonymously using AnonyPro. Our tool operates within the terms of service of Instagram and respects the privacy of both users and their content. AnonyPro is designed to be a lawful and ethical IG highlights viewer.',
            },
            faq_four: {
              question:
                'Will the users whose story highlights I view anonymously be notified?',
              answer:
                'No, users will not be notified when you view their story highlights anonymously using AnonyPro. Your viewing activity remains completely private, allowing you to explore content without leaving any traces. AnonyPro ensures discreet browsing as an IG highlights viewer.',
            },
            faq_five: {
              question:
                'Is AnonyPro compatible with smartphones for anonymous IG story highlights viewing?',
              answer:
                'Absolutely, AnonyPro seamlessly operates on mobile devices, allowing you to privately explore Instagram story highlights on your phone or tablet. Access AnonyPro via your mobile browser for discreet browsing wherever you are.',
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
