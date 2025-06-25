import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    address: '',
  });

  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce((sum, item) => {
    const price = Number(item.product?.discountedPrice || item.product?.price);
    return sum + (isNaN(price) ? 0 : price * item.quantity);
  }, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cartItems.length) {
      return toast.error('Your cart is empty!');
    }

    const payload = {
      ...formData,
      items: cartItems.map(({ product, quantity }) => ({
        productId: product.id,
        quantity,
      })),
    };

    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('🎉 Order placed successfully!');
        dispatch(clearCart());
        navigate('/');
      } else {
        toast.error(data.error || 'Failed to place order');
      }
    } catch (err) {
      toast.error('Network error while placing order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen py-10 px-4 md:px-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Customer Information</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Shipping Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
              >
                {loading ? 'Placing Order...' : '✅ Place Order'}
              </button>
            </form>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Order Summary</h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map(({ product, quantity }) => {
                  const rawPrice = Number(product?.discountedPrice || product?.price);
                  const price = isNaN(rawPrice) ? 0 : rawPrice;
                  const subtotal = (price * quantity).toFixed(2);
                  return (
                    <div key={product.id} className="flex justify-between items-start border-b pb-3">
                      <div>
                        <p className="font-medium text-gray-700">{product.name || product.title}</p>
                        <p className="text-sm text-gray-500">
                          {quantity} × ₹{price.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-semibold text-gray-800">₹{subtotal}</p>
                    </div>
                  );
                })}
                <div className="flex justify-between items-center pt-6 mt-6 border-t">
                  <span className="text-xl font-bold text-gray-800">Total:</span>
                  <span className="text-xl font-bold text-blue-600">₹{total.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
