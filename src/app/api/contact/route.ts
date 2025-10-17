import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, subject, message } = await request.json();

    // Validate required fields
    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Modern, clean email template - fully responsive
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'codecompass.istad.co@gmail.com',
      replyTo: email,
      subject: `[CodeCompass] ${subject || 'New Contact'} - ${firstName} ${lastName}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <title>New Contact from CodeCompass</title>
          <!--[if mso]>
          <style type="text/css">
            body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
          </style>
          <![endif]-->
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          
          <!-- Wrapper -->
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f4f4f4;">
            <tr>
              <td style="padding: 40px 20px;">
                
                <!-- Main Container -->
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);">
                  
                  <!-- Header with accent -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 0;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                          <td style="padding: 32px 24px; text-align: center;">
                            <div style="display: inline-block; background-color: #CCF301; width: 48px; height: 4px; border-radius: 2px; margin-bottom: 16px;"></div>
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; line-height: 1.3;">
                              New Message Received
                            </h1>
                            <p style="margin: 8px 0 0; color: #CCF301; font-size: 13px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;">
                              CodeCompass Contact Form
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Content Area -->
                  <tr>
                    <td style="padding: 32px 24px;">
                      
                      <!-- Contact Info Card -->
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 24px; background-color: #f8f9fa; border-radius: 12px; overflow: hidden;">
                        <tr>
                          <td style="padding: 24px;">
                            <h2 style="margin: 0 0 16px; color: #1a1a1a; font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                              Contact Details
                            </h2>
                            
                            <!-- Name -->
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 16px;">
                              <tr>
                                <td style="padding: 0;">
                                  <p style="margin: 0 0 4px; color: #666666; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                    Name
                                  </p>
                                  <p style="margin: 0; color: #1a1a1a; font-size: 16px; font-weight: 600;">
                                    ${firstName}${lastName ? ' ' + lastName : ''}
                                  </p>
                                </td>
                              </tr>
                            </table>
                            
                            <!-- Email -->
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: ${subject ? '16px' : '0'};">
                              <tr>
                                <td style="padding: 0;">
                                  <p style="margin: 0 0 4px; color: #666666; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                    Email
                                  </p>
                                  <p style="margin: 0;">
                                    <a href="mailto:${email}" style="color: #000000; font-size: 16px; font-weight: 600; text-decoration: none; border-bottom: 2px solid #CCF301; padding-bottom: 2px;">
                                      ${email}
                                    </a>
                                  </p>
                                </td>
                              </tr>
                            </table>
                            
                            ${subject ? `
                            <!-- Subject -->
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                              <tr>
                                <td style="padding: 0;">
                                  <p style="margin: 0 0 4px; color: #666666; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                    Subject
                                  </p>
                                  <p style="margin: 0; color: #1a1a1a; font-size: 16px; font-weight: 600;">
                                    ${subject}
                                  </p>
                                </td>
                              </tr>
                            </table>
                            ` : ''}
                            
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Message Card -->
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 24px; background-color: #ffffff; border: 2px solid #f0f0f0; border-left: 4px solid #CCF301; border-radius: 12px;">
                        <tr>
                          <td style="padding: 24px;">
                            <p style="margin: 0 0 12px; color: #666666; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                              Message
                            </p>
                            <div style="color: #333333; font-size: 15px; line-height: 1.6; white-space: pre-wrap; word-wrap: break-word;">
                              ${message}
                            </div>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- CTA Button -->
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: center; padding: 8px 0;">
                            <a href="mailto:${email}" style="display: inline-block; background-color: #CCF301; color: #000000; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 700; font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(204, 243, 1, 0.3); transition: all 0.3s ease;">
                              Reply to ${firstName}
                            </a>
                          </td>
                        </tr>
                      </table>
                      
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f8f9fa; padding: 24px; text-align: center; border-top: 1px solid #e0e0e0;">
                      <p style="margin: 0 0 8px; color: #666666; font-size: 13px; line-height: 1.5;">
                        This message was sent from the CodeCompass contact form
                      </p>
                      <p style="margin: 0; color: #999999; font-size: 12px;">
                        © ${new Date().getFullYear()} CodeCompass. All rights reserved.
                      </p>
                    </td>
                  </tr>
                  
                </table>
                
              </td>
            </tr>
          </table>
          
        </body>
        </html>
      `,
      text: `
NEW CONTACT FROM CODECOMPASS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTACT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${firstName}${lastName ? ' ' + lastName : ''}
Email: ${email}
${subject ? `Subject: ${subject}\n` : ''}
MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This message was sent from the CodeCompass contact form.
© ${new Date().getFullYear()} CodeCompass. All rights reserved.
      `.trim(),
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}