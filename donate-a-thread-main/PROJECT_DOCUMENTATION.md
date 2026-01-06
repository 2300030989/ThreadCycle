# DonateThread - Complete Project Documentation

## 📋 Project Overview

**DonateThread** is a sustainable clothing donation platform that enables users to schedule pickups for unused clothes, reducing textile pollution and supporting livelihoods.

### Key Features
- 👤 User authentication (signup/login)
- 📅 Schedule clothing pickup
- 📧 Email confirmation for orders
- 📊 Dashboard with donation history
- 💾 In-memory cache storage (no database required)
- 🎨 Modern UI with Tailwind CSS

---

## 🏗️ Architecture

### Frontend (React + Vite)
- **Framework**: React 18 with TypeScript
- **Routing**: React Router
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: Context API (AuthContext)

### Backend (Node.js + Express)
- **Framework**: Express 5.2.1
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Email**: nodemailer (Gmail)
- **Storage**: In-memory cache (no SQL database)

### Project Structure
```
donate-a-thread-main/
├── src/                          # Frontend source
│   ├── components/              # React components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── DashboardLayout.tsx
│   │   ├── Chatbot.tsx
│   │   └── NavLink.tsx
│   ├── context/
│   │   └── AuthContext.tsx     # Authentication state
│   ├── pages/                  # Route pages
│   │   ├── Index.tsx          # Landing page
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── Dashboard.tsx
│   │   ├── SchedulePickup.tsx
│   │   ├── History.tsx
│   │   └── Settings.tsx
│   ├── lib/
│   │   └── utils.ts           # Utility functions
│   └── hooks/
│       └── use-toast.ts       # Toast notifications
│
├── server/                      # Backend source
│   ├── config/
│   │   └── db.js              # In-memory cache
│   ├── models/
│   │   ├── User.js            # User model
│   │   └── Pickup.js          # Pickup model
│   ├── routes/
│   │   ├── authRoutes.js      # Auth endpoints
│   │   └── pickupRoutes.js    # Pickup endpoints
│   ├── utils/
│   │   └── mailer.js          # Email service
│   ├── .env                   # Environment variables
│   ├── index.js               # Server entry point
│   ├── test-email.js          # Email testing script
│   └── EMAIL_SETUP.md         # Email configuration guide
│
├── public/                      # Static assets
├── package.json                # Frontend dependencies
└── vite.config.ts              # Vite configuration
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Gmail account (for email notifications)

### Installation

1. **Clone the repository**
```bash
cd donate-a-thread-main
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd server
npm install
cd ..
```

4. **Configure environment variables**
Edit `server/.env`:
```env
PORT=5000
JWT_SECRET=supersecretkey123

# Gmail Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_char_app_password
```

See `server/EMAIL_SETUP.md` for detailed Gmail configuration.

5. **Start the development servers**

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
cd server
node index.js
```

6. **Access the application**
- Frontend: http://localhost:8081
- Backend API: http://localhost:5000

---

## 🔐 Authentication System

### How It Works
1. **Signup**: User provides name, email, password, and phone
   - Password is hashed using bcrypt
   - User stored in in-memory cache
   - JWT token generated and returned

2. **Login**: User provides email and password
   - Password verified against hashed version
   - JWT token generated with 1-day expiration
   - Token stored in localStorage

3. **Protected Routes**: 
   - Frontend checks AuthContext for token
   - Backend verifies JWT in Authorization header
   - Middleware: `authMiddleware` in pickupRoutes.js

### API Endpoints

#### POST /api/auth/signup
```json
Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890"
}

Response:
{
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST /api/auth/login
```json
Request:
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## 📦 Pickup System

### Schedule Pickup Flow
1. User fills out pickup form:
   - Pickup date and time
   - Address (with optional geolocation)
   - Cloth type and condition
   - Quantity and notes

2. Frontend submits to `/api/pickups`

3. Backend:
   - Validates JWT token
   - Creates pickup record
   - Fetches user details
   - **Sends confirmation email**
   - Returns pickup data

4. User redirected to Order Receipt page

5. Email sent with:
   - Order ID
   - Pickup details
   - Dashboard link

### API Endpoints

#### POST /api/pickups
**Headers**: Authorization: Bearer {token}
```json
Request:
{
  "pickup_date": "2026-01-15",
  "pickup_time": "10:00 AM - 12:00 PM",
  "address": "123 Main St, City",
  "lat": 40.7128,
  "lng": -74.0060,
  "cloth_type": "Shirts, Pants",
  "condition": "Good",
  "quantity": "2 bags",
  "notes": "Please call before arriving"
}

Response:
{
  "id": 1,
  "userId": 1,
  "pickup_date": "2026-01-15",
  "pickup_time": "10:00 AM - 12:00 PM",
  "address": "123 Main St, City",
  "cloth_type": "Shirts, Pants",
  "condition": "Good",
  "quantity": "2 bags",
  "status": "Scheduled",
  "createdAt": "2026-01-06T..."
}
```

#### GET /api/pickups
**Headers**: Authorization: Bearer {token}
```json
Response:
[
  {
    "id": 1,
    "userId": 1,
    "pickup_date": "2026-01-15",
    "status": "Scheduled",
    ...
  }
]
```

---

## 📧 Email Notification System

### Email Triggers
- ✅ Pickup scheduled successfully

### Email Content
- Professional HTML template
- Order confirmation
- Complete pickup details
- What to expect section
- Dashboard link
- Company branding

