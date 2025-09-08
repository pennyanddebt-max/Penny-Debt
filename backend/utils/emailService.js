const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email
const sendOTPEmail = async (email, name, otp) => {
  const mailOptions = {
    from: `"Penny & Debt" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Email Verification - Your OTP Code',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0070f3, #005bb5); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Penny & Debt</h1>
          <p style="color: #e3f2fd; margin: 10px 0 0 0;">Debt Relief Solutions</p>
        </div>
        
        <div style="padding: 40px 30px; background: #f8f9fa;">
          <h2 style="color: #223759; margin-bottom: 20px;">Hello ${name},</h2>
          
          <p style="color: #555; font-size: 16px; line-height: 1.6;">
            Thank you for applying for our debt relief program. To verify your email address, please use the OTP code below:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <div style="background: #0070f3; color: white; font-size: 32px; font-weight: bold; padding: 20px; border-radius: 10px; letter-spacing: 5px; display: inline-block;">
              ${otp}
            </div>
          </div>
          
          <p style="color: #555; font-size: 14px; line-height: 1.6;">
            This OTP is valid for 5 minutes only. If you didn't request this verification, please ignore this email.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #888; font-size: 12px; margin: 0;">
              This is an automated email from Penny & Debt. Please do not reply to this email.
            </p>
          </div>
        </div>
        
        <div style="background: #223759; padding: 20px; text-align: center;">
          <p style="color: #ccc; margin: 0; font-size: 12px;">
            © 2024 Penny & Debt. All rights reserved.
          </p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  generateOTP,
  sendOTPEmail
};