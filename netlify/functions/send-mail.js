const nodemailer = require('nodemailer');

const {
  SMTP_HOST = 'smtp.gmail.com',
  SMTP_PORT = '587',
  SMTP_USER = 'levonbakunts96@gmail.com',
  SMTP_PASS = 'lwcb qaer cdzx hamp',
  SMTP_FROM_NAME = 'Levon Bakunts',
  CONTACT_RECIPIENT = 'levonbakunts96@gmail.com',
} = process.env;

const RESPONSE_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: Number(SMTP_PORT) === 465,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

const buildHtmlBody = ({ name, email, message }) => `
  <h2>New Message from Website</h2>
  <table style="border-collapse:collapse;width:100%;">
    <tr>
      <th align="left" style="padding:8px;border:1px solid #d1d5db;width:120px;">Name</th>
      <td style="padding:8px;border:1px solid #d1d5db;">${name}</td>
    </tr>
    <tr>
      <th align="left" style="padding:8px;border:1px solid #d1d5db;">Email</th>
      <td style="padding:8px;border:1px solid #d1d5db;">${email}</td>
    </tr>
    <tr>
      <th align="left" style="padding:8px;border:1px solid #d1d5db;">Message</th>
      <td style="padding:8px;border:1px solid #d1d5db;">${message.replace(/\n/g, '<br>')}</td>
    </tr>
  </table>
`;

const buildConfirmationHtml = ({ name, message }) => `
  <div style="font-family:Arial,sans-serif;color:#1f2937;">
    <h2 style="margin-bottom:8px;">Hi ${name || 'there'}!</h2>
    <p style="margin-bottom:16px;">Thanks for reaching out. We received your message and will get back to you shortly.</p>
    <div style="padding:16px;border:1px solid #d1d5db;border-radius:8px;background:#f8fafc;">
      <p style="margin:0 0 8px 0;font-weight:600;">Your message:</p>
      <p style="margin:0;white-space:pre-line;">${message}</p>
    </div>
    <p style="margin-top:16px;">Best regards,<br>${SMTP_FROM_NAME}</p>
  </div>
`;

const sanitize = (value = '') =>
  String(value).replace(/</g, '&lt;').replace(/>/g, '&gt;').trim();

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: RESPONSE_HEADERS,
      body: JSON.stringify({ success: true }),
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: RESPONSE_HEADERS,
      body: JSON.stringify({ success: false, message: 'Method not allowed.' }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (error) {
    return {
      statusCode: 400,
      headers: RESPONSE_HEADERS,
      body: JSON.stringify({ success: false, message: 'Invalid JSON payload.' }),
    };
  }

  const name = sanitize(payload.name);
  const email = sanitize(payload.email);
  const message = sanitize(payload.message);

  if (!name || !email || !message) {
    return {
      statusCode: 422,
      headers: RESPONSE_HEADERS,
      body: JSON.stringify({ success: false, message: 'Please fill out all fields.' }),
    };
  }

  const mailOptions = {
    from: `"${SMTP_FROM_NAME}" <${SMTP_USER}>`,
    to: CONTACT_RECIPIENT,
    replyTo: `${name} <${email}>`,
    subject: 'New Message from Website Form',
    text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    html: buildHtmlBody({ name, email, message }),
  };

  const confirmationMailOptions = {
    from: `"${SMTP_FROM_NAME}" <${SMTP_USER}>`,
    to: email,
    subject: 'We received your message',
    text: `Hi ${name || 'there'},\n\nThanks for reaching out! We received your message and will reply shortly.\n\nYour message:\n${message}\n\nBest regards,\n${SMTP_FROM_NAME}`,
    html: buildConfirmationHtml({ name, message }),
  };

  try {
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(confirmationMailOptions);
    return {
      statusCode: 200,
      headers: RESPONSE_HEADERS,
      body: JSON.stringify({
        success: true,
        message: 'Thank you! Your message was sent successfully.',
      }),
    };
  } catch (error) {
    console.error('Mailer error', error);
    return {
      statusCode: 502,
      headers: RESPONSE_HEADERS,
      body: JSON.stringify({
        success: false,
        message: 'Message delivery failed. Please try again later.',
      }),
    };
  }
};

