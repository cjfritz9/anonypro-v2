import BrandPage from '@/components/BrandPage/BrandPage';
import Link from 'next/link';

interface Metadata {
  params: {
    locale: string;
  };
}

export async function generateMetadata() {
  const name = 'InstaVideoSave';

  return {
    title: `${name} - Anonymous Instagram Story Viewer`,
  };
}

export default function InstaVideoSave({ params: { locale } }: Metadata) {
  return (
    <BrandPage
      locale={locale}
      headings={{
        main: 'InstaVideoSave Instagram Story Viewer',
        sub: 'Watch & download Instagram stories anonymously',
      }}
      description={{
        title: 'Go Anonymous on Instagram with InstaVideoSave',
        body: (
          <p className="text-center text-[18px] italic text-slate-300 xl:px-12">
            InstaVideoSave offers a seamless solution for browsing and{' '}
            <Link href="https://anonypro.com/" className="underline">
              saving Instagram videos and stories
            </Link>{' '}
            without alerting the account owner. It prioritizes user privacy by
            ensuring discreet content access, allowing users to enjoy Instagram
            content anonymously. With InstaVideoSave, users can effortlessly
            save and view Instagram videos while maintaining their anonymity.
          </p>
        ),
      }}
      howToUseTitle="How to Use InstaVideoSave Instagram Stories Viewer?"
      features={{ heading: 'Features Of InstaVideoSave' }}
      FAQs={{
        heading: 'Frequently Asked Questions',
        faq_one: {
          question: 'What functionality does InstaVideoSave provide?',
          answer:
            'InstaVideoSave offers a discreet platform for viewing Instagram stories anonymously, ensuring your browsing remains private.',
        },
        faq_two: {
          question:
            'How can I access Instagram stories anonymously with InstaVideoSave?',
          answer:
            'Visit the InstaVideoSave website, input the Instagram username you wish to view stories from, and enjoy anonymous browsing without leaving any digital traces.',
        },
        faq_three: {
          question: 'Is there a cost associated with using InstaVideoSave?',
          answer:
            'No, InstaVideoSave is completely free to use. There are no hidden charges or subscription fees for accessing its anonymous story viewing feature.',
        },
        faq_four: {
          question:
            'Will the account owner be alerted if I watch their stories using InstaVideoSave?',
          answer:
            'Absolutely not. InstaVideoSave prioritizes user privacy, ensuring that your viewing activity remains completely discreet and undisclosed to the account owner.',
        },
      }}
    />
  );
}
