import React, { useState, useEffect } from 'react';

const ProductModal = ({
  type,
  formData,
  categories,
  handleChange,
  onClose,
  onSubmit,
  loading
}) => {
  const [preview, setPreview] = useState(null);
  const isEdit = type === 'edit';

  useEffect(() => {
    if (formData.image && typeof formData.image !== 'string') {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(formData.image);
    } else if (isEdit && formData.imageUrl) {
      setPreview(formData.imageUrl);
    } else {
      setPreview(null);
    }
  }, [formData.image, formData.imageUrl, isEdit]);

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative animate-fadeIn max-h-[90vh] overflow-hidden">
        <div className="p-6 md:p-8 overflow-y-auto max-h-[90vh] custom-scrollbar rounded-2xl">
          <button
            className="absolute top-3 right-3 text-2xl"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>

          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            {isEdit ? 'Edit Product' : 'Add Product'}
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!formData.name || !formData.price || !formData.categoryId) {
                alert('Name, Price, and Category are required.');
                return;
              }
              onSubmit();
            }}
            className="space-y-4 text-left"
          >
            <label className="block">
              <span className="text-sm text-gray-700">Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
                aria-label="Product name"
              />
            </label>

            <label className="block">
              <span className="text-sm text-gray-700">Price</span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
                aria-label="Product price"
              />
            </label>

            <label className="block">
              <span className="text-sm text-gray-700">Discounted Price</span>
              <input
                type="number"
                name="discountedPrice"
                value={formData.discountedPrice}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                aria-label="Discounted price"
              />
            </label>

            <label className="block">
              <span className="text-sm text-gray-700">Description</span>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                rows="3"
                aria-label="Product description"
              />
            </label>

            <label className="block">
              <span className="text-sm text-gray-700">Category</span>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
                aria-label="Product category"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm text-gray-700">Image</span>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                aria-label="Product image"
              />
            </label>

            {preview && (
              <div className="flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-2 rounded-lg shadow max-h-48 object-contain border"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                isEdit
                  ? 'bg-yellow-500 hover:bg-yellow-600'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white py-2 rounded mt-1 flex justify-center items-center gap-2 disabled:opacity-60`}
              aria-label={isEdit ? 'Update product' : 'Add product'}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>{isEdit ? 'Update Product' : 'Add Product'}</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
