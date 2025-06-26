import { X } from 'lucide-react';

const DeleteConfirmationModal = ({ product, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm relative animate-fadeIn text-center">
        <button onClick={onClose} className="absolute top-3 right-3">
          <X className="text-gray-500 hover:text-gray-800" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Deletion</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <span className="font-bold">{product.name}</span>?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => onConfirm(product.id)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Yes, Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
