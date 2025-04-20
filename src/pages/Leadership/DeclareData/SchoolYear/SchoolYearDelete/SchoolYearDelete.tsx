import { toast, ToastContainer } from 'react-toastify';

export const DeleteConfirmation = ({ id, onDeleteSuccess, onCancel }: { id: number; onDeleteSuccess: () => void; onCancel: () => void }) => {
  const handleDelete = async () => {
    try {
      console.log('Bắt đầu xóa niên khóa ID:', id); // Debug

      const response = await fetch(`https://fivefood.shop/api/academic-years/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Xóa không thành công');
      }

      console.log('Xóa thành công'); // Debug

      toast.success('Xóa niên khóa thành công!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });

       onDeleteSuccess();
    } catch (error) {
      console.error(error);
      toast.error('Đã xảy ra lỗi khi xóa!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
      
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
        <h2 className="text-xl font-bold text-center">Xóa niên khóa</h2>
        <p className="text-gray-600 text-center mt-2">
          Xác nhận muốn xóa niên khóa này và toàn bộ thông tin bên trong? Sau khi xóa sẽ không thể hoàn tác.
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <button onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
            Huỷ
          </button>
          <button onClick={handleDelete} className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};
