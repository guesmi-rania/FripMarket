import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    axios.get('http://localhost:5000/api/products', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Dashboard Admin</h2>
      {products.map(p => (
        <div key={p._id}>{p.name} - ${p.price}</div>
      ))}
    </div>
  );
}

export default AdminDashboard;
