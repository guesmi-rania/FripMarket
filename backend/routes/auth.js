import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await user.matchPassword(password)) {
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, email: user.email, isAdmin: user.isAdmin });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

export default router;
