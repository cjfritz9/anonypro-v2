import BrandPage from '@/components/BrandPage/BrandPage';
import Link from 'next/link';

interface Metadata {
  params: {
    locale: string;
  };
}

export async function generateMetadata() {
  const name = 'iGram';

  return {
    title: `${name} - Anonymous Instagram Story Viewer`,
  };
}

export default function iGram({ params: { locale } }: Metadata) {
  return (
    <BrandPage
      locale={locale}
      headings={{
        main: 'iGram Instagram Story Viewer',
        sub: 'Watch & download Instagram stories anonymously',
      }}
      description={{
        title: 'Go Anonymous on Instagram with iGram',
        body: (
          <p className="text-center text-[18px] italic text-slate-300 xl:px-12">
            iGram is a flexible tool designed for discreetly viewing and
            downloading Instagram stories and{' '}
            <Link href="https://anonypro.com/" className="underline">
              accessing highlights anonymously
            </Link>
            . It prioritizes user privacy by allowing discreet content access
            without notifying the account owner. With iGram, users can
            effortlessly interact with Instagram stories and highlights while
            ensuring anonymity and privacy.
          </p>
        ),
      }}
      howToUseTitle="How to Use iGram Instagram Stories Viewer?"
      features={{ heading: 'Features Of iGram' }}
      FAQs={{
        heading: 'Frequently Asked Questions',
        faq_one: {
          question: 'Can you explain what iGram does?',
          answer:
            'iGram is a digital service that allows you to view Instagram stories without revealing your presence, providing a way to stay informed on social feeds discreetly.',
        },
        faq_two: {
          question:
            'What steps do I need to take to use iGram for anonymous story viewing?',
          answer:
            'To start using iGram, visit the official website, input the desired Instagram username, and the platform will enable you to view stories anonymously. This ensures you remain invisible to the story poster.',
        },
        faq_three: {
          question: 'Is iGram a free service?',
          answer:
            'Yes, iGram is completely free. You can enjoy watching Instagram stories anonymously without any cost.',
        },
        faq_four: {
          question:
            "Will anyone be able to tell that I've viewed their stories via iGram?",
          answer:
            'No, iGram keeps your activity completely private. The user whose stories you view will not be able to detect your presence.',
        },
      }}
    />
  );
}