### Email Configuration
See `server/EMAIL_SETUP.md` for complete setup guide.

**Quick Setup:**
1. Enable 2FA on Gmail
2. Generate App Password
3. Update EMAIL_USER and EMAIL_PASS in .env
4. Test: `node server/test-email.js`

### Email Service Code
Located in `server/utils/mailer.js`:
- Uses nodemailer
- Configured for Gmail
- Async email sending (non-blocking)
- Error handling with console logging

---

## 💾 Data Storage (In-Memory Cache)

### Why Cache Instead of Database?
- ✅ Simpler setup (no database installation)
- ✅ Faster development
- ✅ No connection/migration issues
- ⚠️ Data lost on server restart

### Cache Structure
```javascript
{
  users: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      password_hash: "$2b$10...",
      phone: "1234567890",
      createdAt: Date,
      updatedAt: Date
    }
  ],
  pickups: [
    {
      id: 1,
      userId: 1,
      pickup_date: "2026-01-15",
      pickup_time: "10:00 AM - 12:00 PM",
      address: "123 Main St",
      status: "Scheduled",
      createdAt: Date,
      updatedAt: Date
    }
  ],
  _userId: 2,    // Auto-increment counter
  _pickupId: 2   // Auto-increment counter
}
```

### Model Methods

**User Model** (`server/models/User.js`):
- `User.create(data)` - Create new user
- `User.findOne({ where: { email } })` - Find by email
- `User.findByPk(id)` - Find by ID
- `User.findAll()` - Get all users

**Pickup Model** (`server/models/Pickup.js`):
- `Pickup.create(data)` - Create pickup
- `Pickup.findAll({ where, order })` - Query pickups
- `Pickup.findByPk(id)` - Find by ID
- `Pickup.findOne({ where })` - Find single pickup

---

## 🎨 Frontend Pages

### Landing Page (Index.tsx)
- Hero section with CTA
- Features showcase
- How it works section
- Chatbot component

### Authentication
- **Login.tsx**: Email/password login
- **Signup.tsx**: User registration form

### Dashboard (Dashboard.tsx)
- Stats cards (donated weight, CO2 saved, rewards)
- Donation timeline chart
- Cloth type distribution
- Quick actions

### Schedule Pickup (SchedulePickup.tsx)
- Pickup form with validation
- Geolocation support
- Date/time picker
- Address input
- Cloth details

### History (History.tsx)
- List of past pickups
- Status tracking
- Order details

### Settings (Settings.tsx)
- User profile management
- Account settings

---

## 🔧 Development Tips

### Adding New Features

1. **New API Endpoint**:
   - Add route in `server/routes/`
   - Update model if needed
   - Test with console.log
   - Update API documentation

2. **New Page**:
   - Create component in `src/pages/`
   - Add route in main router
   - Update navigation
   - Add to DashboardLayout if needed

3. **New UI Component**:
   - Use shadcn/ui: `npx shadcn-ui@latest add [component]`
   - Import from `@/components/ui/`
   - Style with Tailwind

### Debugging

**Frontend**:
- React DevTools
- Console logs
- Network tab (API calls)
- Check AuthContext state

**Backend**:
- Console logs in routes
- Check server terminal output
- Verify token in requests
- Test cache data structure

### Testing Email
```bash
cd server
node test-email.js
```

---

## 🐛 Common Issues

### Signup/Login Not Working
- ✅ Check server is running on port 5000
- ✅ Verify JWT_SECRET in .env
- ✅ Check browser console for errors
- ✅ Look at server logs for detailed errors

### Email Not Sending
- ✅ Configure EMAIL_USER and EMAIL_PASS
- ✅ Use App Password, not regular password
- ✅ Enable 2FA on Gmail
- ✅ Run test-email.js script

### Pickup Not Saving
- ✅ Verify user is logged in
- ✅ Check Authorization header
- ✅ Look at server console logs
- ✅ Verify all required fields filled

### Frontend Not Loading
- ✅ Run `npm install` in root directory
- ✅ Check port 8081 is available
- ✅ Clear browser cache
- ✅ Check vite.config.ts

---

## 📝 Environment Variables

### server/.env
```env
# Server Configuration
PORT=5000

# JWT Authentication
JWT_SECRET=your_secret_key_here

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_char_app_password

# Optional: Frontend URL (for email links)
FRONTEND_URL=http://localhost:8081
```

---

## 🚀 Deployment

### For Production

1. **Switch to Database**: Replace cache with PostgreSQL/MySQL
2. **Environment Variables**: Use production values
3. **Email**: Verify email service limits
4. **CORS**: Update allowed origins
5. **HTTPS**: Enable SSL certificates
6. **Frontend Build**: `npm run build`
7. **Host Backend**: Deploy to cloud (Heroku, Railway, etc.)
8. **Host Frontend**: Deploy build folder (Vercel, Netlify)

---

## 📚 Technologies Used

### Frontend
- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- shadcn/ui
- Lucide Icons
- Recharts (for dashboard)
- Axios (API calls)

### Backend
- Node.js
- Express.js
- JWT (jsonwebtoken)
- bcrypt
- nodemailer
- cors
- dotenv

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

---

## 📄 License

This project is for educational purposes.

---

## 📞 Support

For issues or questions:
- Check documentation
- Review server logs
- Test email configuration
- Verify environment variables

---

**Made with 💚 for a sustainable future**
