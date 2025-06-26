
const ProductModal = ({ type, formData, categories, handleChange, onClose, onSubmit }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fadeIn">
        <button className="absolute top-3 right-3" onClick={onClose}>×</button>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {type === 'add' ? 'Add Product' : 'Edit Product'}
        </h2>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4 text-left">
          <label>
            <span className="text-sm text-gray-700">Name</span>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
          </label>
          <label>
            <span className="text-sm text-gray-700">Price</span>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
          </label>
          <label>
            <span className="text-sm text-gray-700">Discounted Price</span>
            <input type="number" name="discountedPrice" value={formData.discountedPrice} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
          </label>
          <label>
            <span className="text-sm text-gray-700">Description</span>
            <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
          </label>
          <label>
            <span className="text-sm text-gray-700">Category</span>
            <select name="categoryId" value={formData.categoryId} onChange={handleChange} required className="w-full border rounded px-3 py-2">
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="text-sm text-gray-700">Image</span>
            <input type="file" name="image" accept="image/*" onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </label>
          <button type="submit" className={`w-full ${type === 'add' ? 'bg-blue-600 hover:bg-blue-700 mt-1' : 'bg-yellow-500 hover:bg-yellow-600 mt-1'} text-white py-2 rounded`}>
            {type === 'add' ? 'Add Product' : 'Update Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
