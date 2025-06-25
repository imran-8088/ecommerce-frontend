import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import toast from 'react-hot-toast';
import Navbar from './navbar';

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await res.json();
      if (res.ok) {
        setProduct(data);
      } else {
        toast.error(data.message || 'Product not found');
      }
    } catch (err) {
      toast.error('Error fetching product');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success('Added to cart!');
  };

  const handleBuyNow = () => {
    dispatch(addToCart(product));
    navigate('/checkout');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-[70vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-opacity-50"></div>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <p className="text-center py-10 text-red-600">Product not found.</p>
      </>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md mx-auto h-auto rounded-lg shadow-lg object-contain"
          />
        </div>

        <div className="flex-1 space-y-6">
          <h1 className="text-3xl font-extrabold text-gray-900">{product.name}</h1>

          <p className="text-sm text-gray-500">
            Category: {product.category?.name || 'Uncategorized'}
          </p>

          <div className="flex items-center space-x-4 text-lg">
            {product.discountedPrice && (
              <span className="text-gray-500 line-through">
                ₹{product.price}
              </span>
            )}
            <span className="text-green-600 font-semibold">
              ₹{product.discountedPrice || product.price}
            </span>
          </div>

          <p className="text-gray-700 text-sm">{product.description || 'No description available.'}</p>

          <div className="flex gap-6 pt-6">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
