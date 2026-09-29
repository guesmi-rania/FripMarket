import express from 'express';
import Product from '../models/Product.js';
import { protect, admin } from '../middleware/auth.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();
const upload = multer();

// GET /api/products?section=Femme&category=Robes&isNew=true&onSale=true
router.get('/', async (req, res) => {
  try {
    const { section, category, isNew, onSale } = req.query;
    const filter = {};
    if (section) filter.section = section;
    if (category) filter.category = category;
    if (isNew !== undefined) filter.isNew = isNew === 'true';
    if (onSale !== undefined) filter.onSale = onSale === 'true';

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produit introuvable' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: 'ID invalide' });
  }
});

router.post('/', protect, admin, upload.single('image'), async (req, res) => {
  try {
    let imageUrl = req.body.imageUrl || '';
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) =>
          error ? reject(error) : resolve(result)
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
      imageUrl = result.secure_url;
    }

    const { name, description, price, oldPrice, section, category, stock, isNew, onSale } = req.body;

    if (!section || !category) {
      return res.status(400).json({ message: 'section et category sont obligatoires' });
    }

    const product = await Product.create({
      name,
      description,
      price,
      oldPrice: oldPrice || undefined,
      section,
      category,
      stock,
      isNew: isNew === true || isNew === 'true',
      onSale: onSale === true || onSale === 'true',
      imageUrl,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;