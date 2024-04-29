import BrandPage from '@/components/BrandPage/BrandPage';
import Link from 'next/link';

interface Metadata {
  params: {
    locale: string;
  };
}

export async function generateMetadata() {
  const name = 'Imginn';

  return {
    title: `${name} - Anonymous Instagram Story Viewer`,
  };
}

export default function Imginn({ params: { locale } }: Metadata) {
  return (
    <BrandPage
      locale={locale}
      headings={{
        main: 'Imginn Instagram Story Viewer',
        sub: 'Watch & download Instagram stories anonymously',
      }}
      description={{
        title: 'Go Anonymous on Instagram with Imginn',
        body: (
          <p className="text-center text-[18px] italic text-slate-300 xl:px-12">
            What is Imginn? Imginn offers a convenient Instagram story viewer
            tool, allowing users to{' '}
            <Link href="https://anonypro.com/" className="underline">
              explore stories anonymously
            </Link>
            . With its user-friendly interface, Imginn enables discreet browsing
            and viewing without leaving any traces, providing a seamless
            Instagram experience.
          </p>
        ),
      }}
      howToUseTitle="How to Use Imginn Instagram Stories Viewer?"
      features={{ heading: 'Features Of Imginn' }}
      FAQs={{
        heading: 'Frequently Asked Questions',
        faq_one: {
          question: 'Can you describe what Imginn does?',
          answer:
            'Imginn is essentially a covert viewing portal for Instagram stories. It allows you to access and view stories without alerting the uploader, offering a silent spectator experience.',
        },
        faq_two: {
          question: 'How do I start viewing stories on Imginn?',
          answer:
            "Getting started is a snap. Just scoot over to the Imginn website, key in the username of the Instagram user you're curious about, and watch their stories unfold, all without them knowing a thing.",
        },
        faq_three: {
          question: 'Is there a fee to access Imginn?',
          answer:
            'Absolutely not! Imginn is available at no cost. You can enjoy anonymous browsing of Instagram stories without any financial commitment.',
        },
        faq_four: {
          question:
            'Is there any trace left when I watch someone’s story using Imginn?',
          answer:
            'With Imginn, your viewing is ghost-like. The story posters won’t have any inkling that you’ve watched their stories, as the platform leaves no digital footprints behind.',
        },
      }}
    />
  );
}
