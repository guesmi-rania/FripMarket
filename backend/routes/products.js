import express from 'express';
import Product from '../models/Product.js';
import { protect, admin } from '../middleware/auth.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const router = express.Router();
const upload = multer();

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post('/', protect, admin, upload.single('image'), async (req, res) => {
  let imageUrl = '';
  if (req.file) {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
    imageUrl = result.secure_url;
  }
  const product = new Product({ ...req.body, imageUrl });
  await product.save();
  res.status(201).json(product);
});

export default router;
