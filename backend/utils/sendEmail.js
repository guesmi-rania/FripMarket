import nodemailer from 'nodemailer';

// Uses a real Gmail account to send email — NOT a fake/simulated sender.
// Required env vars on Render:
//   EMAIL_USER = your.address@gmail.com
//   EMAIL_PASS = a 16-character Gmail "App Password" (NOT your normal Gmail password)
//
// To generate an App Password:
//   1. Enable 2-Step Verification on the Gmail account (myaccount.google.com/security)
//   2. Go to myaccount.google.com/apppasswords
//   3. Create an app password named e.g. "FripMarket" and copy the 16-character code
//   4. Paste it as EMAIL_PASS (no spaces)

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('EMAIL_USER / EMAIL_PASS are not set — cannot send real emails.');
    throw new Error('Email service not configured');
  }

  await transporter.sendMail({
    from: `"FripMarket" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};