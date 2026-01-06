# Email Configuration Guide

## Overview
This application sends automated email confirmations to customers when they schedule a pickup for clothing donations.

## Gmail Configuration Steps

### 1. Enable 2-Factor Authentication
- Go to [Google Account Security](https://myaccount.google.com/security)
- Enable 2-Step Verification if not already enabled

### 2. Generate App Password
- Visit [App Passwords](https://myaccount.google.com/apppasswords)
- Select "Mail" as the app
- Select "Other" as the device and name it (e.g., "DonateThread App")
- Click "Generate"
- Copy the 16-character password (no spaces)

### 3. Update .env File
Edit `server/.env` and replace:
```env
EMAIL_USER=your_actual_email@gmail.com
EMAIL_PASS=your_16_char_app_password
```

### 4. Test Email Configuration
Run the test script:
```bash
cd server
node test-email.js
```

## Email Features

### When Pickup is Scheduled
Customers receive an email with:
- ✅ Order confirmation
- 📋 Order ID and details
- 📅 Scheduled date and time
- 📍 Pickup address
- 👕 Items and condition
- 🔗 Link to dashboard

### Email Template
The email includes:
- Professional HTML design
- Order details in a formatted box
- What to expect section
- Link to dashboard
- Footer with contact information

## Troubleshooting

### Email Not Sending
1. **Check credentials**: Verify EMAIL_USER and EMAIL_PASS in .env
2. **App password**: Make sure you're using App Password, not regular password
3. **2FA enabled**: Gmail requires 2-Factor Authentication for App Passwords
4. **Check console**: Server logs will show email sending status

### Error Messages
- "Invalid login": Wrong email or app password
- "Connection timeout": Network/firewall issue
- "Authentication failed": Need to generate new app password

## Alternative Email Services

### Using Other Services
Edit `server/utils/mailer.js` and change the service:

**Outlook/Hotmail:**
```javascript
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

**Custom SMTP:**
```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

## Security Notes
- ⚠️ Never commit .env file to version control
- 🔒 Keep your app password secure
- 🔄 Rotate app passwords periodically
- 📝 Add .env to .gitignore

## Development Mode
For testing without actual email sending, you can comment out the email sending line in `server/routes/pickupRoutes.js`:

```javascript
// sendEmail(user.email, emailSubject, emailHtml)
//   .then(() => console.log('Email sent successfully'))
//   .catch(err => console.error('Failed to send email:', err));
console.log('Email would be sent to:', user.email);
```
