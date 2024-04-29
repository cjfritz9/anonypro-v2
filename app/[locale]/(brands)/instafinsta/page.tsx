import BrandPage from '@/components/BrandPage/BrandPage';
import Link from 'next/link';

interface Metadata {
  params: {
    locale: string;
  };
}

export async function generateMetadata() {
  const name = 'Instafinsta';

  return {
    title: `${name} - Anonymous Instagram Story Viewer`,
  };
}

export default function InstaFinsta({ params: { locale } }: Metadata) {
  return (
    <BrandPage
      locale={locale}
      headings={{
        main: 'Instafinsta Instagram Story Viewer',
        sub: 'Watch & download Instagram stories anonymously',
      }}
      description={{
        title: 'Go Anonymous on Instagram with Instafinsta',
        body: (
          <p className="text-center text-[18px] italic text-slate-300 xl:px-12">
            What is InstaFinsta? It’s the groundbreaking tool transforming how
            you{' '}
            <Link href="https://anonypro.com/" className="underline">
              anonymously browse Instagram
            </Link>
            . Empowered by advanced technology and committed to protecting user
            privacy, InstaFinsta aims to redefine your Instagram browsing
            experience. Immerse yourself in the captivating world of Instagram
            Stories with unmatched simplicity and pleasure!
          </p>
        ),
      }}
      howToUseTitle="How to Use Instafinsta Instagram Stories Viewer?"
      features={{ heading: 'Features Of Instafinsta' }}
      FAQs={{
        heading: 'Frequently Asked Questions',
        faq_one: {
          question: 'What exactly is InstaFinsta?',
          answer:
            'InstaFinsta is a service crafted to let individuals view Instagram stories without making their presence known to the account owner. This tool ensures anonymity for users seeking to browse stories discreetly.',
        },
        faq_two: {
          question:
            'How can I utilize InstaFinsta for incognito story watching?',
          answer:
            'To start using InstaFinsta, proceed to the official platform online, input the Instagram handle of the profile from which you desire to view stories, and the service will promptly provide you with the stories available for anonymous viewing.',
        },
        faq_three: {
          question:
            'What considerations should be kept in mind when using InstaFinsta?',
          answer:
            'While InstaFinsta operates within legal frameworks, users are encouraged to consider ethical concerns, such as respecting privacy and adhering closely to Instagram’s usage policies. It’s important to ponder the implications of viewing content anonymously.',
        },
      }}
    />
  );
}
