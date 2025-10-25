import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import orderRoutes from './routes/orders.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
