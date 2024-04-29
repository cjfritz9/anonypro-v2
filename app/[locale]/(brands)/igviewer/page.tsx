import BrandPage from '@/components/BrandPage/BrandPage';
import Link from 'next/link';

interface Metadata {
  params: {
    locale: string;
  };
}

export async function generateMetadata() {
  const name = 'IGViewer';

  return {
    title: `${name} - Anonymous Instagram Story Viewer`,
  };
}

export default function IGViewer({ params: { locale } }: Metadata) {
  return (
    <BrandPage
      locale={locale}
      headings={{
        main: 'IGViewer Instagram Story Viewer',
        sub: 'Watch & download Instagram stories anonymously',
      }}
      description={{
        title: 'Go Anonymous on Instagram with IGViewer',
        body: (
          <p className="text-center text-[18px] italic text-slate-300 xl:px-12">
            IGViewer is a handy tool designed for anonymous viewing of{' '}
            <Link href="https://anonypro.com/" className="underline">
              Instagram stories
            </Link>
            . It allows users to stay updated with content without revealing
            their identity to the account owner. With IGViewer, users can browse
            through stories discreetly, ensuring their privacy and anonymity are
            maintained throughout their browsing experience.
          </p>
        ),
      }}
      howToUseTitle="How to Use IGViewer Instagram Stories Viewer?"
      features={{ heading: 'Features Of IGViewer' }}
      FAQs={{
        heading: 'Frequently Asked Questions',
        faq_one: {
          question: "What's the purpose of IGViewer?",
          answer:
            'IGViewer is a digital tool designed for discreetly viewing Instagram stories, allowing users to stay updated without disclosing their identity.',
        },
        faq_two: {
          question:
            'How can I anonymously watch Instagram stories using IGViewer?',
          answer:
            'To utilize IGViewer, visit its website, input the Instagram username of the account you wish to view stories from, and seamlessly browse without leaving digital traces.',
        },
        faq_three: {
          question:
            'Is there any cost associated with using IGViewer?',
          answer:
            'No, IGViewer is completely free to use. You can enjoy anonymous viewing of Instagram stories without any fees or charges.',
        },
        faq_four: {
          question:
            'Will the account owner be notified if I watch their stories using IGViewer?',
          answer:
            'No, IGViewer ensures complete anonymity. The account owner will not receive any notification or be aware that you have viewed their stories.',
        },
      }}
    />
  );
}
