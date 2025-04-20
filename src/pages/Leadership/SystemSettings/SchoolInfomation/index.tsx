import React, { useEffect, useState } from 'react';
import Dropdown from '../../../../components/Dropdown';
import { DropdownOption } from '../../../../components/Dropdown/type';
import Button from '../../../../components/Button';
import Modal from '../../../../components/common/ModalConfirmation';
import { Link } from 'react-router';
import createAxiosInstance from '../../../../utils/axiosInstance';
import './style.css';

const SchoolInfo: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null);
  const [isOpenFile, setIsOpenFile] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [schoolData, setSchoolData] = useState<any>(null);
  const [campuses, setCampuses] = useState<any[]>([]);
  const axiosInstance = createAxiosInstance();

  useEffect(() => {
    axiosInstance
      .get('https://fivefood.shop/api/schools?page=1&pageSize=5&sortColumn=id&sortOrder=asc')
      .then((response) => {
        setSchoolData(response.data.data[0]);
      })
      .catch((error) => {
        console.error('Failed to fetch school data:', error);
      });

    axiosInstance
      .get('https://fivefood.shop/api/campuses?page=1&pageSize=5&sortColumn=id&sortOrder=asc')
      .then((response) => {
        setCampuses(response.data.data);
      })
      .catch((error) => {
        console.error('Failed to fetch campus data:', error);
      });
  }, []);

  const options: DropdownOption[] = [
    { label: '2023-2024', value: '2023-2024' },
    { label: '2024-2025', value: '2024-2025' },
  ];

  const handleDeleteCampus = (id: number) => {
    axiosInstance
      .delete(`https://fivefood.shop/api/campuses/${id}`)
      .then(() => {
        setCampuses((prev) => prev.filter((campus) => campus.id !== id));
      })
      .catch((error) => {
        console.error('Failed to delete campus:', error);
      });
  };

  const handleEdit = () => {
    Promise.all([ //chạy sau khi bất đồng bộ hoàn thành
      axiosInstance.get('https://fivefood.shop/api/schools?page=1&pageSize=5&sortColumn=id&sortOrder=asc'),
      axiosInstance.get('https://fivefood.shop/api/campuses?page=1&pageSize=5&sortColumn=id&sortOrder=asc'),
    ])
      .then(([schoolResponse, campusResponse]) => {
        setSchoolData(schoolResponse.data.data[0]);
        setCampuses(campusResponse.data.data);
        window.location.href = '/leadership/system-settings/school-info/edit';
      })
      .catch((error) => {
        console.error('Failed to fetch data:', error);
      });
  };

  return (
    <div className="school-information">
      <h1 className="text-3xl font-bold ml-6 text-black-text">Thông Tin Nhà Trường</h1>
      <div className="grid grid-cols-2 gap-2 mb-4 mt-9">
        <div className="col-span-1 flex items-center gap-2 ml-10">
          <Dropdown
            placeholder="Niên khóa"
            size="short"
            options={options}
            selectedOption={selectedOption}
            onSelect={(option) => setSelectedOption(option)}
            handleOptionClick={(option) => setSelectedOption(option)}
          />
        </div>
        <div className="col-span-1 flex justify-end gap-2 ml-10">
          <div className="flex mx-7">
            <Button className="outline-primary" size="mini" style={{ marginRight: '10px' }} onClick={() => setIsOpenFile(true)}>
              Xuất file
            </Button>
            <Button className="primary" size="mini" onClick={handleEdit}>
              Sửa
            </Button>
          </div>
        </div>
      </div>
      <div className="min-h-screen p-6">
        <div className=" mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          {/* Thông tin chung */}
          <div className="bg-orange-600 text-white p-3 font-semibold">
            <span>Thông tin chung</span>
          </div>
          {schoolData && (
            <div className="p-6 flex items-start gap-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/vi/9/9f/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_Khoa_h%E1%BB%8Dc%2C_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_Th%C3%A1i_Nguy%C3%AAn.svg"
                alt="School Logo"
                className="object-contain col-span-1"
                style={{ width: '232px', height: '232px' }}
              />
              <div className="text-sm w-[100%] ml-[40px]">
                <p className="font-semibold text-orange-600">{schoolData.name}</p>
                <div className="col-span-2 grid grid-cols-2 gap-4 text-sm">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <p className="font-semibold">Tên trường:</p> <p>{schoolData.name}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-semibold">Mã chuẩn:</p> <p>{schoolData.code}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-semibold">Tỉnh/Thành phố:</p> <p>{schoolData.provinceName}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-semibold">Xã/Phường:</p> <p>{schoolData.wardName}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-semibold">Quận/Huyện:</p> <p>{schoolData.districtName}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-semibold">Trụ sở chính:</p> <p>{schoolData.headOffice ? 'Có' : 'Không'}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-semibold">Loại trường:</p> <p>{schoolData.schoolType}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-semibold">Số điện thoại:</p> <p>{schoolData.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <p className="font-semibold">Email:</p> <p>{schoolData.email}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-semibold">Ngày thành lập:</p> <p>{schoolData.establishedDate}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-semibold">Mô hình đào tạo:</p> <p>{schoolData.trainingModel}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-semibold">Website:</p>{' '}
                      <a href={schoolData.websiteUrl} className="text-blue-600">
                        {schoolData.websiteUrl}
                      </a>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-semibold">Hiệu trưởng:</p> <p>{schoolData.user.fullName}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Danh sách cơ sở */}
          <div className="bg-orange-600 text-white font-semibold p-3 flex justify-between items-center">
            <span>Danh sách cơ sở</span>
          </div>
          {campuses && campuses.length > 0 ? (
            campuses.map((campus: any) => (
              <div key={campus.id} className="p-6 flex items-start gap-4 mb-3 bg-white rounded border-b border-gray-500">
                <div className="relative w-[232px] h-[232px]">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/vi/9/9f/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_Khoa_h%E1%BB%8Dc%2C_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_Th%C3%A1i_Nguy%C3%AAn.svg"
                    alt={`Campus ${campus.name}`}
                    className="object-contain col-span-1"
                  />
                </div>
                <div className="text-sm w-[100%] ml-[40px]">
                  <p className="font-semibold text-orange-600">{campus.name}</p>
                  <div className="col-span-2 grid grid-cols-2 gap-4 text-sm">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between">
                        <p className="font-semibold">Địa chỉ:</p> <p>{campus.address}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="font-semibold">Số điện thoại:</p> <p>{campus.phoneNumber}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between">
                        <p className="font-semibold">Người phụ trách:</p> <p>{campus.user.fullName}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="font-semibold">Email:</p> <p>{campus.user.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <button className="hover:text-gray-500" onClick={() => console.log(`Edit campus ${campus.id}`)}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.87868 3.87868C2.44129 3.31607 3.20435 3 4 3H11C11.5523 3 12 3.44772 12 4C12 4.55228 11.5523 5 11 5H4C3.73478 5 3.48043 5.10536 3.29289 5.29289C3.10536 5.48043 3 5.73478 3 6V20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21H18C18.2652 21 18.5196 20.8946 18.7071 20.7071C18.8946 20.5196 19 20.2652 19 20V13C19 12.4477 19.4477 12 20 12C20.5523 12 21 12.4477 21 13V20C21 20.7957 20.6839 21.5587 20.1213 22.1213C19.5587 22.6839 18.7957 23 18 23H4C3.20435 23 2.44129 22.6839 1.87868 22.1213C1.31607 21.5587 1 20.7957 1 20V6C1 5.20435 1.31607 4.44129 1.87868 3.87868Z"
                          fill="#ff5400"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M20 2.87869C19.7026 2.87869 19.4174 2.99683 19.2071 3.20712L9.90295 12.5113L9.37436 14.6256L11.4887 14.097L20.7929 4.79291C21.0032 4.58262 21.1213 4.29741 21.1213 4.00001C21.1213 3.70262 21.0032 3.41741 20.7929 3.20712C20.5826 2.99683 20.2974 2.87869 20 2.87869ZM17.7929 1.79291C18.3782 1.20755 19.1722 0.878693 20 0.878693C20.8278 0.878693 21.6217 1.20755 22.2071 1.79291C22.7925 2.37827 23.1213 3.17219 23.1213 4.00001C23.1213 4.82784 22.7925 5.62176 22.2071 6.20712L12.7071 15.7071C12.5789 15.8353 12.4184 15.9262 12.2425 15.9702L8.24253 16.9702C7.90175 17.0553 7.54126 16.9555 7.29288 16.7071C7.0445 16.4587 6.94465 16.0983 7.02985 15.7575L8.02985 11.7575C8.07381 11.5816 8.16473 11.4211 8.29288 11.2929L17.7929 1.79291Z"
                          fill="#ff5400"
                        />
                      </svg>
                    </button>
                    <button className="hover:text-gray-500" onClick={() => handleDeleteCampus(campus.id)}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V5H9V4C9 3.73478 9.10536 3.48043 9.29289 3.29289ZM7 5V4C7 3.20435 7.31607 2.44129 7.87868 1.87868C8.44129 1.31607 9.20435 1 10 1H14C14.7956 1 15.5587 1.31607 16.1213 1.87868C16.6839 2.44129 17 3.20435 17 4V5H19H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H20V20C20 20.7957 19.6839 21.5587 19.1213 22.1213C18.5587 22.6839 17.7957 23 17 23H7C6.20435 23 5.44129 22.6839 4.87868 22.1213C4.31607 21.5587 4 20.7957 4 20V7H3C2.44772 7 2 6.55228 2 6C2 5.44772 2.44772 5 3 5H5H7ZM6 7V20C6 20.2652 6.10536 20.5196 6.29289 20.7071C6.48043 20.8946 6.73478 21 7 21H17C17.2652 21 17.5196 20.8946 17.7071 20.7071C17.8946 20.5196 18 20.2652 18 20V7H6ZM15 11V17C15 17.5523 14.5523 18 14 18C13.4477 18 13 17.5523 13 17V11C13 10.4477 13.4477 10 14 10C14.5523 10 15 10.4477 15 11ZM11 11C11 10.4477 10.5523 10 10 10C9.44772 10 9 10.4477 9 11V17C9 17.5523 9.44772 18 10 18C10.5523 18 11 17.5523 11 17V11Z"
                          fill="#ff5400"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Không có dữ liệu cơ sở.</p>
          )}
        </div>
      </div>
      {/* modal config */}
      <Modal
        size="small"
        isOpen={isOpenFile}
        onClose={() => setIsOpenFile(false)}
        title="Xuất file lưu"
        showCloseButton={true}
        footerContent={
          <div className="flex justify-end gap-2">
            <Button size="big" onClick={() => setIsOpenFile(false)}>
              Hủy
            </Button>
            <Button className="outline-primary" size="big">
              Xác nhận
            </Button>
          </div>
        }
      >
        <p style={{ fontSize: '16px' }}>Xác nhận muốn xuất file này và toàn bộ thông tin bên trong? File lưu sẽ được tự động tải xuống.</p>
      </Modal>
      <Modal
        size="small"
        isOpen={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        title="Xóa thông tin"
        showCloseButton={true}
        footerContent={
          <div className="flex justify-end gap-2">
            <Button size="big" onClick={() => setIsOpenDelete(false)}>
              Hủy
            </Button>
            <Button
              className="outline-primary"
              size="big"
              onClick={() => {
                console.log('Xóa thông tin');
                setIsOpenDelete(false);
              }}
            >
              Xác nhận
            </Button>
          </div>
        }
      >
        <p style={{ fontSize: '16px' }}>Xác nhận muốn xoá thông tin này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể hoàn tác.</p>
      </Modal>
    </div>
  );
};

export default SchoolInfo;
