import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // ✅ use environment variable
    pass: process.env.EMAIL_PASS, // ✅ use app password securely
  },
});

export const sendBookingEmail = async ({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER, // ✅ consistent with transporter
    to,
    subject,
    text,
  });
};
