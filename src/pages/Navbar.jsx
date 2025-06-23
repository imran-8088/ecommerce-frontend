import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCart, Menu, X } from 'lucide-react';

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
          ShopEase
        </Link>

        <div className="hidden md:flex space-x-8 text-gray-800 font-medium">
  {['Home', 'Products', 'About'].map((page) =>
    page === 'Home' ? (
      <Link
        key={page}
        to="/"
        className="relative hover:text-blue-600 transition group"
      >
        {page}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
      </Link>
    ) : (
      <div
        key={page}
        className="relative hover:text-blue-600 transition group cursor-default"
      >
        {page}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
      </div>
    )
  )}
</div>


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

        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-lg px-6 pb-4 space-y-3">
          {['Home', 'Products', 'About'].map((page) => (
            <Link
              key={page}
              to={`/${page.toLowerCase() === 'home' ? '' : page.toLowerCase()}`}
              className="block text-gray-800 font-medium hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              {page}
            </Link>
          ))}
          <Link
            to="/cart"
            className="block text-gray-800 font-medium hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            View Cart ({totalItems})
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
