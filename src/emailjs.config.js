// EmailJS settings for the contact form (account: iomysagency@gmail.com).
// These values are public by design — EmailJS sends them from the visitor's
// browser — so they can live in the code. Values in a .env file
// (VITE_EMAILJS_*) override them, e.g. for testing with another account.
// To stop misuse, add your live domain under EmailJS → Account → Security → Allowed origins.

export const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_hnjb28a',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_o0kd7gf',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'eQCwdjUgi-covF_xG',
};
