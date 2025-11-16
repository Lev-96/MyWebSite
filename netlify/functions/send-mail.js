const nodemailer = require('nodemailer');

const {
  SMTP_HOST = 'smtp.yandex.com',
  SMTP_PORT = '587',
  SMTP_USER = 'web.developer0101@yandex.com',
  SMTP_PASS = 'arvrbpkxctevxhfx',
  SMTP_FROM_NAME = 'Web Development by Levon',
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
    requireTLS: Number(SMTP_PORT) === 587,
    auth: {
        user: SMTP_USER.trim(),
        pass: SMTP_PASS.trim(),
    },
    tls: {
        rejectUnauthorized: false
    },
    pool: true,
    maxConnections: 1,
    maxMessages: 1,
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
            <tr>
              <td style="background: linear-gradient(135deg, #6c93ec 0%, #5a7fdb 100%); padding: 40px 30px; text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">New Contact Form Submission</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 40px 30px;">
                <p style="margin: 0 0 30px 0; color: #64748b; font-size: 16px; line-height: 1.6;">
                  You have received a new message from your website contact form.
                </p>
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

const buildConfirmationEmail = (name) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="format-detection" content="telephone=no">
    <title>Thank you for contacting us!</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f7fa;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f7fa; padding: 40px 20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
            <tr>
              <td style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 40px 30px; text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700;">Thank You, ${sanitize(name)}!</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 40px 30px;">
                <p style="margin: 0 0 20px 0; color: #1e293b; font-size: 16px; line-height: 1.6;">
                  Hi ${sanitize(name)},
                </p>
                <p style="margin: 0 0 20px 0; color: #64748b; font-size: 16px; line-height: 1.6;">
                  We have received your message and will get back to you within <strong style="color: #1e293b;">24 hours</strong>.
                </p>
                
                <p style="margin: 0 0 30px 0; color: #64748b; font-size: 16px; line-height: 1.6;">
                  Thank you for your interest in our services!
                </p>
                
                <p style="margin: 0 0 10px 0; color: #64748b; font-size: 16px; line-height: 1.6;">
                  Best regards,
                </p>
                
                <p style="margin: 0; color: #1e293b; font-size: 16px; font-weight: 600;">
                  ${SMTP_FROM_NAME}
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

const buildErrorEmail = (name) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="format-detection" content="telephone=no">
    <title>Message Delivery Issue</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f7fa;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f7fa; padding: 40px 20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
            <tr>
              <td style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 40px 30px; text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700;">Message Delivery Issue</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 40px 30px;">
                <p style="margin: 0 0 20px 0; color: #1e293b; font-size: 16px; line-height: 1.6;">
                  Hi ${sanitize(name)},
                </p>
                <p style="margin: 0 0 20px 0; color: #64748b; font-size: 16px; line-height: 1.6;">
                  We encountered a technical issue while processing your message. Unfortunately, we were unable to deliver it at this time.
                </p>
                
                <p style="margin: 0 0 20px 0; color: #64748b; font-size: 16px; line-height: 1.6;">
                  Please try submitting your message again, or contact us directly at <a href="mailto:${CONTACT_RECIPIENT}" style="color: #6c93ec; text-decoration: none;">${CONTACT_RECIPIENT}</a>.
                </p>
                
                <p style="margin: 0 0 30px 0; color: #64748b; font-size: 16px; line-height: 1.6;">
                  We apologize for any inconvenience this may have caused.
                </p>
                
                <p style="margin: 0 0 10px 0; color: #64748b; font-size: 16px; line-height: 1.6;">
                  Best regards,
                </p>
                
                <p style="margin: 0; color: #1e293b; font-size: 16px; font-weight: 600;">
                  ${SMTP_FROM_NAME}
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

    const fromEmail = SMTP_USER.trim();

    const adminMailOptions = {
        from: `"${SMTP_FROM_NAME}" <${fromEmail}>`,
        to: CONTACT_RECIPIENT,
        replyTo: `${name} <${email}>`,
        subject: `New Contact Form Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n${service ? `Service: ${getServiceLabel(service)}\n` : ''}Message:\n${message}`,
        html: buildHtmlBody({ name, email, message, service }),
        headers: {
            'Date': new Date().toUTCString(),
            'Message-ID': `<${Date.now()}-${Math.random().toString(36).substring(7)}@${SMTP_HOST.replace('smtp.', '').replace('.com', '')}>`,
        },
    };

    const sendClientEmail = async (mailOptions, emailType) => {
        try {
            console.log(`Attempting to send ${emailType} email to client: ${email}`);
            const result = await transporter.sendMail(mailOptions);
            console.log(`${emailType} email sent successfully to client:`, result.messageId);
            return { success: true, messageId: result.messageId };
        } catch (clientError) {
            console.error(`Failed to send ${emailType} email to client:`, {
                error: clientError.message,
                code: clientError.code,
                to: email,
                from: fromEmail
            });
            return { success: false, error: clientError.message };
        }
    };

    try {
        console.log('Sending admin notification...');
        await transporter.sendMail(adminMailOptions);
        console.log('Admin notification sent successfully');

        const confirmationMailOptions = {
            from: `"${SMTP_FROM_NAME}" <${fromEmail}>`,
            to: email,
            subject: 'Thank you for contacting us!',
            text: `Hi ${name},\n\nWe have received your message and will get back to you within 24 hours.\n\nThank you for your interest in our services!\n\nBest regards,\n${SMTP_FROM_NAME}`,
            html: buildConfirmationEmail(name),
            headers: {
                'Date': new Date().toUTCString(),
                'Message-ID': `<${Date.now()}-${Math.random().toString(36).substring(7)}@${SMTP_HOST.replace('smtp.', '').replace('.com', '')}>`,
            },
        };

        const confirmationResult = await sendClientEmail(confirmationMailOptions, 'confirmation');
        
        if (!confirmationResult.success) {
            console.error('CRITICAL: Failed to send confirmation email to client');
            try {
                const simpleConfirmation = {
                    from: fromEmail,
                    to: email,
                    subject: 'Thank you for contacting us!',
                    text: `Hi ${name},\n\nWe have received your message and will get back to you within 24 hours.\n\nThank you for your interest in our services!\n\nBest regards,\n${SMTP_FROM_NAME}`,
                };
                await transporter.sendMail(simpleConfirmation);
                console.log('Simple confirmation email sent successfully');
            } catch (retryError) {
                console.error('Failed to send even simple confirmation:', retryError.message);
            }
        }

        return {
            statusCode: 200,
            headers: RESPONSE_HEADERS,
            body: JSON.stringify({ 
                success: true,
                clientEmailSent: confirmationResult.success
            }),
        };
    } catch (error) {
        console.error('Error sending admin email:', error);

        const errorMailOptions = {
            from: `"${SMTP_FROM_NAME}" <${fromEmail}>`,
            to: email,
            subject: 'Message Delivery Issue',
            text: `Hi ${name},\n\nWe encountered a technical issue while processing your message. Unfortunately, we were unable to deliver it at this time.\n\nPlease try submitting your message again, or contact us directly at ${CONTACT_RECIPIENT}.\n\nWe apologize for any inconvenience this may have caused.\n\nBest regards,\n${SMTP_FROM_NAME}`,
            html: buildErrorEmail(name),
            headers: {
                'Date': new Date().toUTCString(),
                'Message-ID': `<${Date.now()}-${Math.random().toString(36).substring(7)}@${SMTP_HOST.replace('smtp.', '').replace('.com', '')}>`,
            },
        };

        const errorResult = await sendClientEmail(errorMailOptions, 'error');
        
        if (!errorResult.success) {
            console.error('CRITICAL: Failed to send error notification to client');
            try {
                const simpleError = {
                    from: fromEmail,
                    to: email,
                    subject: 'Message Delivery Issue',
                    text: `Hi ${name},\n\nWe encountered a technical issue while processing your message. Please try again or contact us at ${CONTACT_RECIPIENT}.\n\nBest regards,\n${SMTP_FROM_NAME}`,
                };
                await transporter.sendMail(simpleError);
                console.log('Simple error notification sent successfully');
            } catch (retryError) {
                console.error('Failed to send even simple error notification:', retryError.message);
            }
        }

        return {
            statusCode: 500,
            headers: RESPONSE_HEADERS,
            body: JSON.stringify({ 
                success: false, 
                message: error.message,
                clientEmailSent: errorResult.success
            }),
        };
    }
};