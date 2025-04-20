import Breadcrumb from '../../../../components/AddressUrlStack/Index';

const ScoreBoardHeader: React.FC = () => {
  const addresses = [
    { linkName: 'Bảng điểm', link: '/' },
    { linkName: '10A1', link: '/' },
  ];

  return (
    <>
      <Breadcrumb addressList={addresses} type={true} />
      <div className=" mt-5 pb-5 mr-7">
        <div className="flex items-center">
          {/* Hình ảnh học sinh */}
          <img src="https://i.pravatar.cc/150?img=3" alt="Học sinh" className="w-[205px] h-[105px] mr-[60px] object-cover" />
          {/* Thông tin học sinh */}
          <div className="grid grid-cols-2 gap-10">
            {/* Cột 1 */}
            <div className="grid gap-2">
              <span className="grid grid-cols-2">
                <span className="font-bold">Họ và tên:</span> <span>Nguyễn Văn A</span>
              </span>
              <span className="grid grid-cols-2">
                <span className="font-bold">Giới tính:</span> <span>Nam</span>
              </span>
              <span className="grid grid-cols-2">
                <span className="font-bold">Ngày sinh:</span> <span>03/16/2025</span>
              </span>
              <span className="grid grid-cols-2">
                <span className="font-bold">Email:</span> <span>abc@gmail.com</span>
              </span>
            </div>

            {/* Cột 2 có đường gạch dọc */}
            <div className="grid gap-2 border-l-2 border-gray-300 pl-5">
              <span className="grid grid-cols-2">
                <span className="font-bold">Lớp:</span> <span>10A1</span>
              </span>
              <span className="grid grid-cols-2">
                <span className="font-bold">GVCN:</span> <span>Cô Lê Thị B</span>
              </span>
              <span className="grid grid-cols-2">
                <span className="font-bold">Niên khóa:</span> <span>2024-2025</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-t-1 border-gray-200 pt-5 mr-7" />
    </>
  );
};

export default ScoreBoardHeader;
