import BrandPage from '@/components/BrandPage/BrandPage';
import Link from 'next/link';

interface Metadata {
  params: {
    locale: string;
  };
}

export async function generateMetadata() {
  const name = 'MollyGram';

  return {
    title: `${name} - Anonymous Instagram Story Viewer`,
  };
}

export default function MollyGram({ params: { locale } }: Metadata) {
  return (
    <BrandPage
      locale={locale}
      headings={{
        main: 'MollyGram Instagram Story Viewer',
        sub: 'Watch & download Instagram stories anonymously',
      }}
      description={{
        title: 'Go Anonymous on Instagram with MollyGram',
        body: (
          <p className="text-center text-[18px] italic text-slate-300 xl:px-12">
            MollyGram is a versatile tool for{' '}
            <Link href="https://anonypro.com/" className="underline">
              anonymously viewing and downloading Instagram stories
            </Link>
            , as well as viewing highlights. It prioritizes user privacy by
            ensuring discreet access to content without alerting the account
            holder. With MollyGram, users can enjoy Instagram stories and
            highlights while maintaining anonymity and privacy.
          </p>
        ),
      }}
      howToUseTitle="How to Use MollyGram Instagram Stories Viewer?"
      features={{ heading: 'Features Of MollyGram' }}
      FAQs={{
        heading: 'Frequently Asked Questions',
        faq_one: {
          question: 'What exactly is Mollygram?',
          answer:
            'Mollygram is a digital service that enables users to watch Instagram stories without the account owner knowing who viewed them.',
        },
        faq_two: {
          question: 'How can I start using Mollygram?',
          answer:
            'To use Mollygram, head over to its website, enter the Instagram username whose stories you want to view anonymously, and the tool handles the rest.',
        },
        faq_three: {
          question: 'Is there any cost associated with Mollygram?',
          answer:
            'Mollygram is entirely free. There are no fees for using the service to view stories anonymously.',
        },
        faq_four: {
          question:
            'Will the users know that I have viewed their stories using Mollygram?',
          answer:
            'No, Mollygram ensures that your activity remains invisible, so no one will know you’ve viewed their stories.',
        },
      }}
    />
  );
}
