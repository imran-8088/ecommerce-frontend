import React, { useState } from 'react';
import { PlusCircle, Pencil, Trash2, X, Settings } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = 'http://localhost:5000/api/products';

const AdminPage = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    discountedPrice: '',
    description: '',
    categoryId: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddProduct = async () => {
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val && key !== 'id') data.append(key, val);
    });
    try {
      await axios.post(API_BASE_URL, data);
      toast.success('Product added successfully');
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add product');
    }
  };

  const handleEditProduct = async () => {
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val && key !== 'id') data.append(key, val);
    });
    try {
      await axios.put(`${API_BASE_URL}/${formData.id}`, data);
      toast.success('Product updated successfully');
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update product');
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/${formData.id}`);
      toast.success('Product deleted successfully');
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to delete product');
    }
  };

  const openModal = (type) => {
    setFormData({
      id: '',
      name: '',
      price: '',
      discountedPrice: '',
      description: '',
      categoryId: '',
      image: null,
    });
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 py-16 px-4 text-center">
      <h1 className="text-4xl font-bold mb-10 text-gray-800 flex items-center justify-center gap-2">
        <Settings className="text-blue-600" /> Admin Panel
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
        <button
          onClick={() => openModal('add')}
          className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 text-lg"
        >
          <PlusCircle /> Add Product
        </button>
        <button
          onClick={() => openModal('edit')}
          className="flex items-center justify-center gap-2 px-6 py-4 bg-yellow-500 text-white rounded-xl shadow hover:bg-yellow-600 text-lg"
        >
          <Pencil /> Edit Product
        </button>
        <button
          onClick={() => openModal('delete')}
          className="flex items-center justify-center gap-2 px-6 py-4 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 text-lg"
        >
          <Trash2 /> Delete Product
        </button>
      </div>

      {activeModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fadeIn">
            <button className="absolute top-3 right-3" onClick={closeModal}>
              <X className="text-gray-500 hover:text-gray-800" />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {activeModal === 'add' && 'Add Product'}
              {activeModal === 'edit' && 'Edit Product'}
              {activeModal === 'delete' && 'Delete Product'}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (activeModal === 'add') handleAddProduct();
                else if (activeModal === 'edit') handleEditProduct();
                else if (activeModal === 'delete') handleDeleteProduct();
              }}
              className="space-y-4 text-left"
            >
              {(activeModal === 'edit' || activeModal === 'delete') && (
                <label>
                  <span className="text-sm text-gray-700">Product ID</span>
                  <input
                    type="text"
                    name="id"
                    placeholder="Enter Product ID"
                    value={formData.id}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
              )}

              {(activeModal === 'add' || activeModal === 'edit') && (
                <>
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
                    <span className="text-sm text-gray-700">Category ID</span>
                    <input type="text" name="categoryId" value={formData.categoryId} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
                  </label>
                  <label>
                    <span className="text-sm text-gray-700">Image</span>
                    <input type="file" name="image" accept="image/*" onChange={handleChange} className="w-full border rounded px-3 py-2" />
                  </label>
                </>
              )}

              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                {activeModal === 'add' && 'Add Product'}
                {activeModal === 'edit' && 'Update Product'}
                {activeModal === 'delete' && 'Delete Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
