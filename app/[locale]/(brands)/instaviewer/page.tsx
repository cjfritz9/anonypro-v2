import BrandPage from '@/components/BrandPage/BrandPage';
import Link from 'next/link';

interface Metadata {
  params: {
    locale: string;
  };
}

export async function generateMetadata() {
  const name = 'InstaViewer';

  return {
    title: `${name} - Anonymous Instagram Story Viewer`,
  };
}

export default function InstaViewer({ params: { locale } }: Metadata) {
  return (
    <BrandPage
      locale={locale}
      headings={{
        main: 'InstaViewer Instagram Story Viewer',
        sub: 'Watch & download Instagram stories anonymously',
      }}
      description={{
        title: 'Go Anonymous on Instagram with InstaViewer',
        body: (
          <p className="text-center text-[18px] italic text-slate-300 xl:px-12">
            InstaViewer is a user-friendly tool that allows users to view{' '}
            <Link href="https://anonypro.com/" className="underline">
              Instagram stories anonymously
            </Link>
            . It provides a discreet way to stay updated with content without
            revealing your identity to the account owner. With InstaViewer,
            users can browse through stories seamlessly, ensuring privacy and
            anonymity throughout the process.
          </p>
        ),
      }}
      howToUseTitle="How to Use InstaViewer Instagram Stories Viewer?"
      features={{ heading: 'Features Of InstaViewer' }}
      FAQs={{
        heading: 'Frequently Asked Questions',
        faq_one: {
          question: 'Is there a cost associated with using InstaViewer?',
          answer:
            'No, InstaViewer is completely free to use. You can enjoy anonymous viewing of Instagram stories without any fees or charges.',
        },
        faq_two: {
          question:
            'Will the account owner know if I watch their stories using InstaViewer?',
          answer:
            'No, InstaViewer ensures complete anonymity. The account owner will not be notified or aware that you have viewed their stories.',
        }
      }}
    />
  );
}
