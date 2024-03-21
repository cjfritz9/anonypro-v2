interface FAQItem {
  question: string;
  answer: string;
}

export const toFaqSchema = (items: FAQItem[]) => {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `<p>${item.answer}</p>`,
      },
    })),
  });
};
