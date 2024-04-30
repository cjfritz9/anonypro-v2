import BrandPage from '@/components/BrandPage/BrandPage';
import Link from 'next/link';

interface Metadata {
  params: {
    locale: string;
  };
}

export async function generateMetadata() {
  const name = 'Storiesig';

  return {
    title: `${name} - Anonymous Instagram Story Viewer`,
  };
}

export default function StoriesIG({ params: { locale } }: Metadata) {
  return (
    <BrandPage
      locale={locale}
      headings={{
        main: 'Storiesig Instagram Story Viewer',
        sub: 'Watch & download Instagram stories anonymously',
      }}
      description={{
        title: 'Go Anonymous on Instagram with Storiesig',
        body: (
          <p className="text-center text-[18px] italic text-slate-300 xl:px-12">
            What is StoriesIG? It’s the innovative tool revolutionizing how you{' '}
            <Link href="https://anonypro.com/" className="underline">
              anonymously explore Instagram
            </Link>
            . Empowered by advanced technology and dedicated to safeguarding
            user privacy, StoriesIG seeks to redefine your Instagram browsing
            journey. Immerse yourself in the captivating realm of Instagram
            Stories with unparalleled ease and enjoyment!
          </p>
        ),
      }}
      howToUseTitle="How to Use Storiesig Instagram Stories Viewer?"
      features={{ heading: 'Features Of Storiesig' }}
      FAQs={{
        heading: 'Frequently Asked Questions',
        faq_one: {
          question: 'What does StoriesIG offer?',
          answer:
            'StoriesIG serves as a platform designed to enable users to engage with Instagram stories while keeping their identity undisclosed from the story uploader. This tool facilitates discreet story viewing.',
        },
        faq_two: {
          question:
            'What steps should be followed to use StoriesIG for unseen story viewing?',
          answer:
            "To engage with StoriesIG, navigate to the service's web portal, enter the username of the Instagram account from which you want to watch stories, and the tool will present the currently available stories for viewing without revealing your activity.",
        },
        faq_three: {
          question: 'Does using StoriesIG incur any cost?',
          answer:
            'No, accessing StoriesIG does not require any payment. It is a complimentary service that provides anonymous access to Instagram stories.',
        },
        faq_four: {
          question:
            'Will the uploader know if I view their story using StoriesIG?',
          answer:
            'No, your viewing activity through StoriesIG is hidden. The person whose stories you watch will not receive any indication that you have seen their stories.',
        },
      }}
    />
  );
}
