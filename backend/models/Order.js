import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userEmail: String,
  items: [{ productId: String, name: String, qty: Number, price: Number }],
  total: Number,
  status: { type: String, default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
