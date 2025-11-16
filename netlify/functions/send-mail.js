const nodemailer = require('nodemailer');

const {
    SMTP_HOST = 'sandbox.smtp.mailtrap.io',
    SMTP_PORT = '2525',
    SMTP_USER = '4e7e44be49a49d',
    SMTP_PASS = 'c15abb0b28e005',
    SMTP_FROM_NAME = 'Web Development Agency',
    CONTACT_RECIPIENT = 'web.developer0101@ya.ru',
} = process.env;

const RESPONSE_HEADERS = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
};

// Функция для получения текста автоответа
const getAutoReplyMessage = (name) => {
    return `Hi ${name},\n\nWe have received your message and will get back to you within 24 hours.\n\nThank you for your interest in our services!\n\nBest regards,\n${SMTP_FROM_NAME}`;
};

// Проверка наличия учетных данных
if (!SMTP_USER || !SMTP_PASS) {
    console.error('SMTP credentials are missing. Please set SMTP_USER and SMTP_PASS environment variables.');
}

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
    // Для Mailtrap используем STARTTLS
    requireTLS: Number(SMTP_PORT) === 2525,
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
    <title>Thank you for contacting us!</title>
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

    // === 1. Письмо ВАМ (внутреннее) ===
    const internalMail = {
        from: `"${SMTP_FROM_NAME}" <${SMTP_USER}>`,
        to: CONTACT_RECIPIENT,
        replyTo: `${name} <${email}>`,
        subject: `New Contact: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n${service ? `Service: ${getServiceLabel(service)}\n` : ''}Message:\n${message}`,
        html: buildHtmlBody({ name, email, message, service }),
        headers: {
            'X-Priority': '3', // Нормальный приоритет
            'Precedence': 'bulk',
            'List-Unsubscribe': `<mailto:${SMTP_USER}?subject=unsubscribe>, <https://yourdomain.com/unsubscribe>`,
        },
    };

    // === 2. АВТООТВЕТ ОТПРАВИТЕЛЮ ===
    const autoReplyMail = {
        from: `"${SMTP_FROM_NAME}" <${SMTP_USER}>`, // Только ваш email!
        to: email,
        subject: 'Thank you for contacting us!',
        text: getAutoReplyMessage(name),
        html: buildAutoReplyHtml(name),
        headers: {
            'X-Auto-Response-Suppress': 'All',
            'Auto-Submitted': 'auto-generated',
            'Precedence': 'auto',
            'List-Unsubscribe': `<mailto:${SMTP_USER}?subject=unsubscribe>`,
        },
        // Важно: НЕ используем replyTo с чужим email!
    };

    try {
        // Проверка учетных данных перед отправкой
        if (!SMTP_USER || !SMTP_PASS) {
            throw new Error('SMTP credentials are not configured. Please set SMTP_USER and SMTP_PASS environment variables in Netlify.');
        }

        // Проверка соединения (опционально, но полезно для диагностики)
        try {
            await transporter.verify();
            console.log('SMTP connection verified successfully');
        } catch (verifyError) {
            console.warn('SMTP verification warning:', verifyError.message);
            // Продолжаем отправку, даже если verify не прошел
        }

        // Отправляем оба письма параллельно
        const [internalResult, autoReplyResult] = await Promise.all([
            transporter.sendMail(internalMail),
            transporter.sendMail(autoReplyMail)
        ]);

        console.log('Internal mail sent:', internalResult.messageId);
        console.log('Auto-reply sent:', autoReplyResult.messageId);

        return {
            statusCode: 200,
            headers: RESPONSE_HEADERS,
            body: JSON.stringify({ 
                success: true,
                messageId: internalResult.messageId,
                confirmationId: autoReplyResult.messageId
            }),
        };
    } catch (error) {
        console.error('Email sending error:', error);
        
        // Более детальные сообщения об ошибках
        let errorMessage = 'Failed to send email.';
        
        if (error.code === 'EAUTH') {
            errorMessage = 'SMTP authentication failed. Please check your credentials.';
        } else if (error.code === 'ECONNECTION') {
            errorMessage = 'Could not connect to SMTP server. Please check your SMTP settings.';
        } else if (error.code === 'ETIMEDOUT') {
            errorMessage = 'SMTP connection timed out. Please try again later.';
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        return {
            statusCode: 500,
            headers: RESPONSE_HEADERS,
            body: JSON.stringify({ 
                success: false, 
                message: errorMessage,
                error: error.code || 'UNKNOWN_ERROR'
            }),
        };
    }
};