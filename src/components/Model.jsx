import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 animate-fade-in">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-center text-indigo-600">
          {title}
        </h2>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
