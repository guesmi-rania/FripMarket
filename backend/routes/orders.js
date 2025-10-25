import express from 'express';
import stripe from 'stripe';
import { protect } from '../middleware/auth.js';
import Order from '../models/Order.js';

const router = express.Router();
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

router.post('/', protect, async (req, res) => {
  const { items, userEmail } = req.body;
  const session = await stripeClient.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: item.price * 100
      },
      quantity: item.qty
    })),
    mode: 'payment',
    success_url: `${req.headers.origin}/checkout/success`,
    cancel_url: `${req.headers.origin}/cart`,
    customer_email: userEmail
  });
  res.json({ url: session.url });
});

export default router;
