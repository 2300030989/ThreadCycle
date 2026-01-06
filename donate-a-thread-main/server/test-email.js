// Email Test Script
// This script tests the email configuration
const sendEmail = require('./utils/mailer');
require('dotenv').config();

const testEmail = async () => {
  console.log('🧪 Testing Email Configuration...\n');
  
  // Check if email credentials are configured
  if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'your_email@gmail.com') {
    console.error('❌ EMAIL_USER not configured in .env file');
    console.log('📝 Please update the EMAIL_USER in server/.env with your Gmail address');
    return;
  }
  
  if (!process.env.EMAIL_PASS || process.env.EMAIL_PASS === 'your_app_password') {
    console.error('❌ EMAIL_PASS not configured in .env file');
    console.log('📝 Please update the EMAIL_PASS in server/.env with your Gmail App Password');
    console.log('ℹ️  See EMAIL_SETUP.md for instructions on generating an App Password');
    return;
  }
  
  console.log(`📧 Sending test email to: ${process.env.EMAIL_USER}\n`);
  
  const testSubject = 'DonateThread - Email Test';
  const testHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #16a34a; padding: 20px; text-align: center; color: white;">
        <h1 style="margin: 0;">✅ Email Test Successful!</h1>
      </div>
      <div style="padding: 20px;">
        <p>Hi there,</p>
        <p>This is a test email from your DonateThread application.</p>
        
        <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #16a34a;">
          <h3 style="margin-top: 0; color: #166534;">Configuration Status</h3>
          <p style="margin: 8px 0;">✅ Email service is working correctly</p>
          <p style="margin: 8px 0;">✅ SMTP connection successful</p>
          <p style="margin: 8px 0;">✅ Authentication passed</p>
        </div>

        <p>Your email notifications for pickup confirmations are now ready!</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">Test completed at: ${new Date().toLocaleString()}</p>
        </div>
      </div>
      <div style="background-color: #f3f4f6; padding: 15px; text-align: center; color: #6b7280; font-size: 12px;">
        <p style="margin: 5px 0;">🌱 DonateThread Email System</p>
        <p style="margin: 5px 0;">&copy; ${new Date().getFullYear()} DonateThread. All rights reserved.</p>
      </div>
    </div>
  `;
  
  try {
    const result = await sendEmail(process.env.EMAIL_USER, testSubject, testHtml);
    
    if (result) {
      console.log('✅ Email sent successfully!');
      console.log(`📬 Check your inbox at: ${process.env.EMAIL_USER}`);
      console.log('\n✨ Email configuration is working correctly!');
      console.log('🚀 You can now test the pickup scheduling feature in your app');
    } else {
      console.error('❌ Email sending failed');
      console.log('\n📋 Troubleshooting steps:');
      console.log('1. Verify your Gmail address is correct');
      console.log('2. Ensure you\'re using an App Password, not your regular password');
      console.log('3. Check that 2-Factor Authentication is enabled on your Google account');
      console.log('4. Generate a new App Password at: https://myaccount.google.com/apppasswords');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n📋 Common issues:');
    console.log('- Invalid credentials: Check EMAIL_USER and EMAIL_PASS in .env');
    console.log('- Connection timeout: Check your internet connection');
    console.log('- Authentication failed: Generate a new App Password');
  }
};

testEmail();
