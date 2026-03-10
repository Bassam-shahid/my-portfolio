import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Validate required email environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn('Email credentials not configured. Email notifications will not be sent.');
}

/**
 * Create Nodemailer transporter
 * @returns {import('nodemailer').Transporter} Nodemailer transporter
 */
function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

/**
 * Send contact form notification email
 * @param {object} contactData - Contact form data
 * @param {string} contactData.name - Sender name
 * @param {string} contactData.email - Sender email
 * @param {string} contactData.message - Message content
 * @returns {Promise<{ success: boolean, error?: string }>} Send result
 */
export async function sendContactNotification(contactData) {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${contactData.name}`,
      text: `
New Contact Form Submission
----------------------------
Name: ${contactData.name}
Email: ${contactData.email}
Message:
${contactData.message}
      `.trim(),
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${contactData.name}</p>
<p><strong>Email:</strong> ${contactData.email}</p>
<p><strong>Message:</strong></p>
<p>${contactData.message.replace(/\n/g, '<br>')}</p>
      `.trim()
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Failed to send email notification:', error.message);
    return { 
      success: false, 
      error: 'Failed to send email notification' 
    };
  }
}

export default { sendContactNotification };
