# 🚀 Quick Start Guide

## Start the Application

### 1. Start Backend Server
```bash
cd server
node index.js
```
✅ Server running on http://localhost:5000

### 2. Start Frontend (New Terminal)
```bash
npm run dev
```
✅ Frontend running on http://localhost:8081

## ⚙️ Configure Email (Important!)

### Quick Setup
1. Open `server/.env`
2. Replace:
   ```env
   EMAIL_USER=your_actual_email@gmail.com
   EMAIL_PASS=your_16_char_app_password
   ```
3. Get App Password: https://myaccount.google.com/apppasswords
4. Test: `node server/test-email.js`

📖 Detailed guide: `server/EMAIL_SETUP.md`

## 🧪 Test the Application

### 1. Create Account
- Go to http://localhost:8081/signup
- Fill in: Name, Email, Password, Phone
- Click "Sign Up"

### 2. Schedule Pickup
- Go to "Schedule Pickup"
- Fill in pickup details
- Submit form
- ✉️ **Check your email for confirmation!**

### 3. View Dashboard
- See your scheduled pickups
- Track donation history

## 📧 Email Features

When a user schedules a pickup, they automatically receive:
- ✅ Order confirmation email
- 📋 Complete order details
- 📅 Pickup date and time
- 📍 Address confirmation
- 🔗 Dashboard link

## 🔍 Troubleshooting

### Server won't start
```bash
cd server
npm install
node index.js
```

### Frontend won't start
```bash
npm install
npm run dev
```

### Emails not sending
1. Check `.env` file has correct email
2. Use App Password (not regular password)
3. Run: `node server/test-email.js`

### Signup fails
- Check server console for errors
- Verify server is running
- Check JWT_SECRET in .env

## 📂 Important Files

- `server/index.js` - Backend server
- `server/.env` - Configuration
- `server/routes/pickupRoutes.js` - Email sending logic
- `server/utils/mailer.js` - Email service
- `server/test-email.js` - Test email setup

## 📖 Full Documentation

See `PROJECT_DOCUMENTATION.md` for complete details.

## 💡 Key Features

✅ No database required (uses in-memory cache)
✅ Automatic email confirmations
✅ JWT authentication
✅ Modern UI with Tailwind
✅ Real-time pickup scheduling

---

**Ready to test!** 🎉
