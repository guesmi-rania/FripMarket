import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: 'Nom, email et message sont requis',
      });
    }

    await Contact.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      message: 'Message envoyé avec succès',
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: 'Erreur serveur',
    });
  }
});

export default router;