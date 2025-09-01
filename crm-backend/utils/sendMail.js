// utils/sendMail.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER || 'care@pennyanddebt.in',
    pass: process.env.MAIL_PASS || 'your-app-password', // Use env var in production
  },
});

async function sendMail({ subject, text, html, from, to }) {
  const mailOptions = {
    from: from || 'care@pennyanddebt.in',
    to: to || 'care@pennyanddebt.in',
    subject,
    text,
    html,
  };
  return transporter.sendMail(mailOptions);
}

module.exports = sendMail;
