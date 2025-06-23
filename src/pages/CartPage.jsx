import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';
import Navbar from './navbar';


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
    const price = item?.product?.price ?? 0;
    const qty = item?.quantity ?? 0;
    return sum + price * qty;
  }, 0);

  return (
   <> 
    <Navbar/>
      <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 text-center">🛒 Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-8">
          {cartItems.map(({ product, quantity }) => {
            const subtotal = product?.price ? (product.price * quantity).toFixed(2) : '0.00';

            return (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center justify-between transition hover:shadow-lg"
              >
                <div className="flex items-center space-x-6 w-full md:w-auto">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-24 h-24 rounded-lg object-cover border"
                  />
                  <div>
                    <Link to={`/product/${product.id}`}>
                      <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition">
                        {product.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 mt-1">Price: <span className="font-medium">${product.price?.toFixed(2)}</span></p>
                    <p className="text-gray-700 font-semibold mt-1">Subtotal: ${subtotal}</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                    className="w-20 text-center p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="text-red-500 hover:text-red-600 font-semibold transition"
                  >
                    ✖ Remove
                  </button>
                </div>
              </div>
            );
          })}

          <div className="bg-gray-100 p-6 rounded-xl shadow-inner flex flex-col md:flex-row justify-between items-center mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
              Total Amount: <span className="text-blue-600">${total.toFixed(2)}</span>
            </h3>
            <Link
              to="/checkout"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition font-semibold"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
   </>
  );
};

export default CartPage;
