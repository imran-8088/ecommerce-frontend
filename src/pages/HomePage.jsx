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
    const categoryName = product.category?.name || 'Uncategorized';
    acc[categoryName] = acc[categoryName] || [];
    acc[categoryName].push(product);
    return acc;
  }, {});

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
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
      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800 animate-fadeIn">
          🛒 Explore Our Products by Category
        </h1>

        <div className="flex flex-wrap justify-center gap-4 mb-14">
          {Object.keys(groupedByCategory).map((category) => (
            <span
              key={category}
              className="bg-gradient-to-r from-blue-200 to-blue-400 text-blue-900 px-5 py-2 rounded-full text-sm font-medium capitalize shadow-sm hover:shadow-md transition-all cursor-pointer"
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
          <div key={category} className="mb-20" id={`cat-${category}`}>
            <h2 className="text-2xl font-semibold mb-4 capitalize text-gray-700 border-b-2 border-blue-100 pb-2">
              {category}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
              {products.map((product, index) => {
                const originalPrice = Number(product.price);
                const discounted = Number(product.discountedPrice);
                const hasDiscount = !isNaN(discounted) && discounted < originalPrice;

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-5 flex flex-col animate-fadeIn"
                    style={{ animationDelay: `${index * 0.04}s` }}
                  >
                    <Link to={`/product/${product.id}`}>
                      <div className="w-full h-52 overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                          onError={(e) => (e.target.src = '/fallback.png')}
                        />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mt-4 truncate">
                        {product.name}
                      </h4>
                    </Link>

                    <div className="mt-2">
                      <p className="text-green-600 font-semibold text-xl">
                        ₹{hasDiscount ? discounted.toFixed(2) : originalPrice.toFixed(2)}
                      </p>
                      {hasDiscount && (
                        <p className="text-sm text-gray-400 line-through">
                          ₹{originalPrice.toFixed(2)}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      Add to Cart
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
