import express from 'express';
import Newsletter from '../models/Newsletter.js';

const router = express.Router();

// POST /api/newsletter
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: 'Email requis',
      });
    }

    const existing = await Newsletter.findOne({ email });

    if (existing) {
      return res.status(200).json({
        message: 'Vous êtes déjà inscrit(e) !',
        alreadySubscribed: true,
      });
    }

    await Newsletter.create({ email });

    res.status(201).json({
      message: 'Inscription réussie !',
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: 'Erreur serveur',
    });
  }
});

export default router;