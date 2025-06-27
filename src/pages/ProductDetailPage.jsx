import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import toast from 'react-hot-toast';
import Navbar from './navbar';
import axios from 'axios';

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        const message = err.response?.data?.message || 'Error fetching product';
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

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
      <div className="flex items-center justify-center h-[70vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-opacity-50"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <p className="text-center py-10 text-red-600 font-semibold text-lg">
          Product not found.
        </p>
      </>
    );
  }

  const price = Number(product.price) || 0;
  const discountedPrice = Number(product.discountedPrice) || null;
  const isDiscounted = discountedPrice && discountedPrice < price;

  return (
    <>
      <section className="max-w-7xl mx-auto p-6 md:p-10 flex flex-col md:flex-row gap-12 animate-fadeIn">
        <div className="flex-1 flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => (e.target.src = '/fallback.png')}
            className="w-full max-w-md h-auto rounded-2xl shadow-xl object-contain bg-white p-4 border"
          />
        </div>

        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>

          <p className="text-sm text-gray-600">
            <span className="font-semibold">Category:</span>{' '}
            {product.category?.name || 'Uncategorized'}
          </p>

          <div className="flex items-center gap-4 text-xl font-medium">
            {isDiscounted && (
              <span className="text-gray-400 line-through">${price.toFixed(2)}</span>
            )}
            <span className="text-green-600 font-bold text-2xl">
              ${isDiscounted ? discountedPrice.toFixed(2) : price.toFixed(2)}
            </span>
          </div>

          <p className="text-gray-700 leading-relaxed text-md border-t pt-4">
            {product.description || 'No description available.'}
          </p>

          <div className="flex flex-wrap gap-6 pt-8">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-md transition duration-200 transform hover:scale-105"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-md transition duration-200 transform hover:scale-105"
            >
              Buy Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailPage;
