import express from 'express';
import Stripe from 'stripe';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const FRONT = (process.env.FRONTEND_URL || 'http://localhost:5173').split(',')[0].trim();

router.post('/', async (req, res) => {
  try {
    const { items, userEmail } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Panier vide' });
    }

    const dbProducts = await Product.find({ _id: { $in: items.map((i) => i._id) } });

    const lineItems = [];
    const orderItems = [];
    let total = 0;

    for (const item of items) {
      const p = dbProducts.find((d) => d._id.toString() === item._id);
      if (!p) continue;
      const qty = Math.max(1, parseInt(item.qty, 10) || 1);
      total += p.price * qty;
      orderItems.push({ productId: p._id.toString(), name: p.name, qty, price: p.price });
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: { name: p.name },
          unit_amount: Math.round(p.price * 100),
        },
        quantity: qty,
      });
    }

    if (lineItems.length === 0) {
      return res.status(400).json({ message: 'Produits invalides' });
    }

    await Order.create({ userEmail, items: orderItems, total });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${FRONT}/checkout/success`,
      cancel_url: `${FRONT}/cart`,
      customer_email: userEmail || undefined,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur de paiement' });
  }
});

export default router;