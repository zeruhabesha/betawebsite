import { company } from "../data/site.js";

const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

export function isEmailConfigured() {
  return Boolean(emailConfig.serviceId && emailConfig.templateId && emailConfig.publicKey);
}

export async function sendWebsiteEmail(formType, params) {
  if (!isEmailConfigured()) {
    throw new Error("EmailJS is not configured.");
  }

  const response = await fetch(EMAILJS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      service_id: emailConfig.serviceId,
      template_id: emailConfig.templateId,
      user_id: emailConfig.publicKey,
      template_params: {
        to_email: company.email,
        form_type: formType,
        submitted_at: new Date().toISOString(),
        ...params,
      },
    }),
  });

  if (!response.ok) {
    throw new Error("EmailJS request failed.");
  }
}
