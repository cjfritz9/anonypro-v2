import BrandPage from '@/components/BrandPage/BrandPage';
import Link from 'next/link';

interface Metadata {
  params: {
    locale: string;
  };
}

export async function generateMetadata() {
  const name = 'InDown';

  return {
    title: `${name} - Anonymous Instagram Story Viewer`,
  };
}

export default function InDown({ params: { locale } }: Metadata) {
  return (
    <BrandPage
      locale={locale}
      headings={{
        main: 'InDown Instagram Story Viewer',
        sub: 'Watch & download Instagram stories anonymously',
      }}
      description={{
        title: 'Go Anonymous on Instagram with InDown',
        body: (
          <p className="text-center text-[18px] italic text-slate-300 xl:px-12">
            InDown offers a discreet solution for browsing and downloading
            Instagram stories, as well as accessing highlights without raising
            alarms. It prioritizes user anonymity by providing seamless content
            access without notifying the account owner. With InDown, users can{' '}
            <Link href="https://anonypro.com/" className="underline">
              explore Instagram content
            </Link>{' '}
            without leaving any digital footprints, ensuring privacy and
            discretion.
          </p>
        ),
      }}
      howToUseTitle="How to Use InDown Instagram Stories Viewer?"
      features={{ heading: 'Features Of InDown' }}
      FAQs={{
        heading: 'Frequently Asked Questions',
        faq_one: {
          question: 'What is InDown?',
          answer:
            "InDown is a handy online service that allows you to watch Instagram stories without the account owners knowing. It's designed for discreet, anonymous browsing of stories.",
        },
        faq_two: {
          question:
            'How do I use InDown to watch Instagram stories anonymously?',
          answer:
            'It’s really easy. Just head to the InDown website, enter the username of the Instagram account whose stories you want to view, and the tool will let you watch them without leaving any trace of your visit.',
        },
        faq_three: {
          question: 'Is there a fee for using InDown?',
          answer:
            'No, InDown is completely free. There are no charges for using this service to watch Instagram stories.',
        },
        faq_four: {
          question:
            'Can the account holder detect that I have viewed their stories with InDown?',
          answer:
            "Absolutely not. InDown ensures that your viewing activity remains private, so no one will know you've accessed their stories.",
        },
      }}
    />
  );
}
