const express = require('express');
const Pickup = require('../models/Pickup');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/mailer');
const router = express.Router();

// Middleware to verify token
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Create Pickup
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { pickup_date, pickup_time, address, lat, lng, cloth_type, condition, quantity, notes } = req.body;

    console.log('Creating pickup for user:', req.user.id);

    const pickup = Pickup.create({
      userId: req.user.id,
      pickup_date,
      pickup_time,
      address,
      lat,
      lng,
      cloth_type,
      condition,
      quantity,
      notes,
    });

    console.log('Pickup created:', pickup);

    // Fetch user for email
    const user = User.findByPk(req.user.id);
    
    if (user && user.email) {
      console.log('📧 Preparing to send email to:', user.email);
      console.log('👤 Customer Name:', user.name);
      console.log('📦 Order ID:', pickup.id);
      
      const emailSubject = 'DonateThread - Pickup Scheduled Confirmation';
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #16a34a; padding: 20px; text-align: center; color: white;">
            <h1 style="margin: 0;">🎉 Pickup Confirmed!</h1>
          </div>
          <div style="padding: 20px;">
            <p>Hi <strong>${user.name}</strong>,</p>
            <p>Thank you for contributing to a sustainable future! Your donation pickup has been successfully scheduled.</p>
            
            <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #16a34a;">
              <h3 style="margin-top: 0; color: #166534;">📋 Order Details</h3>
              <p style="margin: 8px 0;"><strong>Order ID:</strong> #${pickup.id}</p>
              <p style="margin: 8px 0;"><strong>Date:</strong> ${pickup_date}</p>
              <p style="margin: 8px 0;"><strong>Time:</strong> ${pickup_time}</p>
              <p style="margin: 8px 0;"><strong>Items:</strong> ${quantity}</p>
              <p style="margin: 8px 0;"><strong>Cloth Type:</strong> ${cloth_type}</p>
              <p style="margin: 8px 0;"><strong>Condition:</strong> ${condition}</p>
              <p style="margin: 8px 0;"><strong>Address:</strong> ${address}</p>
              ${notes ? `<p style="margin: 8px 0;"><strong>Notes:</strong> ${notes}</p>` : ''}
            </div>

            <div style="background-color: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <p style="margin: 0; color: #92400e;"><strong>⏰ What to expect:</strong></p>
              <p style="margin: 8px 0 0 0; color: #92400e;">Our delivery partner will arrive within the scheduled time window. Please keep your donation ready for pickup.</p>
            </div>

            <p style="margin-top: 20px;">You can track your pickup status in your dashboard.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="http://localhost:8081/dashboard" style="display: inline-block; background-color: #16a34a; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Dashboard</a>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">Questions? Feel free to reply to this email or contact our support team.</p>
            </div>
          </div>
          <div style="background-color: #f3f4f6; padding: 15px; text-align: center; color: #6b7280; font-size: 12px;">
            <p style="margin: 5px 0;">🌱 Thank you for making a difference!</p>
            <p style="margin: 5px 0;">&copy; ${new Date().getFullYear()} DonateThread. All rights reserved.</p>
          </div>
        </div>
      `;

      // Send email asynchronously (don't block response)
      if (process.env.EMAIL_USER !== 'your_email@gmail.com' && process.env.EMAIL_PASS !== 'your_app_password') {
        // Email is configured, send actual email
        sendEmail(user.email, emailSubject, emailHtml)
          .then(() => console.log('✅ Email sent successfully to:', user.email))
          .catch(err => console.error('❌ Failed to send email:', err.message));
      } else {
        // Email not configured, show in console
        console.log('\n' + '='.repeat(60));
        console.log('📧 EMAIL PREVIEW (Email not configured)');
        console.log('='.repeat(60));
        console.log('To:', user.email);
        console.log('Subject:', emailSubject);
        console.log('Order ID:', pickup.id);
        console.log('Customer:', user.name);
        console.log('Pickup Date:', pickup_date);
        console.log('Pickup Time:', pickup_time);
        console.log('Address:', address);
        console.log('Items:', quantity, '-', cloth_type);
        console.log('='.repeat(60));
        console.log('⚠️  To actually send emails, configure EMAIL_USER and EMAIL_PASS in .env');
        console.log('='.repeat(60) + '\n');
      }
    } else {
      console.log('❌ User email not found, skipping email notification');
    }

    res.status(201).json(pickup);
  } catch (error) {
    console.error('Pickup creation error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get User Pickups
router.get('/', authMiddleware, async (req, res) => {
  try {
    console.log('Fetching pickups for user:', req.user.id);
    const pickups = Pickup.findAll({ where: { userId: req.user.id }, order: [['createdAt', 'DESC']] });
    console.log('Found pickups:', pickups.length);
    res.json(pickups);
  } catch (error) {
    console.error('Get pickups error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
