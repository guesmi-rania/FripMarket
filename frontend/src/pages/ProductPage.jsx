import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', padding: '2rem' }}>
      {products.map(p => <ProductCard key={p._id} product={p} />)}
    </div>
  );
}

export default Products;
