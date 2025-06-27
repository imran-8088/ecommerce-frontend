import React, { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const ITEMS_PER_PAGE = 5;
const MAX_VISIBLE_PAGES = 4;

const ProductTable = ({ products, openEditModal, openDeleteModal }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && currentPage < totalPages) {
        setCurrentPage((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages]);

  const getVisiblePages = () => {
    const pages = [];

    if (totalPages <= MAX_VISIBLE_PAGES) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      pages.push(1);
      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-blue-600 text-white text-sm">
            <th className="py-3 px-4 text-left">Image</th>
            <th className="py-3 px-4 text-center">Name</th>
            <th className="py-3 px-4 text-center">Price</th>
            <th className="py-3 px-4 text-center">Discounted</th>
            <th className="py-3 px-4 text-center">Category</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((product, idx) => (
            <tr
              key={product.id || product._id}
              className={`text-sm ${
                idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              } hover:bg-blue-50 transition`}
            >
              <td className="py-3 px-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-16 w-16 object-cover rounded shadow"
                />
              </td>
              <td className="py-3 px-4 text-center font-medium">{product.name}</td>
              <td className="py-3 px-4 text-center">${product.price}</td>
              <td className="py-3 px-4 text-center">${product.discountedPrice}</td>
              <td className="py-3 px-4 text-center text-gray-600">
                {product.category?.name || 'N/A'}
              </td>
              <td className="py-3 px-4 text-center space-x-2">
                <button
                  onClick={() => openEditModal(product)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md shadow transition"
                  aria-label="Edit product"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => openDeleteModal(product)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow transition"
                  aria-label="Delete product"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="mt-4 flex flex-wrap justify-center items-center gap-2 text-sm">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md transition ${
              currentPage === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Prev
          </button>

          {getVisiblePages().map((page, index) =>
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="px-3 py-1 text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={`page-${page}`}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md transition ${
                  page === currentPage
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md transition ${
              currentPage === totalPages
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
