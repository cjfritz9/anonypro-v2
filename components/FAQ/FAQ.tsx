import { toFaqSchema } from '@/lib/rich-results';
import Script from 'next/script';
import React from 'react';

interface Props {
  translations: {
    heading: string;
    subheading: string;
    faq_one: {
      question: string;
      answer: string;
    };
    faq_two: {
      question: string;
      answer: string;
    };
    faq_three: {
      question: string;
      answer: string;
    };
    faq_four: {
      question: string;
      answer: string;
    };
    faq_five: {
      question: string;
      answer: string;
    };
    faq_six: {
      question: string;
      answer: string;
    };
  };
}

const FAQ: React.FC<Props> = ({ translations }) => {
  const {
    heading,
    subheading,
    faq_one,
    faq_two,
    faq_three,
    faq_four,
    faq_five,
    faq_six,
  } = translations;
  return (
    <div className="relative flex w-full flex-col items-start justify-center gap-8 py-[70px] lg:flex-row xl:gap-20 xl:px-12">
      <Script id="faq-schema-script" type="application/ld+json">
        {toFaqSchema([
          faq_one,
          faq_two,
          faq_three,
          faq_four,
          faq_five,
          faq_six,
        ])}
      </Script>
      <div className="w-full max-w-[480px]">
        <h3 className="mb-6 text-left text-4xl font-[500] leading-[44px] xl:text-[44px]">
          {heading}
        </h3>
        <h4>{subheading}</h4>
      </div>
      <div className="flex w-full flex-col gap-5">
        <div className="collapse collapse-arrow bg-base-100">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title text-xl font-medium">
            {faq_one.question}
          </div>
          <div className="collapse-content">
            <p>{faq_one.answer}</p>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-100">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            {faq_two.question}
          </div>
          <div className="collapse-content">
            <p>{faq_two.answer}</p>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-100">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            {faq_three.question}
          </div>
          <div className="collapse-content">
            <p>{faq_three.answer}</p>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-100">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            {faq_four.question}
          </div>
          <div className="collapse-content">
            <p>{faq_four.answer}</p>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-100">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            {faq_five.question}
          </div>
          <div className="collapse-content">
            <p>{faq_five.answer}</p>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-100">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            {faq_six.question}
          </div>
          <div className="collapse-content">
            <p>{faq_six.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
