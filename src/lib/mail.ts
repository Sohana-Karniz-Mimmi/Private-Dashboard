import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <p>You requested a password reset.</p>
      <p>Click this <a href="${resetUrl}">link</a> to reset your password.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  });
} 