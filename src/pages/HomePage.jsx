import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsRequest } from '../features/products/productSlice';
import { addToCart } from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const HomePage = () => {
  const dispatch = useDispatch();
  const { items = [], loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const groupedByCategory = items.reduce((acc, product) => {
    const category = product.category?.name || 'Uncategorized';
    acc[category] = acc[category] || [];
    acc[category].push(product);
    return acc;
  }, {});

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-opacity-50" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 py-10 text-lg font-medium">Error: {error}</p>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800 animate-fadeIn">
        🛍️ Explore Our Products by Category
      </h1>

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-14">
        {Object.keys(groupedByCategory).map((category) => (
          <button
            key={category}
            onClick={() => {
              const el = document.getElementById(`cat-${category}`);
              el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="bg-gradient-to-r from-blue-100 to-blue-300 text-blue-900 px-5 py-2 rounded-full text-sm font-semibold capitalize shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products by Category */}
      {Object.entries(groupedByCategory).map(([category, products]) => (
        <section key={category} id={`cat-${category}`} className="mb-20">
          <h2 className="text-2xl font-semibold mb-4 capitalize text-gray-700 border-b-2 border-blue-100 pb-2">
            {category}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
            {products.map((product) => {
              const original = Number(product.price);
              const discounted = Number(product.discountedPrice);
              const hasDiscount = discounted && discounted < original;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-5 flex flex-col group"
                >
                  <Link to={`/product/${product.id}`} className="focus:outline-none">
                    <div className="w-full h-52 overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => (e.target.src = '/fallback.png')}
                      />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mt-4 truncate">
                      {product.name}
                    </h4>
                  </Link>

                  <div className="mt-2 space-y-1">
                    <p className="text-green-600 font-semibold text-xl">
                      ${hasDiscount ? discounted.toFixed(2) : original.toFixed(2)}
                    </p>
                    {hasDiscount && (
                      <p className="text-sm text-gray-400 line-through">
                        ${original.toFixed(2)}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Add to Cart
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

export default HomePage;
