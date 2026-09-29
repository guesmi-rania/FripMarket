import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  imageUrl: String,
  section: { type: String, enum: ['Femme', 'Homme', 'Enfant'], required: true },
  category: { type: String, required: true }, // subcategory, e.g. "Robes", "Chemises"
  stock: { type: Number, default: 10 },
  isNew: { type: Boolean, default: false },
  onSale: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Product', productSchema);