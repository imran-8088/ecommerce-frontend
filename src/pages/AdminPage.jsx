import React, { useState } from 'react';
import { PlusCircle, Pencil, Trash2, X } from 'lucide-react';
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
    setFormData({ id: '', name: '', price: '', discountedPrice: '', description: '', categoryId: '', image: null });
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 py-16 px-4 text-center">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Panel</h1>
      <div className="flex flex-wrap justify-center gap-6">
        <button onClick={() => openModal('add')} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
          <PlusCircle /> Add Product
        </button>
        <button onClick={() => openModal('edit')} className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600">
          <Pencil /> Edit Product
        </button>
        <button onClick={() => openModal('delete')} className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600">
          <Trash2 /> Delete Product
        </button>
      </div>

      {activeModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative">
            <button className="absolute top-3 right-3" onClick={closeModal}>
              <X />
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
              className="space-y-4"
            >
              {(activeModal === 'edit' || activeModal === 'delete') && (
                <input
                  type="text"
                  name="id"
                  placeholder="Product ID"
                  value={formData.id}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              )}
              {(activeModal === 'add' || activeModal === 'edit') && (
                <>
                  <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                  <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                  <input type="number" name="discountedPrice" placeholder="Discounted Price" value={formData.discountedPrice} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                  <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full border rounded px-3 py-2" required></textarea>
                  <input type="text" name="categoryId" placeholder="Category ID" value={formData.categoryId} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                  <input type="file" name="image" accept="image/*" onChange={handleChange} className="w-full border rounded px-3 py-2" />
                </>
              )}
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                {activeModal === 'add' && 'Add'}
                {activeModal === 'edit' && 'Update'}
                {activeModal === 'delete' && 'Delete'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
