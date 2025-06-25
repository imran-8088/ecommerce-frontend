import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId, newQty) => {
    if (newQty >= 1) {
      dispatch(updateQuantity({ productId, quantity: parseInt(newQty) }));
    }
  };

  const total = cartItems.reduce((sum, item) => {
    const price = Number(item?.product?.price);
    const qty = item?.quantity ?? 0;
    return sum + (!isNaN(price) ? price * qty : 0);
  }, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        🛒 Your Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map(({ product, quantity }) => {
              const price = Number(product?.price);
              const validPrice = !isNaN(price) ? price : 0;
              const subtotal = (validPrice * quantity).toFixed(2);

              return (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col md:flex-row justify-between items-center gap-6"
                >
                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-24 h-24 rounded-lg object-cover border"
                      onError={(e) => (e.target.src = '/fallback.png')}
                    />
                    <div>
                      <Link to={`/product/${product.id}`}>
                        <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition">
                          {product.title}
                        </h2>
                      </Link>
                      <p className="text-gray-600 mt-1">
                        Price: <span className="font-medium text-gray-900">${validPrice.toFixed(2)}</span>
                      </p>
                      <p className="text-gray-700 font-semibold mt-1">
                        Subtotal: <span className="text-green-600">${subtotal}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                      className="w-20 p-2 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => handleRemove(product.id)}
                      className="text-red-600 hover:text-red-700 font-semibold transition"
                    >
                      ✖ Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-gray-50 p-6 mt-10 rounded-2xl shadow-inner flex flex-col md:flex-row justify-between items-center gap-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Total: <span className="text-blue-600">${total.toFixed(2)}</span>
            </h3>
            <Link
              to="/checkout"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow font-semibold transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
