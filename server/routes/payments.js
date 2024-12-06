const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const auth = require('../middleware/auth');

router.post('/topup', auth, async (req, res) => {
  try {
    const { amount, currency } = req.body;
    
    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe uses cents
      currency: currency.toLowerCase(),
      metadata: { userId: req.user.id }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: 'Payment processing error' });
  }
}); 