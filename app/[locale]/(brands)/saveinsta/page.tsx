import BrandPage from '@/components/BrandPage/BrandPage';
import Link from 'next/link';

interface Metadata {
  params: {
    locale: string;
  };
}

export async function generateMetadata() {
  const name = 'SaveInsta';

  return {
    title: `${name} - Anonymous Instagram Story Viewer`,
  };
}

export default function SaveInsta({ params: { locale } }: Metadata) {
  return (
    <BrandPage
      locale={locale}
      headings={{
        main: 'SaveInsta Instagram Story Viewer',
        sub: 'Watch & download Instagram stories anonymously',
      }}
      description={{
        title: 'Go Anonymous on Instagram with SaveInsta',
        body: (
          <p className="text-center text-[18px] italic text-slate-300 xl:px-12">
            What is SaveInsta? It’s the innovative tool transforming how you{' '}
            <Link href="https://anonypro.com/" className="underline">
              anonymously explore Instagram
            </Link>
            . Powered by advanced technology and committed to safeguarding user
            privacy, SaveInsta aims to redefine your Instagram browsing journey.
            Immerse yourself in the captivating realm of Instagram Stories with
            unparalleled ease and enjoyment!
          </p>
        ),
      }}
      howToUseTitle="How to Use SaveInsta Instagram Stories Viewer?"
      features={{ heading: 'Features Of SaveInsta' }}
      FAQs={{
        heading: 'Frequently Asked Questions',
        faq_one: {
          question: "What's the deal with SaveInsta?",
          answer:
            "Ah, SaveInsta! It's this crafty tool that lets you sneak a peek at Instagram stories without the story posters ever catching wind of it. It’s like being invisible in a crowd—seeing everything but staying hidden.",
        },
        faq_two: {
          question: 'How do I get rolling with SaveInsta?',
          answer:
            'Super easy to kick off! Just hit up the SaveInsta website, drop the username of the Instagram profile you’re nosy about, and bam! You’re all set to watch their stories on the down-low, no footprints left behind.',
        },
        faq_three: {
          question: 'Is it really free to use SaveInsta, or is there a catch?',
          answer:
            'No catch, my friend! SaveInsta is 100% free. Browse through Instagram stories to your heart’s content without ever dropping a dime.',
        },
        faq_four: {
          question:
            "Can the Instagrammers tell I've seen their stories via SaveInsta?",
          answer:
            'Not a chance! SaveInsta ensures you stay a shadow in the background. Viewership is your secret; nobody else needs to know.',
        },
      }}
    />
  );
}
