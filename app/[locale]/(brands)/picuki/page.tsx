import BrandPage from '@/components/BrandPage/BrandPage';
import Link from 'next/link';

interface Metadata {
  params: {
    locale: string;
  };
}

export async function generateMetadata() {
  const name = 'Picuki';

  return {
    title: `${name} - Anonymous Instagram Story Viewer`,
  };
}

export default function Picuki({ params: { locale } }: Metadata) {
  return (
    <BrandPage
      locale={locale}
      headings={{
        main: 'Picuki Instagram Story Viewer',
        sub: 'Watch & download Instagram stories anonymously',
      }}
      description={{
        title: 'Go Anonymous on Instagram with Picuki',
        body: (
          <p className="text-center text-[18px] italic text-slate-300 xl:px-12">
            What is Picuki? It’s the innovative solution transforming how you{' '}
            <Link href="https://anonypro.com/" className="underline">
              anonymously navigate Instagram
            </Link>
            . Fueled by cutting-edge technology and committed to safeguarding
            user privacy, Picuki seeks to redefine your Instagram browsing
            journey. Immerse yourself in the captivating realm of Instagram
            Stories with unparalleled ease and enjoyment!
          </p>
        ),
      }}
      howToUseTitle="How to Use Picuki Instagram Stories Viewer?"
      features={{ heading: 'Features Of Picuki' }}
      FAQs={{
        heading: 'Frequently Asked Questions',
        faq_one: {
          question: 'Can you explain what Picuki is?',
          answer:
            'Picuki is a stealthy tool that lets you view Instagram stories without making your presence known. Imagine it as your invisible cloak in the digital realm of Instagram, allowing you to observe discreetly.',
        },
        faq_two: {
          question: 'How do I start using Picuki to watch stories anonymously?',
          answer:
            "It’s straightforward. Navigate to Picuki's website, enter the username of the Instagram user whose stories spark your interest, and you're set. This tool provides a seamless experience for anonymous story viewing.",
        },
        faq_three: {
          question: 'Does using Picuki cost me anything?',
          answer:
            'Absolutely not! Picuki is completely free to use. Dive into the world of anonymous story-watching without spending a penny.',
        },
        faq_four: {
          question:
            "Will the person know I've checked their stories through Picuki?",
          answer:
            'Nobody will know a thing. Picuki makes sure of that. It’s like being a ghost—there, but not quite detectable.',
        },
      }}
    />
  );
}
