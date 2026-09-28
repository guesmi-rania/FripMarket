import { useState, useEffect } from 'react';
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
  }, []);

  const handleCheckout = async () => {
    const response = await axios.post('http://localhost:5000/api/orders', {
      items: cartItems,
      userEmail: 'client@example.com'
    });
    window.location.href = response.data.url;
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Mon Panier</h2>
      {cartItems.map(item => (
        <div key={item._id}>{item.name} x {item.qty} - ${item.price}</div>
      ))}
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default Cart;
