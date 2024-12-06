const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const auth = require('../middleware/auth');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

router.post('/make-call', auth, async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    
    // Check user balance before making call
    const user = await User.findById(req.user.id);
    if (user.balance <= 0) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Initialize call through Twilio
    const call = await client.calls.create({
      url: 'http://your-webhook-url/voice.xml',
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER
    });

    res.json({ callSid: call.sid });
  } catch (error) {
    res.status(500).json({ message: 'Error initiating call' });
  }
}); 