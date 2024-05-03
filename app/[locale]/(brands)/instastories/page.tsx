import BrandPage from '@/components/BrandPage/BrandPage';
import Link from 'next/link';

interface Metadata {
  params: {
    locale: string;
  };
}

export async function generateMetadata() {
  const name = 'InstaStories';

  return {
    title: `${name} - Anonymous Instagram Story Viewer`,
  };
}

export default function InstaStories({ params: { locale } }: Metadata) {
  return (
    <BrandPage
      locale={locale}
      headings={{
        main: 'InstaStories Instagram Story Viewer',
        sub: 'Watch & download Instagram stories anonymously',
      }}
      description={{
        title: 'Go Anonymous on Instagram with InstaStories',
        body: (
          <p className="text-center text-[18px] italic text-slate-300 xl:px-12">
            InstaStories is a handy tool designed for anonymous viewing of{' '}
            <Link href="https://anonypro.com/" className="underline">
              Instagram stories
            </Link>
            . It allows users to stay updated with content without revealing
            their identity to the account owner. With InstaStories, users can
            browse through stories discreetly, ensuring their privacy and
            anonymity are maintained throughout their browsing experience.
          </p>
        ),
      }}
      howToUseTitle="How to Use InstaStories Instagram Stories Viewer?"
      features={{ heading: 'Features Of InstaStories' }}
      FAQs={{
        heading: 'Frequently Asked Questions',
        faq_one: {
          question: "What's the purpose of Instastories?",
          answer:
            'Instastories is a discreet online tool crafted for browsing Instagram stories anonymously, allowing users to stay informed without disclosing their identity.',
        },
        faq_two: {
          question:
            'How can one anonymously access Instagram stories through Instastories?',
          answer:
            'To utilize Instastories, simply visit its website, input the Instagram username of the desired account, and seamlessly browse stories without leaving digital footprints.',
        },
        faq_three: {
          question: 'Is there any cost associated with using Instastories?',
          answer:
            'No, Instastories is completely free to use. You can enjoy anonymous viewing of Instagram stories without any fees or charges.',
        },
        faq_four: {
          question:
            'Will the account owner know if I watch their stories using Instastories?',
          answer:
            'No, Instastories ensures complete anonymity. The account owner will not receive any notification or be aware that you have viewed their stories.',
        },
      }}
    />
  );
}
