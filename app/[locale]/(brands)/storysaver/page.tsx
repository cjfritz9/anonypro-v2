import BrandPage from '@/components/BrandPage/BrandPage';
import Link from 'next/link';

interface Metadata {
  params: {
    locale: string;
  };
}

export async function generateMetadata() {
  const name = 'StorySaver';

  return {
    title: `${name} - Anonymous Instagram Story Viewer`,
  };
}

export default function StorySaver({ params: { locale } }: Metadata) {
  return (
    <BrandPage
      locale={locale}
      headings={{
        main: 'StorySaver Instagram Story Viewer',
        sub: 'Watch & download Instagram stories anonymously',
      }}
      description={{
        title: 'Go Anonymous on Instagram with StorySaver',
        body: (
          <p className="text-center text-[18px] italic text-slate-300 xl:px-12">
            StorySaver is your discreet companion for effortlessly downloading
            and{' '}
            <Link href="https://anonypro.com/" className="underline">
              viewing Instagram stories
            </Link>
            , including highlights. It champions user privacy by ensuring silent
            content access without tipping off the account owner. With
            StorySaver, enjoy a seamless browsing experience while keeping your
            anonymity intact, appreciating Instagram stories and highlights
            without leaving a trace.
          </p>
        ),
      }}
      howToUseTitle="How to Use StorySaver Instagram Stories Viewer?"
      features={{ heading: 'Features Of StorySaver' }}
      FAQs={{
        heading: 'Frequently Asked Questions',
        faq_one: {
          question: "What's the deal with storysaver?",
          answer:
            'Storysaver is a website/online tool that lets you sneak a peek at Instagram stories without the account user ever knowing.',
        },
        faq_two: {
          question: 'How do I get started with using storysaver?',
          answer:
            'Super simple! Just jump onto the storysaver website, toss in the username of the Instagram account you’re interested in, and you’ll be able to watch their stories anonymously. No sign-ups, no fuss.',
        },
        faq_three: {
          question: 'Does it cost anything to use storysaver?',
          answer:
            'Nope, storysaver is totally free. Watch all the stories you want without spending a dime.',
        },
        faq_four: {
          question:
            'Will anyone know that I’ve seen their stories using storysaver?',
          answer:
            'Not a chance. storysaver keeps your identity completely hidden, so you can browse stories anonymously without any worries.',
        },
      }}
    />
  );
}
