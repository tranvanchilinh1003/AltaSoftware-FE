import React from 'react';
import { DeleteAcademicYearModalProps } from './type';

const DeleteModal: React.FC<DeleteAcademicYearModalProps> = ({ title, description, onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center animate-fadeIn">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <p className="text-gray-700 mb-8">{description}</p>
        <div className="flex justify-center space-x-10">
          <button onClick={onCancel} className="bg-gray-100 text-black font-semibold py-3 px-14 rounded-lg">
            Huỷ
          </button>
          <button onClick={onConfirm} className="bg-background-orange-1 text-white font-semibold py-3 px-10 rounded-lg">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;