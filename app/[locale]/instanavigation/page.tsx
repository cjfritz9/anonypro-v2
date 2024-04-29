import SearchBar from '@/components/Service/SearchBar';
import ServiceSelector from '@/components/Service/ServiceSelector';
import initTranslations from '@/app/i18n';
import WelcomeBlock from '@/components/WelcomeBlock/WelcomeBlock';
import HowToBegin from '@/components/HowTo/HowToBegin';
import HowToUse from '@/components/HowTo/HowToUse';
import CardGrid from '@/components/CardGrid/CardGrid';
import FAQ from '@/components/FAQ/FAQ';
import BlogPreview from '@/components/Blog/BlogPreview';
import { getLatestThreeArticles } from '@/lib/sanity';
import Script from 'next/script';
import BRAND from '@/lib/static';
import BrandPage from '@/components/BrandPage/BrandPage';
import Link from 'next/link';

interface Metadata {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: Metadata) {
  const { t } = await initTranslations(locale, ['home']);

  return {
    title: t('home:meta_title', { anonypro: BRAND.name }),
    description: t('home:meta_desc'),
  };
}

export default function InstaNavigation({ params: { locale } }: Metadata) {
  return (
    <BrandPage
      locale={locale}
      headings={{
        main: 'InstaNavigation Instagram Story Viewer',
        sub: 'Watch & download Instagram stories anonymously',
      }}
      description={{
        title: 'Go Anonymous on Instagram with Instanavigation',
        body: (
          <p>
            What is InstaNavigation? It’s the revolutionary tool reshaping how
            you <Link href="/">navigate Instagram anonymously</Link>. Powered by
            state-of-the-art technology and dedicated to safeguarding user
            privacy, InstaNavigation sets out to revolutionize your Instagram
            viewing experience. Dive into the captivating realm of Instagram
            Stories with unprecedented ease and enjoyment!
          </p>
        ),
      }}
      features={{ heading: 'Features Of Instanavigation' }}
      FAQs={{
        heading: 'Frequently Asked Questions',
        faq_one: {
          question: 'What is instaNavigation?',
          answer:
            'instaNavigation is a tool that allows users to watch Instagram stories anonymously. It enables you to view stories without the story poster knowing that you have seen them.',
        },
        faq_two: {
          question:
            'How do I utilize instaNavigation for viewing Instagram stories without being seen?',
          answer:
            "To make use of instaNavigation, you need to access the service's website, input the Instagram username of the individual whose stories you wish to view secretly, and the platform will then show you the current stories that you can watch without revealing your identity.",
        },
        faq_three: {
          question: 'Is instaNavigation free to use?',
          answer:
            'Yes, instaNavigation is completely free to use. There are no charges for watching stories anonymously through their platform.',
        },
        faq_four: {
          question:
            'Can the account holder detect that I viewed their story using instaNavigation?',
          answer:
            'No, the account holder cannot detect that you viewed their story when you use instaNavigation. Their technology ensures your viewing is completely invisible to the story poster.',
        },
        faq_five: {
          question: 'Is employing instaNavigation permitted by law?',
          answer:
            "The use of services like instaNavigation for anonymous viewing of Instagram stories is typically within legal boundaries; however, it is essential to employ such tools with consideration for ethical standards and in compliance with the social media platform's usage policies.",
        },
      }}
    />
  );
}
