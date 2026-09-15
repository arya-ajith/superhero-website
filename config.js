/*
  EMAIL SETUP:
  1. Create a free EmailJS account: https://www.emailjs.com/
  2. Create an email service and template.
  3. Put your public key, service ID and template ID below.
  4. In your EmailJS template, use:
       {{visitor_name}}, {{visitor_age}}, {{visitor_location}},
       {{visitor_email}}, {{grievance}}, {{submitted_at}}
  5. Set candidate_email to the email address that should receive alerts.
*/
window.NOX_CONFIG = {
  emailjsPublicKey: "YOUR_PUBLIC_KEY",
  emailjsServiceId: "YOUR_SERVICE_ID",
  emailjsTemplateId: "YOUR_TEMPLATE_ID",
  candidateEmail: "YOUR_EMAIL_ADDRESS"
};
