import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useSite } from '../SiteContext';
import { CONTACT_EMAIL } from '../i18n';
import Rich from './Rich';

import { EMAILJS } from '../emailjs.config';

const { serviceId: SERVICE_ID, templateId: TEMPLATE_ID, publicKey: PUBLIC_KEY } = EMAILJS;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Contact form → EmailJS. The visitor's message is emailed to you, with their
 * address as Reply-To, so you can answer straight from your inbox.
 * Template variables used: {{from_name}}, {{reply_to}}, {{message}}, {{language}}.
 */
export default function Contact() {
  const { t, lang } = useSite();
  const c = t.contact;
  const formRef = useRef(null);
  const [values, setValues] = useState({ name: '', email: '', message: '', company: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  // A "Get a quote" button in the price list pre-fills the message.
  useEffect(() => {
    const onPlan = (e) => {
      setStatus('idle');
      setValues((v) => ({ ...v, message: e.detail.message }));
      setTimeout(() => formRef.current?.querySelector('#cf-email')?.focus({ preventScroll: true }), 1500);
    };
    window.addEventListener('iomys:plan', onPlan);
    return () => window.removeEventListener('iomys:plan', onPlan);
  }, []);

  const update = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: false }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    // "company" is a hidden honeypot field: real people leave it empty, bots fill it.
    if (values.company) {
      setStatus('sent');
      return;
    }

    const nextErrors = {
      email: !EMAIL_RE.test(values.email.trim()),
      message: values.message.trim().length < 2,
    };
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.message) {
      formRef.current.querySelector(nextErrors.email ? '#cf-email' : '#cf-message')?.focus();
      return;
    }

    setStatus('sending');
    try {
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        throw new Error('EmailJS keys are missing — see src/emailjs.config.js.');
      }
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: values.name.trim() || '—',
          reply_to: values.email.trim(),
          message: values.message.trim(),
          language: lang.toUpperCase(),
        },
        { publicKey: PUBLIC_KEY }
      );
      setStatus('sent');
      setValues({ name: '', email: '', message: '', company: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="wrap contact__inner">
        <div className="contact__intro" data-reveal>
          <p className="eyebrow">{c.label}</p>
          <h2 className="contact__title">
            <Rich text={c.title} />
          </h2>
          <p className="lead">{c.sub}</p>
          <div className="contact__direct">
            <span className="muted small">{c.direct}</span>
            <a href={`mailto:${CONTACT_EMAIL}`} className="contact__mail">
              <span className="dot dot--sm" />
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className="contact__form-wrap" data-reveal>
          {status === 'sent' ? (
            <div className="contact__thanks" role="status">
              <span className="dot" />
              <h3 className="serif">{c.thanksTitle}</h3>
              <p>{c.thanksText}</p>
              <button type="button" className="btn btn--outline" onClick={() => setStatus('idle')}>
                {c.again}
              </button>
            </div>
          ) : (
            <form ref={formRef} className="contact__form" onSubmit={onSubmit} noValidate>
              <div className="field">
                <label htmlFor="cf-name">{c.name}</label>
                <input id="cf-name" name="name" type="text" autoComplete="name" placeholder={c.phName} value={values.name} onChange={update('name')} />
              </div>

              <div className={`field${errors.email ? ' has-error' : ''}`}>
                <label htmlFor="cf-email">{c.email}</label>
                <input
                  id="cf-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="ime@email.com"
                  value={values.email}
                  onChange={update('email')}
                  aria-invalid={errors.email || undefined}
                  aria-describedby={errors.email ? 'cf-email-err' : undefined}
                  required
                />
              </div>
              {errors.email && (
                <p id="cf-email-err" className="field__error" role="alert">
                  {c.errEmail}
                </p>
              )}

              <div className={`field${errors.message ? ' has-error' : ''}`}>
                <label htmlFor="cf-message">{c.message}</label>
                <textarea
                  id="cf-message"
                  name="message"
                  rows="4"
                  placeholder={c.phMessage}
                  value={values.message}
                  onChange={update('message')}
                  aria-invalid={errors.message || undefined}
                  aria-describedby={errors.message ? 'cf-message-err' : undefined}
                  required
                />
              </div>
              {errors.message && (
                <p id="cf-message-err" className="field__error" role="alert">
                  {c.errMessage}
                </p>
              )}

              <div className="honeypot" aria-hidden="true">
                <label htmlFor="cf-company">Company</label>
                <input id="cf-company" name="company" type="text" tabIndex={-1} autoComplete="off" value={values.company} onChange={update('company')} />
              </div>

              {status === 'error' && (
                <p className="field__error" role="alert">
                  {c.errSend}
                </p>
              )}

              <button type="submit" className="send" disabled={status === 'sending'}>
                {status === 'sending' ? c.sending : c.send}
                <span className={`dot dot--sm${status === 'sending' ? ' is-pulsing' : ''}`} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
