import BrandPage from '@/components/BrandPage/BrandPage';
import Link from 'next/link';

interface Metadata {
  params: {
    locale: string;
  };
}

export async function generateMetadata() {
  const name = 'SSSInstagram';

  return {
    title: `${name} - Anonymous Instagram Story Viewer`,
  };
}

export default function SSSInstagram({ params: { locale } }: Metadata) {
  return (
    <BrandPage
      locale={locale}
      headings={{
        main: 'SSSInstagram Instagram Story Viewer',
        sub: 'Watch & download Instagram stories anonymously',
      }}
      description={{
        title: 'Go Anonymous on Instagram with SSSInstagram',
        body: (
          <p className="text-center text-[18px] italic text-slate-300 xl:px-12">
            SSSInstagram provides a discreet platform for browsing and
            downloading Instagram stories, as well as viewing highlights without
            drawing attention. It prioritizes user privacy by ensuring silent
            content access, allowing users to explore Instagram content without
            notifying the account owner. With SSSInstagram, users can maintain
            their anonymity while{' '}
            <Link href="https://anonypro.com/" className="underline">
              enjoying Instagram stories and highlights
            </Link>
            .
          </p>
        ),
      }}
      howToUseTitle="How to Use SSSInstagram Instagram Stories Viewer?"
      features={{ heading: 'Features Of SSSInstagram' }}
      FAQs={{
        heading: 'Frequently Asked Questions',
        faq_one: {
          question: 'What functionality does SSSInstagram offer?',
          answer:
            'SSSInstagram provides a secure way for users to view Instagram stories without appearing in the viewers list, thus preserving their anonymity while they browse.',
        },
        faq_two: {
          question:
            'What steps should I follow to anonymously view stories on SSSInstagram?',
          answer:
            'Visit the SSSInstagram site, search for the Instagram handle whose stories you want to watch, and access them silently. The process is designed to protect your privacy at every step.',
        },
        faq_three: {
          question:
            'How much does it cost to access the features of SSSInstagram?',
          answer:
            'SSSInstagram is available at no cost. There are absolutely no charges for using this service to watch Instagram stories.',
        },
        faq_four: {
          question: 'Does SSSInstagram leave any trace of my viewing activity?',
          answer:
            'Absolutely not. SSSInstagram ensures that your viewing habits are kept confidential, without notifying the story uploader of your presence.',
        },
      }}
    />
  );
}
