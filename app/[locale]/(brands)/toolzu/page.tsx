import BrandPage from '@/components/BrandPage/BrandPage';
import Link from 'next/link';

interface Metadata {
  params: {
    locale: string;
  };
}

export async function generateMetadata() {
  const name = 'Toolzu';

  return {
    title: `${name} - Anonymous Instagram Story Viewer`,
  };
}

export default function Toolzu({ params: { locale } }: Metadata) {
  return (
    <BrandPage
      locale={locale}
      headings={{
        main: 'Toolzu Instagram Story Viewer',
        sub: 'Watch & download Instagram stories anonymously',
      }}
      description={{
        title: 'Go Anonymous on Instagram with Toolzu',
        body: (
          <p className="text-center text-[18px] italic text-slate-300 xl:px-12">
            Toolzu is a versatile tool allowing{' '}
            <Link href="https://anonypro.com/" className="underline">
              anonymous viewing
            </Link>{' '}
            of Instagram stories, as well as accessing highlights. It
            prioritizes user privacy by ensuring discreet content access without
            alerting the account owner. With Toolzu, users can seamlessly engage
            with Instagram stories and highlights while maintaining anonymity
            and privacy.
          </p>
        ),
      }}
      howToUseTitle="How to Use Toolzu Instagram Stories Viewer?"
      features={{ heading: 'Features Of Toolzu' }}
      FAQs={{
        heading: 'Frequently Asked Questions',
        faq_one: {
          question: 'What is Toolzu?',
          answer:
            'Toolzu is a service that lets users discreetly watch Instagram stories. It offers anonymity to those who prefer to browse social media without leaving a digital footprint.',
        },
        faq_two: {
          question:
            'What steps should I follow to use Toolzu for anonymous story watching?',
          answer:
            "To use Toolzu, navigate to its website, type in the username of the Instagram account you're curious about, and access their stories. The platform ensures that your activity remains unseen by the story posters.",
        },
        faq_three: {
          question: 'Does Toolzu cost anything to use?',
          answer:
            'No, Toolzu is completely free to use. There are no fees, so you can browse Instagram stories anonymously at no charge.',
        },
        faq_four: {
          question:
            'Can the Instagram user detect that I watched their story using Toolzu?',
          answer:
            'No, when you use Toolzu, your identity remains hidden. The user whose stories you watch will not know you were there.',
        },
      }}
    />
  );
}
