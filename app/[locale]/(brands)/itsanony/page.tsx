import BrandPage from '@/components/BrandPage/BrandPage';
import Link from 'next/link';

interface Metadata {
  params: {
    locale: string;
  };
}

export async function generateMetadata() {
  const name = 'ItsAnony';

  return {
    title: `${name} - Anonymous Instagram Story Viewer`,
  };
}

export default function ItsAnony({ params: { locale } }: Metadata) {
  return (
    <BrandPage
      locale={locale}
      headings={{
        main: 'ItsAnony Instagram Story Viewer',
        sub: 'Watch & download Instagram stories anonymously',
      }}
      description={{
        title: 'Go Anonymous on Instagram with ItsAnony',
        body: (
          <p className="text-center text-[18px] italic text-slate-300 xl:px-12">
            ItsAnony is a robust tool tailored for{' '}
            <Link href="https://anonypro.com/" className="underline">
              anonymous viewing
            </Link>
            {' '}and downloading of Instagram stories, alongside access to
            highlights. It emphasizes user privacy by facilitating discreet
            content access without notifying the account holder. With ItsAnony,
            users can seamlessly engage with Instagram stories and highlights
            while maintaining anonymity and privacy.
          </p>
        ),
      }}
      howToUseTitle="How to Use ItsAnony Instagram Stories Viewer?"
      features={{ heading: 'Features Of ItsAnony' }}
      FAQs={{
        heading: 'Frequently Asked Questions',
        faq_one: {
          question: 'Can you explain what ItsAnony does?',
          answer:
            'ItsAnony provides a discreet way to watch Instagram stories. It allows users to view stories anonymously, ensuring their viewing activities remain private.',
        },
        faq_two: {
          question: 'What are the steps to start using ItsAnony?',
          answer:
            "To begin using ItsAnony, simply head to its website, type in the Instagram username of the account you're interested in, and access their stories without ever revealing your identity.",
        },
        faq_three: {
          question: 'Is using ItsAnony free?',
          answer:
            'Yes, ItsAnony is completely free to use. There are no hidden fees for its anonymity services.',
        },
        faq_four: {
          question:
            "Will the Instagram user know I've watched their stories using ItsAnony?",
          answer:
            "No, ItsAnony guarantees anonymity so the user will not know you've viewed their stories.",
        },
      }}
    />
  );
}
