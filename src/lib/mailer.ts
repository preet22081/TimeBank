import nodemailer from 'nodemailer';

export const sendBookingEmail = async ({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or use host, port for SMTP
    auth: {
      user: process.env.EMAIL_USER, // your email
      pass: process.env.EMAIL_PASS, // app-specific password
    },
  });

  await transporter.sendMail({
    from: `"TimeBank" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
};
