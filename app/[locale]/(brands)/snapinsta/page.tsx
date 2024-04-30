import BrandPage from '@/components/BrandPage/BrandPage';
import Link from 'next/link';

interface Metadata {
  params: {
    locale: string;
  };
}

export async function generateMetadata() {
  const name = 'SnapInsta';

  return {
    title: `${name} - Anonymous Instagram Story Viewer`,
  };
}

export default function SnapInsta({ params: { locale } }: Metadata) {
  return (
    <BrandPage
      locale={locale}
      headings={{
        main: 'Snapinsta Instagram Story Viewer',
        sub: 'Watch & download Instagram stories anonymously',
      }}
      description={{
        title: 'Go Anonymous on Instagram with SnapInsta',
        body: (
          <p className="text-center text-[18px] italic text-slate-300 xl:px-12">
            What is Snapinsta? It’s the groundbreaking tool changing the way you{' '}
            <Link href="https://anonypro.com/" className="underline">
              anonymously navigate Instagram
            </Link>
            . Fueled by cutting-edge tech and committed to protecting user
            privacy, Snapinsta aims to transform your Instagram browsing
            experience. Dive into the captivating world of Instagram Stories
            effortlessly and with unmatched pleasure!
          </p>
        ),
      }}
      howToUseTitle="How to Use SnapInsta Instagram Stories Viewer?"
      features={{ heading: 'Features Of SnapInsta' }}
      FAQs={{
        heading: 'Frequently Asked Questions',
        faq_one: {
          question: 'Can you explain what SnapInsta is?',
          answer:
            "Sure thing! SnapInsta is this cool tool that lets you view Instagram stories without the story uploader ever finding out. It's all about keeping your viewing secret and the intrigue high.",
        },
        faq_two: {
          question: 'How does one start using SnapInsta?',
          answer:
            "It's super simple. Pop over to SnapInsta's official site, key in the username for the Instagram account you're curious about, and you’re set to go. The stories pop up anonymously, and you can view them without any digital footprints.",
        },
        faq_three: {
          question: 'Is there a fee to use SnapInsta?',
          answer:
            'Not at all! SnapInsta is completely free. There’s no cost to sneak a peek at those Instagram stories anonymously.',
        },
        faq_four: {
          question:
            'Does SnapInsta leave any clues that I viewed someone’s stories?',
          answer:
            'No way! When you use SnapInsta, you’re like a ghost. You see everything but leave no trace. The account holder won’t have a clue that you were there.',
        },
      }}
    />
  );
}
