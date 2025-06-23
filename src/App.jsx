// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import { Toaster } from 'react-hot-toast';
import CheckoutPage from './pages/CheckoutPage';


function App() {
  return (
    <>
      <Toaster
  position="top-center"
  toastOptions={{
    style: {
      background: '#1f2937', // dark gray
      color: '#fff',
    },
    success: {
      iconTheme: {
        primary: '#10b981', // green
        secondary: '#fff',
      },
    },
  }}
/>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </>
  );
}


export default App;
