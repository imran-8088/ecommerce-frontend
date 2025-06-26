import React, { useEffect, useState } from 'react';
import { PlusCircle, Settings } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import ProductTable from '../components/ProductTable';
import ProductModal from '../components/ProductModal';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = `${BASE_URL}/products`;
const CATEGORY_API_URL = `${BASE_URL}/categories`;

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    discountedPrice: '',
    description: '',
    categoryId: '',
    image: null,
  });
  const [activeModal, setActiveModal] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_BASE_URL);
      setProducts(res.data);
    } catch {
      toast.error('Failed to fetch products');
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(CATEGORY_API_URL);
      setCategories(res.data);
    } catch {
      toast.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: name === 'image' ? files[0] : value });
  };

  const openAddModal = () => {
    setFormData({
      id: '',
      name: '',
      price: '',
      discountedPrice: '',
      description: '',
      categoryId: '',
      image: null,
    });
    setActiveModal('add');
  };

  const openEditModal = (product) => {
    setFormData({
      id: product.id,
      name: product.name,
      price: product.price,
      discountedPrice: product.discountedPrice,
      description: product.description,
      categoryId: product.categoryId,
      image: null,
    });
    setActiveModal('edit');
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setActiveModal('delete');
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedProduct(null);
  };

  const handleDeleteConfirmed = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      toast.success('Product deleted successfully');
      fetchProducts();
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to delete product');
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
      fetchProducts();
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
      fetchProducts();
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update product');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 py-16 px-4 text-center">
      <h1 className="text-4xl font-bold mb-10 text-gray-800 flex items-center justify-center gap-2">
        <Settings className="text-blue-600" /> Admin Panel
      </h1>

      <div className="mb-6 flex justify-end">
        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 text-lg"
        >
          <PlusCircle /> Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <ProductTable
          products={products}
          openEditModal={openEditModal}
          openDeleteModal={openDeleteModal}
        />
      </div>

      {(activeModal === 'add' || activeModal === 'edit') && (
        <ProductModal
          type={activeModal}
          formData={formData}
          categories={categories}
          handleChange={handleChange}
          onClose={closeModal}
          onSubmit={activeModal === 'add' ? handleAddProduct : handleEditProduct}
        />
      )}

      {activeModal === 'delete' && selectedProduct && (
        <DeleteConfirmationModal
          product={selectedProduct}
          onClose={closeModal}
          onConfirm={handleDeleteConfirmed}
        />
      )}
    </div>
  );
};

export default AdminPage;
