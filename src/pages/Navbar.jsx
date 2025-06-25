import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCart, Menu, X } from 'lucide-react';

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/Admin');

  const handleSwitch = () => {
    navigate(isAdminRoute ? '/' : '/Admin');
  };

  return (
    <nav className="bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent"
        >
          ShopEase
        </Link>

        {!isAdminRoute && (
          <div className="hidden md:flex space-x-8 text-gray-800 font-medium">
            <Link to="/" className="relative hover:text-blue-600 transition group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
            <div className="relative text-gray-500 cursor-default group">
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </div>
            <div className="relative text-gray-500 cursor-default group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-4">
          {!isAdminRoute && (
            <div className="relative">
              <Link to="/cart" className="flex items-center group">
                <ShoppingCart className="w-6 h-6 text-gray-800 group-hover:text-blue-600 transition" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          )}

          <button
            onClick={handleSwitch}
            className="ml-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded transition"
          >
            {isAdminRoute ? 'Switch to User' : 'Switch to Admin'}
          </button>

          {!isAdminRoute && (
            <button
              className="md:hidden text-gray-800"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>

      {!isAdminRoute && isOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-lg px-6 pb-4 space-y-3">
          <Link
            to="/"
            className="block text-gray-800 font-medium hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <div className="block text-gray-500 font-medium cursor-default">
            Products
          </div>
          <div className="block text-gray-500 font-medium cursor-default">
            About
          </div>
          <Link
            to="/cart"
            className="block text-gray-800 font-medium hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            View Cart ({totalItems})
          </Link>
          <button
            onClick={() => {
              setIsOpen(false);
              handleSwitch();
            }}
            className="block w-full text-left text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded"
          >
            Switch to Admin
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
