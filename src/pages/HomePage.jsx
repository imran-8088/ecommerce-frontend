import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsRequest } from '../features/products/productSlice';
import { addToCart } from '../features/cart/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Star } from 'lucide-react';
import Navbar from './navbar';

const HomePage = () => {
  const dispatch = useDispatch();
  const { items = [], loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const groupedByCategory = items.reduce((acc, product) => {
    const { category } = product;
    acc[category] = acc[category] || [];
    acc[category].push(product);
    return acc;
  }, {});

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success('Added to cart!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-opacity-50"></div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 py-10">Error: {error}</p>
    );
  }

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
          🛍️ Shop by Category
        </h1>

        {/* Category Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {Object.keys(groupedByCategory).map((category) => (
            <span
              key={category}
              className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium capitalize shadow hover:bg-blue-200 transition cursor-pointer"
              onClick={() => {
                const target = document.getElementById(`cat-${category}`);
                target?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {category}
            </span>
          ))}
        </div>

        {Object.entries(groupedByCategory).map(([category, products]) => (
          <div key={category} className="mb-16" id={`cat-${category}`}>
            <h2 className="text-2xl font-semibold mb-4 capitalize border-b border-gray-300 pb-1">
              {category}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition duration-300 p-4 flex flex-col animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <Link to={`/product/${product.id}`} className="mb-4">
                    <div className="w-full h-52 overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => (e.target.src = '/fallback.png')}
                        />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mt-2 truncate">
                      {product.title}
                    </h4>
                  </Link>

                  <div className="text-sm text-gray-500 mb-1">
                    Category: {product.category}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-yellow-500 mb-1">
                    <Star size={16} fill="currentColor" />
                    <span>{product.rating?.rate} ({product.rating?.count})</span>
                  </div>

                  <div className="mt-1 mb-3">
                    <p className="text-lg font-bold text-green-600">
                      ${product.price?.toFixed(2)}
                    </p>
                    {product.discountedPrice && product.discountedPrice !== product.price && (
                      <p className="text-sm text-gray-400 line-through">
                        ${product.discountedPrice}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-auto bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
