import BrandPage from '@/components/BrandPage/BrandPage';
import Link from 'next/link';

interface Metadata {
  params: {
    locale: string;
  };
}

export async function generateMetadata() {
  const name = 'FastDL';

  return {
    title: `${name} - Anonymous Instagram Story Viewer`,
  };
}

export default function FastDL({ params: { locale } }: Metadata) {
  return (
    <BrandPage
      locale={locale}
      headings={{
        main: 'FastDL Instagram Story Viewer',
        sub: 'Watch & download Instagram stories anonymously',
      }}
      description={{
        title: 'Go Anonymous on Instagram with FastDL',
        body: (
          <p className="text-center text-[18px] italic text-slate-300 xl:px-12">
            FastDL is a user-friendly tool designed for{' '}
            <Link href="https://anonypro.com/" className="underline">
              anonymous viewing and downloading of Instagram stories
            </Link>
            , including access to highlights. It prioritizes user privacy by
            enabling discrete content access without alerting the account owner.
            With FastDL, users can effortlessly enjoy Instagram stories and
            highlights while maintaining anonymity and privacy.
          </p>
        ),
      }}
      howToUseTitle="How to Use FastDL Instagram Stories Viewer?"
      features={{ heading: 'Features Of FastDL' }}
      FAQs={{
        heading: 'Frequently Asked Questions',
        faq_one: {
          question: 'What does FastDL offer?',
          answer:
            'FastDL is a platform that lets you watch Instagram stories without revealing your identity. It’s designed for users who wish to keep their viewing private.',
        },
        faq_two: {
          question:
            'How do I get started with FastDL for anonymous story watching?',
          answer:
            'Head over to the FastDL website, enter the Instagram username of the person whose stories you want to view, and the service will allow you to access them anonymously.',
        },
        faq_three: {
          question: 'Is there any cost to using FastDL?',
          answer:
            'No, FastDL is free to use. You can watch stories anonymously without any charges.',
        },
        faq_four: {
          question:
            "Will the Instagram user know I've seen their stories through FastDL?",
          answer:
            'No, FastDL ensures complete anonymity, so no one will be aware that you viewed their stories.',
        },
      }}
    />
  );
}
