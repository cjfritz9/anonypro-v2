import BrandPage from '@/components/BrandPage/BrandPage';
import Link from 'next/link';

interface Metadata {
  params: {
    locale: string;
  };
}

export async function generateMetadata() {
  const name = 'InstaStalker';

  return {
    title: `${name} - Anonymous Instagram Story Viewer`,
  };
}

export default function InstaStalker({ params: { locale } }: Metadata) {
  return (
    <BrandPage
      locale={locale}
      headings={{
        main: 'InstaStalker Instagram Story Viewer',
        sub: 'Watch & download Instagram stories anonymously',
      }}
      description={{
        title: 'Go Anonymous on Instagram with InstaStalker',
        body: (
          <p className="text-center text-[18px] italic text-slate-300 xl:px-12">
            Instastalker is a tool allowing{' '}
            <Link href="https://anonypro.com/" className="underline">
              anonymous viewing
            </Link>
            , downloading, and viewing of Instagram stories and highlights. It
            offers discreet access to content without notifying the account
            owner. Users can stay updated without revealing their identity,
            enhancing privacy while enjoying Instagram stories and highlights
            effortlessly.
          </p>
        ),
      }}
      howToUseTitle="How to Use InstaStalker Instagram Stories Viewer?"
      features={{ heading: 'Features Of InstaStalker' }}
      FAQs={{
        heading: 'Frequently Asked Questions',
        faq_one: {
          question: 'What’s InstaStalker all about?',
          answer:
            "InstaStalker is a tool crafted for those who want to peek at Instagram stories without making a blip on the radar. It's your go-to for watching what's happening on Instagram without anyone knowing you're there.",
        },
        faq_two: {
          question: 'How do I get started with InstaStalker?',
          answer:
            'All you need to do is visit the InstaStalker website, type in the username of the Instagram user whose stories you want to check out, and you’re all set. The platform handles the rest, allowing you to view stories anonymously and with ease.',
        },
        faq_three: {
          question: 'Will using InstaStalker cost me anything?',
          answer:
            'Nope! InstaStalker is completely free to use. There are no hidden charges or fees, so you can browse Instagram stories anonymously without worrying about costs.',
        },
        faq_four: {
          question:
            'Can the user see that I’ve viewed their stories through InstaStalker?',
          answer:
            'They won’t have a clue. InstaStalker ensures that you remain invisible while browsing stories. You can keep up with all the latest without ever revealing your identity.',
        },
      }}
    />
  );
}
