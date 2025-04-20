import React from 'react';

export interface CloseClassModalProps {
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
  ClassName?: string;
}

const CloseClass: React.FC<CloseClassModalProps> = ({ title, description, onCancel, onConfirm }) => {
  return (
    <div
      className={` fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 transition-opacity duration-300 ease-in-out `}
      role="dialog"
      aria-hidden="false"
    >
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center animate-fade-in">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <p className="text-gray-700 mb-8">{description}</p>
        <div className="flex justify-center space-x-10">
          <button onClick={onCancel} className="bg-gray-100 text-black font-semibold py-3 px-14 rounded-lg hover:bg-gray-200 transition-all">
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="bg-background-orange-1 text-white font-semibold py-3 px-10 rounded-lg hover:bg-orange-600 transition-all"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default CloseClass;
