import express from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendEmail } from '../utils/sendEmail.js';

const router = express.Router();
const FRONTEND = (process.env.FRONTEND_URL || 'http://localhost:5173').split(',')[0].trim();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 6 caractères' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Un compte existe déjà avec cet email' });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const user = await User.create({
      email,
      password,
      isVerified: false,
      verificationToken,
      verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000, // 24h
    });

    const verifyUrl = `${FRONTEND}/verify-email/${verificationToken}`;
    try {
      await sendEmail({
        to: email,
        subject: 'Confirmez votre adresse email - FripMarket',
        html: `
          <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
            <h2>Bienvenue sur FripMarket 👋</h2>
            <p>Merci de confirmer votre adresse email pour activer votre compte :</p>
            <p><a href="${verifyUrl}" style="display:inline-block;background:#000;color:#fff;padding:12px 24px;border-radius:999px;text-decoration:none;">Confirmer mon email</a></p>
            <p style="color:#888;font-size:13px;">Ou copiez ce lien : ${verifyUrl}</p>
            <p style="color:#888;font-size:13px;">Ce lien expire dans 24 heures.</p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error('Échec envoi email de vérification:', emailErr.message);
      // The account is created either way — the person can still ask for a
      // new verification email later if this one-off send failed.
    }

    res.status(201).json({ message: 'Compte créé. Vérifiez votre email pour l’activer.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la création du compte' });
  }
});

// GET /api/auth/verify-email/:token
router.get('/verify-email/:token', async (req, res) => {
  try {
    const user = await User.findOne({
      verificationToken: req.params.token,
      verificationTokenExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: 'Lien invalide ou expiré' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.json({ message: 'Email vérifié avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: 'Merci de confirmer votre email avant de vous connecter.' });
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, email: user.email, isAdmin: user.isAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    // Always respond the same way whether or not the account exists,
    // so nobody can use this endpoint to discover registered emails.
    if (user) {
      const resetToken = crypto.randomBytes(32).toString('hex');
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1h
      await user.save();

      const resetUrl = `${FRONTEND}/reset-password/${resetToken}`;
      try {
        await sendEmail({
          to: email,
          subject: 'Réinitialisation de votre mot de passe - FripMarket',
          html: `
            <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
              <h2>Réinitialisation du mot de passe</h2>
              <p>Vous avez demandé à réinitialiser votre mot de passe FripMarket.</p>
              <p><a href="${resetUrl}" style="display:inline-block;background:#000;color:#fff;padding:12px 24px;border-radius:999px;text-decoration:none;">Réinitialiser mon mot de passe</a></p>
              <p style="color:#888;font-size:13px;">Ou copiez ce lien : ${resetUrl}</p>
              <p style="color:#888;font-size:13px;">Ce lien expire dans 1 heure. Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.</p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error('Échec envoi email de réinitialisation:', emailErr.message);
      }
    }

    res.json({ message: 'Si un compte existe avec cet email, un lien de réinitialisation a été envoyé.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// POST /api/auth/reset-password/:token
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { password } = req.body;
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 6 caractères' });
    }

    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: 'Lien invalide ou expiré' });
    }

    user.password = password; // rehashed by the pre-save hook
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Mot de passe réinitialisé avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;