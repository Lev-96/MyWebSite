const nodemailer = require('nodemailer');

const {
    SMTP_HOST = 'smtp.yandex.ru',
    SMTP_PORT = '465',
    SMTP_USER = 'web.developer0101@ya.ru',
    SMTP_PASS = 'arvrbpkxctevxhfx',
    SMTP_FROM_NAME = 'Web Development Agency',
    CONTACT_RECIPIENT = 'web.developer0101@ya.ru',
    AUTO_REPLY_SUBJECT = 'Thank you for contacting us!',
    AUTO_REPLY_MESSAGE = `Dear {name},

Thank you for reaching out! We have received your message and will get back to you within 24 hours.

Best regards,
${SMTP_FROM_NAME}`,
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
    // Важно: добавляем DKIM, если поддерживается (Яндекс поддерживает)
    // dkim: { ... } — можно добавить позже, если есть подпись
});

const getServiceLabel = (service) => {
    if (!service) return 'Not specified';
    const labels = {
        'backend': 'Backend Development',
        'frontend': 'Frontend Development',
        'uiux': 'UI/UX Design',
        'fullstack': 'Full-Stack Development',
    };
    return labels[service] || service.charAt(0).toUpperCase() + service.slice(1);
};

const sanitize = (value = '') =>
    String(value).replace(/</g, '&lt;').replace(/>/g, '&gt;').trim();

// === HTML для входящего письма (внутреннее) ===
const buildHtmlBody = ({ name, email, message, service }) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Message</title>
  </head>
  <body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f5f7fa;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.1);overflow:hidden;">
            <tr>
              <td style="background:linear-gradient(135deg,#6c93ec,#5a7fdb);padding:40px 30px;text-align:center;">
                <h1 style="margin:0;color:#fff;font-size:28px;font-weight:600;">New Contact Form Submission</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:40px 30px;">
                <p style="margin:0 0 30px;color:#64748b;font-size:16px;line-height:1.6;">
                  You have received a new message from your website contact form.
                </p>
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:30px;background:#f8fafc;border-radius:8px;overflow:hidden;">
                  <tr>
                    <td style="padding:16px 20px;background:#6c93ec;color:#fff;font-weight:600;font-size:14px;text-transform:uppercase;letter-spacing:0.5px;">Name</td>
                    <td style="padding:16px 20px;background:#fff;color:#1e293b;font-size:15px;border-left:1px solid #e2e8f0;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding:16px 20px;background:#6c93ec;color:#fff;font-weight:600;font-size:14px;text-transform:uppercase;letter-spacing:0.5px;">Email</td>
                    <td style="padding:16px 20px;background:#fff;color:#1e293b;font-size:15px;border-left:1px solid #e2e8f0;">
                      <a href="mailto:${email}" style="color:#6c93ec;text-decoration:none;">${email}</a>
                    </td>
                  </tr>
                  ${service ? `
                  <tr>
                    <td style="padding:16px 20px;background:#6c93ec;color:#fff;font-weight:600;font-size:14px;text-transform:uppercase;letter-spacing:0.5px;">Service</td>
                    <td style="padding:16px 20px;background:#fff;color:#1e293b;font-size:15px;border-left:1px solid #e2e8f0;">${getServiceLabel(service)}</td>
                  </tr>` : ''}
                  <tr>
                    <td style="padding:16px 20px;background:#6c93ec;color:#fff;font-weight:600;font-size:14px;text-transform:uppercase;letter-spacing:0.5px;vertical-align:top;">Message</td>
                    <td style="padding:16px 20px;background:#fff;color:#1e293b;font-size:15px;border-left:1px solid #e2e8f0;line-height:1.6;">
                      <div style="white-space:pre-wrap;background:#f8fafc;padding:16px;border-radius:6px;border-left:3px solid #6c93ec;">
                        ${message.replace(/\n/g, '<br>')}
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;

// === HTML для автоответа (отправляется клиенту) ===
const buildAutoReplyHtml = (name) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${AUTO_REPLY_SUBJECT}</title>
  </head>
  <body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f9f9f9;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.1);overflow:hidden;">
            <tr>
              <td style="background:linear-gradient(135deg,#10b981,#059669);padding:40px 30px;text-align:center;">
                <h1 style="margin:0;color:#fff;font-size:26px;font-weight:600;">Thank You, ${sanitize(name)}!</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:40px 30px;color:#374151;font-size:16px;line-height:1.6;">
                <p>Hi ${sanitize(name)},</p>
                <p>We have received your message and will get back to you within <strong>24 hours</strong>.</p>
                <p>Thank you for your interest in our services!</p>
                <p style="margin-top:30px;font-size:14px;color:#94a3b8;">
                  Best regards,<br>
                  <strong>${SMTP_FROM_NAME}</strong>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;

exports.handler = async (event) => {
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers: RESPONSE_HEADERS, body: JSON.stringify({ success: true }) };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers: RESPONSE_HEADERS, body: JSON.stringify({ success: false, message: 'Method not allowed.' }) };
    }

    let payload;
    try {
        payload = JSON.parse(event.body || '{}');
    } catch (error) {
        return { statusCode: 400, headers: RESPONSE_HEADERS, body: JSON.stringify({ success: false, message: 'Invalid JSON.' }) };
    }

    const name = sanitize(payload.name);
    const email = sanitize(payload.email);
    const message = sanitize(payload.message);
    const service = payload.service ? sanitize(payload.service) : null;

    if (!name || !email || !message) {
        return { statusCode: 422, headers: RESPONSE_HEADERS, body: JSON.stringify({ success: false, message: 'Fill all fields.' }) };
    }

    const internalMail = {
        from: `"${SMTP_FROM_NAME}" <${SMTP_USER}>`,
        to: CONTACT_RECIPIENT,
        replyTo: `${name} <${email}>`,
        subject: `New Contact: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n${service ? `Service: ${getServiceLabel(service)}\n` : ''}Message:\n${message}`,
        html: buildHtmlBody({ name, email, message, service }),
        headers: {
            'X-Priority': '3',
            'Precedence': 'bulk',
            'List-Unsubscribe': `<mailto:${SMTP_USER}?subject=unsubscribe>, <https://yourdomain.com/unsubscribe>`,
        },
    };

    const autoReplyMail = {
        from: `"${SMTP_FROM_NAME}" <${SMTP_USER}>`,
        to: email,
        subject: AUTO_REPLY_SUBJECT,
        text: AUTO_REPLY_MESSAGE.replace('{name}', name),
        html: buildAutoReplyHtml(name),
        headers: {
            'X-Auto-Response-Suppress': 'All',
            'Auto-Submitted': 'auto-generated',
            'Precedence': 'auto',
            'List-Unsubscribe': `<mailto:${SMTP_USER}?subject=unsubscribe>`,
        },
    };

    try {
        await Promise.all([
            transporter.sendMail(internalMail),
            transporter.sendMail(autoReplyMail)
        ]);

        return {
            statusCode: 200,
            headers: RESPONSE_HEADERS,
            body: JSON.stringify({ success: true }),
        };
    } catch (error) {
        console.error('Email error:', error);
        return {
            statusCode: 500,
            headers: RESPONSE_HEADERS,
            body: JSON.stringify({ success: false, message: 'Failed to send email.' }),
        };
    }
};