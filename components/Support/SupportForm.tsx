'use client';

import { postNewContactForm, postRecaptchaToken } from '@/lib/requests';
import { validateContactForm } from '@/lib/tools';
import { exec } from 'child_process';
import { useReCaptcha } from 'next-recaptcha-v3';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Status {
  type: 'success' | 'error' | null;
  message: string | null;
}

const SupportForm: React.FC = () => {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<Status>({ type: null, message: null });
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation('support');
  const { executeRecaptcha } = useReCaptcha();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const { isValid, message } = validateContactForm(fields);

    if (!isValid) {
      handleShowStatus({ type: 'error', message });
    } else {
      try {
        const token = await executeRecaptcha('contact_form');
        const captchaResponse = await postRecaptchaToken(token);

        if (
          !captchaResponse ||
          !captchaResponse.success ||
          captchaResponse.score < 0.7
        ) {
          handleShowStatus({
            type: 'error',
            message: 'Something went wrong, send us an email instead',
          });
          setFields({ name: '', email: '', subject: '', message: '' });
        } else {
          const response = await postNewContactForm(fields);
          if (response && response.status === 'ok') {
            handleShowStatus({
              type: 'success',
              message: 'Your message was sent, we will respond to you shortly',
            });
            setFields({ name: '', email: '', subject: '', message: '' });
          } else {
            handleShowStatus({
              type: 'error',
              message: 'Something went wrong, send us an email instead',
            });
          }
        }
      } catch (error) {
        handleShowStatus({
          type: 'error',
          message: 'Something went wrong, send us an email instead',
        });
      }
    }
    setIsLoading(false);
  };

  const handleShowStatus = ({ type, message }: Status) => {
    setStatus({ type, message });

    setTimeout(() => {
      setStatus({ type: null, message: null });
    }, 3500);
  };

  return (
    <form
      className="flex w-full max-w-[600px] flex-col rounded-sm bg-[#383A76] bg-opacity-70 px-8 py-10"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-6 text-2xl">{t('support:section_one.form.heading')}</h2>
      <p className="prose mb-5">{t('support:section_one.form.body')}</p>
      <input
        id="name"
        type="text"
        placeholder={t('support:section_one.form.fields.name') + '*'}
        className="input mb-5 w-full rounded-sm bg-base-200"
        onChange={(e) =>
          setFields((prev) => ({
            ...prev,
            name: e.target.value,
          }))
        }
      />
      <input
        id="email"
        type="email"
        placeholder={t('support:section_one.form.fields.email') + '*'}
        className="input mb-5 w-full rounded-sm bg-base-200"
        onChange={(e) =>
          setFields((prev) => ({
            ...prev,
            email: e.target.value,
          }))
        }
      />
      <input
        id="subject"
        type="text"
        placeholder={t('support:section_one.form.fields.subject')}
        className="input mb-5 w-full rounded-sm bg-base-200"
        onChange={(e) =>
          setFields((prev) => ({
            ...prev,
            subject: e.target.value,
          }))
        }
      />
      <textarea
        id="message"
        placeholder={t('support:section_one.form.fields.message') + '*'}
        className="input mb-5 min-h-32 w-full rounded-sm bg-base-200"
        onChange={(e) =>
          setFields((prev) => ({
            ...prev,
            message: e.target.value,
          }))
        }
      />
      <div className="flex w-full justify-end">
        <button
          type="submit"
          className="btn w-full sm:w-fit btn-accent px-8 text-lg font-normal text-white"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            t('support:section_one.form.button')
          )}
        </button>
      </div>
      {status.type && (
        <div className="toast toast-center">
          <div
            className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-error'}`}
          >
            <span>{status.message}</span>
          </div>
        </div>
      )}
    </form>
  );
};

export default SupportForm;
