// EditStudentCountModal.tsx
import React, { useState } from 'react';

interface EditStudentCountModalProps {
  title: string;
  description: string;
  initialCount: number;
  onCancel: () => void;
  onConfirm: (newCount: number) => void;
  isLoading?: boolean;
}

const EditStudentCountModal: React.FC<EditStudentCountModalProps> = ({
  title,
  description,
  initialCount,
  onCancel,
  onConfirm,
  isLoading = false,
}) => {
  const [newCount, setNewCount] = useState<number>(initialCount);

  const handleConfirm = () => {
    onConfirm(newCount);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-5">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <p className="text-gray-700 mb-4">{description}</p>

        <input
          type="number"
          min={0}
          className="border border-gray-300 rounded-md px-3 py-2 text-center focus:outline-none mb-6"
          value={newCount}
          onChange={(e) => setNewCount(Number(e.target.value))}
          disabled={isLoading}
        />

        <div className="flex justify-center space-x-10">
          <button
            onClick={onCancel}
            className="bg-gray-100 text-black-text font-semibold py-3 px-14 rounded-lg"
            disabled={isLoading}
          >
            Huỷ
          </button>
          <button
            onClick={handleConfirm}
            className="bg-background-orange-1 text-white font-semibold py-3 px-10 rounded-lg flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                <span>Đang xử lý</span>
              </div>
            ) : (
              'Xác nhận'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStudentCountModal;
