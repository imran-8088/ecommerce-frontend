import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import { Toaster } from 'react-hot-toast';
import CheckoutPage from './pages/CheckoutPage';
import AdminPanel from './pages/AdminPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './pages/navbar';


function App() {
  return (
    <>
          <ToastContainer position="top-right" autoClose={3000} />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1f2937', 
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
      },
    },
  }}
/>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Admin" element={<AdminPanel />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </>
  );
}


export default App;
