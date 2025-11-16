const nodemailer = require('nodemailer');

const {
    SMTP_HOST = 'sandbox.smtp.mailtrap.io',
    SMTP_PORT = '2525',
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM_NAME = 'Web Development Agency',
    CONTACT_RECIPIENT = 'web.developer0101@ya.ru',
} = process.env;

const RESPONSE_HEADERS = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
};

// Validate SMTP credentials
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
    // Add connection timeout and retry options
    pool: true,
    maxConnections: 1,
    maxMessages: 3,
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

const buildHtmlBody = ({ name, email, message, service }) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>New Contact Form Message</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f7fa;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f7fa; padding: 40px 20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
            <!-- Header -->
            <tr>
              <td style="background: linear-gradient(135deg, #6c93ec 0%, #5a7fdb 100%); padding: 40px 30px; text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">New Contact Form Submission</h1>
              </td>
            </tr>
            
            <!-- Content -->
            <tr>
              <td style="padding: 40px 30px;">
                <p style="margin: 0 0 30px 0; color: #64748b; font-size: 16px; line-height: 1.6;">
                  You have received a new message from your website contact form.
                </p>
                
                <!-- Table with form data -->
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 30px; background-color: #f8fafc; border-radius: 8px; overflow: hidden;">
                  <tr>
                    <td style="padding: 16px 20px; background-color: #6c93ec; color: #ffffff; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
                      Name
                    </td>
                    <td style="padding: 16px 20px; background-color: #ffffff; color: #1e293b; font-size: 15px; border-left: 1px solid #e2e8f0;">
                      ${name}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 16px 20px; background-color: #6c93ec; color: #ffffff; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
                      Email
                    </td>
                    <td style="padding: 16px 20px; background-color: #ffffff; color: #1e293b; font-size: 15px; border-left: 1px solid #e2e8f0;">
                      <a href="mailto:${email}" style="color: #6c93ec; text-decoration: none;">${email}</a>
                    </td>
                  </tr>
                  ${service ? `
                  <tr>
                    <td style="padding: 16px 20px; background-color: #6c93ec; color: #ffffff; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
                      Service
                    </td>
                    <td style="padding: 16px 20px; background-color: #ffffff; color: #1e293b; font-size: 15px; border-left: 1px solid #e2e8f0;">
                      ${getServiceLabel(service)}
                    </td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="padding: 16px 20px; background-color: #6c93ec; color: #ffffff; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top;">
                      Message
                    </td>
                    <td style="padding: 16px 20px; background-color: #ffffff; color: #1e293b; font-size: 15px; border-left: 1px solid #e2e8f0; line-height: 1.6;">
                      <div style="white-space: pre-wrap; background-color: #f8fafc; padding: 16px; border-radius: 6px; border-left: 3px solid #6c93ec;">
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
    const service = payload.service ? sanitize(payload.service) : null;

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
        subject: `New Contact Form Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n${service ? `Service: ${getServiceLabel(service)}\n` : ''}Message:\n${message}`,
        html: buildHtmlBody({ name, email, message, service }),
        headers: {
            'X-Priority': '1',
            'X-MSMail-Priority': 'High',
            'Importance': 'high',
            'X-Mailer': 'NodeMailer',
            'Date': new Date().toUTCString(),
            'MIME-Version': '1.0',
        },
        messageId: `<${Date.now()}-${Math.random().toString(36).substring(7)}@${SMTP_HOST || 'mailtrap.io'}>`,
    };

    try {
        // Verify transporter configuration before sending
        if (!SMTP_USER || !SMTP_PASS) {
            throw new Error('SMTP credentials are not configured. Please set SMTP_USER and SMTP_PASS environment variables in Netlify.');
        }

        // Verify connection
        await transporter.verify();
        
        // Send email
        const info = await transporter.sendMail(mailOptions);
        
        console.log('Email sent successfully:', info.messageId);
        
        return {
            statusCode: 200,
            headers: RESPONSE_HEADERS,
            body: JSON.stringify({ success: true, messageId: info.messageId }),
        };
    } catch (error) {
        console.error('Error sending email:', error);
        
        // Provide more helpful error messages
        let errorMessage = error.message || 'Failed to send email';
        
        if (error.code === 'EAUTH') {
            errorMessage = 'SMTP authentication failed. Please check your credentials.';
        } else if (error.code === 'ECONNECTION') {
            errorMessage = 'Could not connect to SMTP server. Please check your SMTP settings.';
        } else if (error.code === 'ETIMEDOUT') {
            errorMessage = 'SMTP connection timed out. Please try again later.';
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