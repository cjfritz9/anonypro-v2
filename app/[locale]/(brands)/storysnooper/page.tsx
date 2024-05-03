import BrandPage from '@/components/BrandPage/BrandPage';
import Link from 'next/link';

interface Metadata {
  params: {
    locale: string;
  };
}

export async function generateMetadata() {
  const name = 'StorySnooper';

  return {
    title: `${name} - Anonymous Instagram Story Viewer`,
  };
}

export default function StorySnooper({ params: { locale } }: Metadata) {
  return (
    <BrandPage
      locale={locale}
      headings={{
        main: 'StorySnooper Instagram Story Viewer',
        sub: 'Watch & download Instagram stories anonymously',
      }}
      description={{
        title: 'Go Anonymous on Instagram with StorySnooper',
        body: (
          <p className="text-center text-[18px] italic text-slate-300 xl:px-12">
            StorySnooper is a comprehensive tool designed for{' '}
            <Link href="https://anonypro.com/" className="underline">
              discreetly viewing
            </Link>
            {' '}and downloading Instagram stories, including highlights. It
            prioritizes user privacy by allowing anonymous access to content
            without alerting the account owner. With StorySnooper, users can
            effortlessly stay updated on Instagram stories and highlights while
            maintaining complete anonymity.
          </p>
        ),
      }}
      howToUseTitle="How to Use StorySnooper Instagram Stories Viewer?"
      features={{ heading: 'Features Of StorySnooper' }}
      FAQs={{
        heading: 'Frequently Asked Questions',
        faq_one: {
          question: 'What does StorySnooper do?',
          answer:
            'StorySnooper is an online tool that lets you watch Instagram stories without the story uploader knowing you viewed them.',
        },
        faq_two: {
          question: 'How do I use StorySnooper to watch stories anonymously?',
          answer:
            'Simply go to the StorySnooper website, put in the Instagram username of the user whose stories you want to view, and access them anonymously. The process is straightforward and private.',
        },
        faq_three: {
          question: 'Is there a charge to use StorySnooper?',
          answer:
            'No, StorySnooper is a free service. There are no costs involved for anonymous story viewing.',
        },
        faq_four: {
          question:
            'Can anyone tell if I’ve watched their stories using StorySnooper?',
          answer:
            'No, StorySnooper keeps your identity completely hidden when you view stories. The user will not be notified of your viewing.',
        },
      }}
    />
  );
}
