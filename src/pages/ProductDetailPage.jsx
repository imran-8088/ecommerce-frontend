import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import toast from 'react-hot-toast';
import { Star } from 'lucide-react'; 
import Navbar from './navbar';

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector((state) =>
    state.products.items.find((p) => String(p.id) === id)
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success('Added to cart!');
  };

  const handleBuyNow = () => {
    dispatch(addToCart(product));
    navigate('/checkout');
  };

  if (!product) return(<>
       <p className="text-center py-10">Loading or product not found</p>
     <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-opacity-50"></div>
      </div>
  </>)

  return (
      <>
         <Navbar/>
           <div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-10">
      <div className="flex-1">
        <img
          src={product.image}
          alt={product.title}
          className="w-full max-w-md mx-auto h-auto rounded-lg shadow-lg object-contain"
        />
      </div>

      <div className="flex-1 space-y-6">
        <h1 className="text-3xl font-extrabold text-gray-900">{product.title}</h1>

        <div className="flex items-center text-yellow-500">
          {[...Array(5)].map((_, index) => (
            <Star key={index} size={20} className={`mr-1 ${index < product.rating.rate ? 'text-yellow-400' : 'text-gray-300'}`} />
          ))}
          <span className="ml-2 text-gray-700">({product.rating.count} reviews)</span>
        </div>

        <div className="flex items-center space-x-4 text-lg">
          <span className="text-gray-500 line-through">${product.price}</span>
          <span className="text-green-600 font-semibold">${product.discountedPrice || product.price}</span>
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
