const nodemailer = require('nodemailer');

const {
  SMTP_HOST = 'smtp.yandex.ru',
  SMTP_PORT = '465',
  SMTP_USER = 'web.developer0101@ya.ru',
  SMTP_PASS = 'arvrbpkxctevxhfx',
  SMTP_FROM_NAME = 'Levon Bakunts',
  CONTACT_RECIPIENT = 'web.developer0101@ya.ru',
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
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
                
                <!-- Action Button -->
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" style="padding-top: 20px;">
                      <a href="mailto:${email}" style="display: inline-block; padding: 14px 32px; background-color: #6c93ec; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; transition: background-color 0.3s;">
                        Reply to ${name}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="background-color: #f8fafc; padding: 20px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                <p style="margin: 0; color: #94a3b8; font-size: 13px;">
                  This email was sent from your website contact form.
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

const buildConfirmationHtml = ({ name, message, success = true }) => {
  if (!success) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f7fa;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f7fa; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                <tr>
                  <td style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 40px 30px; text-align: center;">
                    <div style="width: 64px; height: 64px; background-color: rgba(255, 255, 255, 0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="white"/>
                      </svg>
                    </div>
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Hi ${name || 'there'}!</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px 30px; text-align: center;">
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); border-radius: 50%; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="white"/>
                      </svg>
                    </div>
                    <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 24px; font-weight: 600;">
                      Message Delivery Failed
                    </h2>
                    <p style="margin: 0 0 30px 0; color: #64748b; font-size: 16px; line-height: 1.6;">
                      We're sorry, but we encountered an issue while processing your message. Please try again later or contact us directly.
                    </p>
                    <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 20px; margin-top: 20px;">
                      <p style="margin: 0; color: #991b1b; font-size: 14px; line-height: 1.6;">
                        <strong>What happened?</strong> There was a technical issue on our end. Your message was not delivered, but you can try submitting the form again.
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0; color: #64748b; font-size: 14px;">
                      We apologize for the inconvenience.
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
  }
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f7fa;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f7fa; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #6c93ec 0%, #5a7fdb 100%); padding: 40px 30px; text-align: center;">
                  <div style="width: 64px; height: 64px; background-color: rgba(255, 255, 255, 0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="white"/>
                    </svg>
                  </div>
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Hi ${name || 'there'}!</h1>
                </td>
              </tr>
              
              <!-- Success Message -->
              <tr>
                <td style="padding: 40px 30px; text-align: center;">
                  <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50%; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="white"/>
                    </svg>
                  </div>
                  <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 24px; font-weight: 600;">
                    Message Received Successfully!
                  </h2>
                  <p style="margin: 0 0 30px 0; color: #64748b; font-size: 16px; line-height: 1.6;">
                    Thanks for reaching out. We received your message and will get back to you shortly.
                  </p>
                </td>
              </tr>
              
              <!-- Your Message Section -->
              <tr>
                <td style="padding: 0 30px 30px;">
                  <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; border-left: 4px solid #6c93ec;">
                    <p style="margin: 0 0 16px 0; font-weight: 600; color: #1e293b; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
                      Your Message
                    </p>
                    <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                      <p style="margin: 0; white-space: pre-wrap; color: #475569; font-size: 15px; line-height: 1.7;">
                        ${message.replace(/\n/g, '<br>')}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
              
              <!-- Info Box -->
              <tr>
                <td style="padding: 0 30px 30px;">
                  <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="40" valign="top">
                          <div style="width: 32px; height: 32px; background-color: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="white"/>
                            </svg>
                          </div>
                        </td>
                        <td valign="top">
                          <p style="margin: 0; color: #1e40af; font-size: 14px; line-height: 1.6;">
                            <strong>What's next?</strong> Our team will review your message and respond within 24-48 hours. We appreciate your patience!
                          </p>
                        </td>
                      </tr>
                    </table>
                  </div>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0 0 12px 0; color: #1e293b; font-size: 15px; font-weight: 600;">
                    Best regards,
                  </p>
                  <p style="margin: 0; color: #64748b; font-size: 14px;">
                    ${SMTP_FROM_NAME}
                  </p>
                  <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                      This is an automated confirmation email. Please do not reply to this message.
                    </p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

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

  // Email to website owner (you)
  const mailOptions = {
    from: `"${SMTP_FROM_NAME}" <${SMTP_USER}>`,
    to: CONTACT_RECIPIENT,
    replyTo: `${name} <${email}>`,
    subject: `New Contact Form Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n${service ? `Service: ${getServiceLabel(service)}\n` : ''}Message:\n${message}`,
    html: buildHtmlBody({ name, email, message, service }),
  };

  // Confirmation email to sender
  const confirmationMailOptions = {
    from: `"${SMTP_FROM_NAME}" <${SMTP_USER}>`,
    to: email,
    subject: 'Thank you for contacting us!',
    text: `Hi ${name || 'there'}!\n\nThanks for reaching out. We received your message and will get back to you shortly.\n\nYour message:\n${message}\n\nBest regards,\n${SMTP_FROM_NAME}`,
    html: buildConfirmationHtml({ name, message, success: true }),
  };

  try {
    // Send email to owner first
    await transporter.sendMail(mailOptions);
    
    // Then send confirmation to sender
    try {
      await transporter.sendMail(confirmationMailOptions);
    } catch (confirmationError) {
      console.error('Failed to send confirmation email:', confirmationError);
      // Don't fail the whole request if confirmation fails
    }
    
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
    
    // Try to send error notification to sender
    try {
      const errorMailOptions = {
        from: `"${SMTP_FROM_NAME}" <${SMTP_USER}>`,
        to: email,
        subject: 'Message Delivery Failed',
        text: `Hi ${name || 'there'}!\n\nWe're sorry, but we encountered an issue while processing your message. Please try again later or contact us directly.\n\nWe apologize for the inconvenience.`,
        html: buildConfirmationHtml({ name, message, success: false }),
      };
      await transporter.sendMail(errorMailOptions);
    } catch (errorNotificationError) {
      console.error('Failed to send error notification:', errorNotificationError);
    }
    
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

