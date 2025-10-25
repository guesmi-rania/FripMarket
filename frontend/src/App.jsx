import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        
        {/* Main content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>

      
      </div>
    </Router>
  );
}

export default App;
