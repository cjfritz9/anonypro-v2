import BrandPage from '@/components/BrandPage/BrandPage';
import Link from 'next/link';

interface Metadata {
  params: {
    locale: string;
  };
}

export async function generateMetadata() {
  const name = 'StoriesDown';

  return {
    title: `${name} - Anonymous Instagram Story Viewer`,
  };
}

export default function StoriesDown({ params: { locale } }: Metadata) {
  return (
    <BrandPage
      locale={locale}
      headings={{
        main: 'StoriesDown Instagram Story Viewer',
        sub: 'Watch & download Instagram stories anonymously',
      }}
      description={{
        title: 'Go Anonymous on Instagram with StoriesDown',
        body: (
          <p className="text-center text-[18px] italic text-slate-300 xl:px-12">
            StoriesDown is a tool designed for discreetly accessing and{' '}
            <Link href="https://anonypro.com/" className="underline">
              downloading Instagram stories
            </Link>
            , including highlights, without attracting attention. It emphasizes
            user privacy by enabling silent content access, ensuring that the
            account owner remains unaware of the browsing activity. With
            StoriesDown, users can enjoy Instagram content discreetly,
            maintaining their anonymity and privacy.
          </p>
        ),
      }}
      howToUseTitle="How to Use StoriesDown Instagram Stories Viewer?"
      features={{ heading: 'Features Of StoriesDown' }}
      FAQs={{
        heading: 'Frequently Asked Questions',
        faq_one: {
          question: 'Can you describe what StoriesDown does?',
          answer:
            "StoriesDown is a digital platform that allows you to discreetly view Instagram stories. It's perfect for those who wish to explore Instagram content without revealing their identity to the story poster.",
        },
        faq_two: {
          question: 'How can I anonymously watch stories using StoriesDown?',
          answer:
            "Visit the StoriesDown website, type in the Instagram username you're curious about, and the platform will enable you to view their stories discreetly, keeping your identity hidden throughout the process.",
        },
        faq_three: {
          question: 'Does using StoriesDown cost anything?',
          answer:
            'No, StoriesDown is completely free. You can browse Instagram stories anonymously without any cost.',
        },
        faq_four: {
          question:
            'Will the Instagram user be aware that I viewed their stories through StoriesDown?',
          answer:
            'No, your activity will be entirely anonymous. StoriesDown ensures that there is no indication to the user that you have seen their stories.',
        },
      }}
    />
  );
}
