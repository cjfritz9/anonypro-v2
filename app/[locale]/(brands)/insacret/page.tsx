import BrandPage from '@/components/BrandPage/BrandPage';
import Link from 'next/link';

interface Metadata {
  params: {
    locale: string;
  };
}

export async function generateMetadata() {
  const name = 'Insacret';

  return {
    title: `${name} - Anonymous Instagram Story Viewer`,
  };
}

export default function Insacret({ params: { locale } }: Metadata) {
  return (
    <BrandPage
      locale={locale}
      headings={{
        main: 'Insacret Instagram Story Viewer',
        sub: 'Watch & download Instagram stories anonymously',
      }}
      description={{
        title: 'Go Anonymous on Instagram with Insacret',
        body: (
          <p className="text-center text-[18px] italic text-slate-300 xl:px-12">
            Insacret is a discreet tool designed for{' '}
            <Link href="https://anonypro.com/" className="underline">
              anonymous viewing
            </Link>{' '}
            and downloading of Instagram stories, as well as accessing
            highlights. It emphasizes user privacy by enabling discrete content
            access without alerting the account owner. With Insacret, users can
            effortlessly enjoy Instagram stories and highlights while
            maintaining anonymity and privacy.
          </p>
        ),
      }}
      howToUseTitle="How to Use Insacret Instagram Stories Viewer?"
      features={{ heading: 'Features Of Insacret' }}
      FAQs={{
        heading: 'Frequently Asked Questions',
        faq_one: {
          question: 'What purpose does Insacret serve?',
          answer:
            "Insacret is a digital tool that enables you to watch Instagram stories while keeping your identity hidden. It's ideal for viewing content discreetly without alerting the story poster.",
        },
        faq_two: {
          question: 'How do I start using Insacret for anonymous viewing?',
          answer:
            'Accessing Insacret is simple. Go to the Insacret website, input the Instagram handle of the account you’re curious about, and you can start watching their stories anonymously.',
        },
        faq_three: {
          question: 'Is there a fee associated with using Insacret?',
          answer:
            'No, Insacret is offered free of charge. You can enjoy watching stories anonymously without any cost.',
        },
        faq_four: {
          question:
            'Will the user be aware if I view their stories through Insacret?',
          answer:
            'No, Insacret ensures that your viewing is completely anonymous. The account owner will have no way of knowing that you viewed their stories.',
        },
      }}
    />
  );
}
