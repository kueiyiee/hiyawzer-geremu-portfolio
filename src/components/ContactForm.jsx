import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'motion/react';
import { sendContactMessage } from '../lib/emailjs.js';
import { validateContactForm } from '../lib/contactFormValidation.js';

const initialFormData = { name: '', email: '', message: '' };
const fields = [
  { label: 'Name', type: 'text', id: 'name', maxLength: 100 },
  { label: 'Email', type: 'email', id: 'email', maxLength: 100 },
  { label: 'Message', type: 'textarea', id: 'message', maxLength: 1000 },
];

function ContactForm({ theme, onSuccess }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [submissionError, setSubmissionError] = useState('');
  const submittingRef = useRef(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    if (status !== 'success') return undefined;

    const timer = setTimeout(() => setStatus('idle'), 5000);
    return () => clearTimeout(timer);
  }, [status]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: '' }));
    setSubmissionError('');
    if (status === 'success') setStatus('idle');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submittingRef.current) return;

    const { values, errors: validationErrors } = validateContactForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    submittingRef.current = true;
    setSubmissionError('');
    setStatus('submitting');

    try {
      await sendContactMessage(values);
      setFormData(initialFormData);
      setErrors({});
      setStatus('success');
      onSuccess?.(values.email);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('[ContactForm] EmailJS submission failed.', error);
      }
      setSubmissionError(
        'Something went wrong while sending your message. Please try again or contact me directly by email.'
      );
      setStatus('idle');
    } finally {
      submittingRef.current = false;
    }
  };

  const fieldClassName = (hasError) =>
    `w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 ${
      isDark
        ? hasError
          ? 'border-red-500 bg-[#5e6472]/50 text-[#b8f2e6] focus:ring-red-500/50'
          : 'border-[#b8f2e6]/30 bg-[#5e6472]/50 text-[#b8f2e6] focus:border-[#b8f2e6] focus:ring-[#b8f2e6]/30'
        : hasError
          ? 'border-red-500 bg-white text-[#5e6472] focus:ring-red-500/50'
          : 'border-[#aed9e0]/50 bg-white text-[#5e6472] focus:border-[#aed9e0] focus:ring-[#aed9e0]/30'
    }`;

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {fields.map((field, index) => (
          <Motion.div
            key={field.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="relative"
          >
            <label
              htmlFor={field.id}
              className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-[#b8f2e6]' : 'text-[#5e6472]'
              }`}
            >
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <Motion.textarea
                whileFocus={{ scale: 1.01 }}
                id={field.id}
                name={field.id}
                value={formData[field.id]}
                onChange={handleChange}
                rows={5}
                maxLength={field.maxLength}
                required
                className={`${fieldClassName(!!errors[field.id])} resize-none`}
                placeholder="Enter your message"
                aria-invalid={!!errors[field.id]}
                aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
              />
            ) : (
              <Motion.input
                whileFocus={{ scale: 1.01 }}
                type={field.type}
                id={field.id}
                name={field.id}
                value={formData[field.id]}
                onChange={handleChange}
                maxLength={field.maxLength}
                required
                className={fieldClassName(!!errors[field.id])}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                aria-invalid={!!errors[field.id]}
                aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
              />
            )}

            <AnimatePresence>
              {errors[field.id] && (
                <Motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  id={`${field.id}-error`}
                  className="text-red-500 text-sm mt-2 flex items-center"
                >
                  <svg className="w-4 h-4 mr-1 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors[field.id]}
                </Motion.p>
              )}
            </AnimatePresence>
          </Motion.div>
        ))}

        <Motion.button
          type="submit"
          whileHover={status === 'submitting' ? undefined : { scale: 1.02, y: -2 }}
          whileTap={status === 'submitting' ? undefined : { scale: 0.98 }}
          disabled={status === 'submitting' || status === 'success'}
          aria-busy={status === 'submitting'}
          className={`w-full px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 relative overflow-hidden ${
            isDark
              ? 'bg-[#b8f2e6] text-[#5e6472] hover:shadow-lg hover:shadow-[#b8f2e6]/30'
              : 'bg-[#aed9e0] text-[#5e6472] hover:shadow-lg hover:shadow-[#aed9e0]/30'
          } ${status !== 'idle' ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          <span className="relative z-10 flex items-center justify-center">
            {status === 'submitting' ? (
              <>
                <Motion.svg
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </Motion.svg>
                Sending...
              </>
            ) : status === 'success' ? (
              'Message Sent'
            ) : (
              <>
                Send Message
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </span>
        </Motion.button>
      </form>

      <AnimatePresence>
        {(status === 'success' || submissionError) && (
          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-8 sm:bottom-8 sm:max-w-md px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-sm z-50 flex items-start space-x-3 ${
              status === 'success'
                ? isDark
                  ? 'bg-[#b8f2e6] text-[#5e6472]'
                  : 'bg-[#aed9e0] text-[#5e6472]'
                : 'bg-red-500 text-white'
            }`}
            role={status === 'success' ? 'status' : 'alert'}
            aria-live={status === 'success' ? 'polite' : 'assertive'}
          >
            {status === 'success' ? (
              <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span className="font-medium">
              {status === 'success'
                ? "Message sent successfully. Thank you for reaching out. I'll get back to you as soon as possible."
                : submissionError}
            </span>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ContactForm;
