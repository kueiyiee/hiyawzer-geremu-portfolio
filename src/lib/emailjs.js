import emailjs from '@emailjs/browser';

const emailJsConfig = Object.freeze({
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() ?? '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim() ?? '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim() ?? '',
});

const isConfigured = Object.values(emailJsConfig).every(Boolean);

if (isConfigured) {
  emailjs.init({ publicKey: emailJsConfig.publicKey });
} else if (import.meta.env.DEV) {
  console.error(
    '[EmailJS] Missing configuration. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in .env.'
  );
}

function getSubmissionTime(date = new Date()) {
  const pad = (value) => String(value).padStart(2, '0');

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export async function sendContactMessage({ name, email, message }) {
  if (!isConfigured) {
    throw new Error('EmailJS is not configured.');
  }

  return emailjs.send(emailJsConfig.serviceId, emailJsConfig.templateId, {
    name,
    email,
    time: getSubmissionTime(),
    message,
  });
}
