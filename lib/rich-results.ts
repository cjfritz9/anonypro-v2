type FAQItem = {
  question: string;
  answer: string;
} | undefined

export const toFaqSchema = (items: FAQItem[]) => {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => {
      if (!item) return null;
      return {
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `<p>${item.answer}</p>`,
        },
      }
    }
    ),
  });
};
