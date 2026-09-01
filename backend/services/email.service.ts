import nodemailer from 'nodemailer';
import { env } from '../config';
import { logger } from '../utils/logger';

export interface EmailOptions {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    this.initTransporter();
  }

  private initTransporter() {
    if (!env.SMTP_PASS) {
      logger.warn('SMTP_PASS is not configured. Email dispatch will be skipped until configured in .env');
      return;
    }

    try {
      this.transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        secure: env.SMTP_SECURE, // true for 465, false for other ports
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      logger.info(`SMTP Transporter initialized for ${env.SMTP_USER} via ${env.SMTP_HOST}:${env.SMTP_PORT}`);
    } catch (error: any) {
      logger.error('Failed to initialize SMTP transporter', error);
      this.transporter = null;
    }
  }

  /**
   * Send formatted contact notification email directly to recipient inbox
   */
  async sendContactNotification(data: EmailOptions): Promise<boolean> {
    // Re-check transporter in case env was updated dynamically
    if (!this.transporter && env.SMTP_PASS) {
      this.initTransporter();
    }

    if (!this.transporter) {
      logger.warn('SMTP transporter not available. Saved message to database without email dispatch.');
      return false;
    }

    const emailSubject = `🔔 [Portfolio Inquiry] ${data.subject?.trim() || 'New message from ' + data.name}`;
    const formattedDate = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kathmandu',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #c026d3 0%, #9333ea 50%, #7c3aed 100%); padding: 30px 24px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 6px 0 0 0; font-size: 13px; opacity: 0.9; }
    .content { padding: 28px 24px; }
    .info-grid { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-bottom: 22px; }
    .info-row { display: flex; margin-bottom: 10px; font-size: 14px; }
    .info-row:last-child { margin-bottom: 0; }
    .info-label { font-weight: 700; color: #64748b; width: 80px; flex-shrink: 0; }
    .info-val { color: #0f172a; font-weight: 600; }
    .info-val a { color: #9333ea; text-decoration: none; }
    .message-box { background: #ffffff; border-left: 4px solid #9333ea; padding: 16px 20px; border-radius: 0 10px 10px 0; background: #faf5ff; margin-bottom: 24px; }
    .message-title { font-size: 13px; font-weight: 700; text-transform: uppercase; color: #7c3aed; margin-bottom: 8px; letter-spacing: 0.5px; }
    .message-text { font-size: 15px; color: #334155; white-space: pre-wrap; line-height: 1.6; }
    .reply-action { text-align: center; margin-top: 24px; }
    .reply-btn { display: inline-block; background: #9333ea; color: #ffffff !important; padding: 12px 28px; border-radius: 9999px; text-decoration: none; font-weight: 700; font-size: 14px; box-shadow: 0 4px 14px rgba(147, 51, 234, 0.3); }
    .footer { text-align: center; padding: 20px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; background: #fafafa; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Portfolio Inquiry</h1>
      <p>Direct submission from rijanregmi.com.np</p>
    </div>
    <div class="content">
      <div class="info-grid">
        <div class="info-row"><span class="info-label">Sender:</span> <span class="info-val">${data.name}</span></div>
        <div class="info-row"><span class="info-label">Email:</span> <span class="info-val"><a href="mailto:${data.email}">${data.email}</a></span></div>
        <div class="info-row"><span class="info-label">Subject:</span> <span class="info-val">${data.subject || 'General Inquiry'}</span></div>
        <div class="info-row"><span class="info-label">Received:</span> <span class="info-val">${formattedDate} (NPT)</span></div>
      </div>

      <div class="message-box">
        <div class="message-title">Message Body</div>
        <div class="message-text">${data.message}</div>
      </div>

      <div class="reply-action">
        <a href="mailto:${data.email}?subject=Re:%20${encodeURIComponent(data.subject || 'Your inquiry on rijanregmi.com.np')}" class="reply-btn">
          Reply Directly to ${data.name}
        </a>
      </div>
    </div>
    <div class="footer">
      This notification was automatically dispatched by your portfolio backend.
    </div>
  </div>
</body>
</html>
    `;

    try {
      const info = await this.transporter.sendMail({
        from: `"Rijan Regmi Portfolio" <${env.SMTP_USER}>`,
        to: env.CONTACT_RECEIVER_EMAIL,
        replyTo: `"${data.name}" <${data.email}>`,
        subject: emailSubject,
        text: `New Portfolio Message from ${data.name} (${data.email}):\n\nSubject: ${data.subject || 'N/A'}\nDate: ${formattedDate}\n\nMessage:\n${data.message}`,
        html: htmlContent,
      });

      logger.info(`Contact notification email sent successfully! MessageId: ${info.messageId}`);
      return true;
    } catch (error: any) {
      logger.error('Failed to send contact notification email via SMTP', error);
      return false;
    }
  }
}

export const emailService = new EmailService();
