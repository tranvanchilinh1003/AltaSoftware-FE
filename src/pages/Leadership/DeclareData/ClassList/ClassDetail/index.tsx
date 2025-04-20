import React, { useState } from "react"; 
import AddressList from "../../../../../components/AddressUrlStack/Index";   
import Status from "../../../../../components/Status";
import { StatusProps } from "../../../../../components/Status/type";  
import { Link } from "react-router";
import {TableList } from "./Type";
const trash = require('../../../../../assets/icons/fi_trash-2.png');
const edit = require('../../../../../assets/icons/fi_edit.png'); 
const ClassList: React.FC = () => {
  const [urls,setUrls]=useState([{link:"/",linkName:"Khai báo dữ liệu"},{link:"/",linkName:"Lớp học"},{link:"/",linkName:"Chi tiết lớp học"}])
  const [lopHoc,setLopHoc]=useState({
    baseInfo:{
      nienKhoa:"2022-2012",
      khoi:6,
      maLopHoc:"THN",
      tenLopHoc:"6A1",
      GVCN:"Nguyen Thi B",
      soLuongHocVien:22,
      loaiLop:"Thong Thuong",
      soLuongMon:11,
      moTa:"Lop hoc moi nhat danh cho cac ban dam me lap trinh"
    },
    students:hocVien,
    subjects:monHoc
  })
  return (
    <>
      <AddressList addressList={urls} />
      <div className=" mt-3 rounded-lg border-2 border-orange-500 bg-orange-50 p-5 mr-2">
        <div className="flex justify-between items-start mt-2">
          <p className="font-bold text-orange-600 mb-3">Thông tin chung</p>
          <div className="flex gap-2">
            <Link to={'/leadership/declare-data/update-class'}>
              <img src={edit} alt="Edit" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
            </Link>
            <img src={trash} alt="Edit" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
          </div>
        </div>

        <div className="flex flex-wrap  w-full w-full">
          <div className="w-full md:w-1/2 lg:w-1/3  ">
            <div className="flex flex-wrap items-start mt-2">
              <p className="font-bold md:w-2/5 w-2/4">Niên khóa: </p>
              <p className="md:w-3/5 w-2/4">{lopHoc.baseInfo.nienKhoa} </p>
            </div>
            <div className="flex flex-wrap items-start mt-2">
              <p className="font-bold md:w-2/5 w-2/4">Khoa khối: </p>
              <p className="md:w-3/5 w-2/4">{lopHoc.baseInfo.khoi}</p>
            </div>
            <div className="flex flex-wrap items-start mt-2">
              <p className="font-bold md:w-2/5 w-2/4  ">Mã lớp học: </p>
              <p className="md:w-3/5 w-2/4">{lopHoc.baseInfo.maLopHoc}</p>
            </div>
            <div className="flex flex-wrap items-center mt-2">
              <p className="font-bold md:w-2/5 w-2/4 ">Tên lớp học: </p>
              <p className="md:w-3/5 w-2/4">{lopHoc.baseInfo.tenLopHoc}</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3  ">
            <div className="flex flex-wrap items-start mt-2">
              <p className="font-bold md:w-2/5 w-2/4 ">GVCN: </p>
              <p className="md:w-3/5 w-2/4">{lopHoc.baseInfo.GVCN}</p>
            </div>
            <div className="flex flex-wrap items-start mt-2">
              <p className="font-bold md:w-2/5 w-2/4 ">Số lượng học viên: </p>
              <p className="md:w-3/5 w-2/4">{lopHoc.baseInfo.soLuongHocVien}</p>
            </div>
            <div className="flex flex-wrap items-start mt-2">
              <p className="font-bold md:w-2/5 w-2/4 ">Loại lớp học: </p>
              <p className="md:w-3/5 w-2/4">{lopHoc.baseInfo.loaiLop}</p>
            </div>
            <div className="flex flex-wrap items-start mt-2">
              <p className="font-bold md:w-2/5 w-2/4 ">Số lượng môn: </p>
              <p className="md:w-3/5 w-2/4">{lopHoc.baseInfo.soLuongMon}</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3  ">
            <div className="flex flex-wrap items-start mt-2">
              <p className="font-bold md:w-1/4 w-2/4 ">Mô tả: </p>
              <p className="md:w-3/4 w-2/4">{lopHoc.baseInfo.moTa}</p>
            </div>
          </div>
        </div>
      </div>
      <TableClassList students={lopHoc.students} subject={lopHoc.subjects} />
    </>
  );
}; 
const TableClassList: React.FC<TableList> = () => {
  const [tab,setTab]=useState(0);
  const [tableData,setTableData]=useState({
    monHoc:monHoc,
    hocVien:hocVien,
    titleControl:titleHocVien
  }) 
  const changeTab=(tabId:number)=>{
      if(tabId===0){ 
        tableData.titleControl=titleHocVien
      }else{
        tableData.titleControl=titleMonHoc 
      }
      setTab(tabId)
  }
   return <div className="p-3   mr-2 mt-3 "> 
      <span onClick={()=>changeTab(0)} className={`p-2 cursor-pointer pl-5 pr-5 text-xs font-bold rounded-full ${tab===0?"text-white bg-black":"bg-gray-200 text-gray-500"}`}>Danh sách học viên</span> 
      <span onClick={()=>changeTab(1)} className={`p-2 cursor-pointer ml-2 pl-5 pr-5 text-xs font-bold rounded-full ${tab===1?"text-white bg-black":"bg-gray-200 text-gray-500"}`}>Danh sách môn học</span> 
      <div className="rounded-lg overflow-auto mt-5  border border-gray-200"> 
        <table className="w-full border-collapse  rounded-t-lg">
          <thead className="bg-gradient-to-r from-background-orange-1 to-background-1 text-while-text">
            <tr> 
              {tableData.titleControl.map(v=><th className="py-3 px-2 md:px-4 text-left">
                <div className="flex items-center gap-2 font-sans">
                  <span>{v.propertyName}</span> 
                </div>
              </th>)} 
            </tr>
          </thead>
          <tbody>
          {tab===0&&tableData.hocVien.map((v, index) => (
              <tr  key={1} className={` odd:bg-gray-200  border-b  ${1 % 2 === 1 ? 'bg-gray-100' : ''}`}>
                <td className="py-3 px-2 md:px-4 font-sans text-black-text">{index+1}</td>
                <td className="py-3 px-2 md:px-4 font-sans text-black-text">{v.maHocVien}</td>
                <td className="py-3 px-2 md:px-4 font-sans text-black-text">{v.tenHocVien}</td>
                <td className="py-3 px-2 md:px-4 font-sans text-black-text">{v.nienKhoa}</td>
                <td className="py-3 px-2 md:px-4 font-sans text-black-text">{v.ngayNhapHoc}</td> 
                <td className="py-3 px-2 md:px-4 font-sans text-black-text"><Status type={v.tinhTrang as StatusProps["type"]} /></td> 
                <td className="py-3 px-2 md:px-4 font-sans text-black-text"><Link to="edit">
                    <img src={edit} alt="Edit" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                    </Link></td> 
              </tr>
          ))}
          {tab===1&&tableData.monHoc.map((v, index) => (
              <tr key={1} className=" odd:bg-gray-200">
                <td className="py-3 px-2 md:px-4 font-sans text-black-text">{index+1}</td>
                <td className="py-3 px-2 md:px-4 font-sans text-black-text">{v.maMonHoc}</td>
                <td className="py-3 px-2 md:px-4 font-sans text-black-text">{v.tenMonHoc}</td>
                <td className="py-3 px-2 md:px-4 font-sans text-black-text">{v.loaiMonHoc}</td>
                <td className="py-3 px-2 md:px-4 font-sans text-black-text">{v.soTietHK1}</td> 
                <td className="py-3 px-2 md:px-4 font-sans text-black-text">{v.soTietHK2}</td>  
              </tr>
          ))}  
          </tbody>
        </table>  
      </div>  
  </div>
};  


const titleHocVien=[  
  {propertyName:"STT" },
  {propertyName:"Mã học viên" },
  {propertyName:"Tên học viên" },
  {propertyName:"Niên khóa" },
  {propertyName:"Ngày nhập học" },
  {propertyName:"Tình trạng" },
  {propertyName:"Thao tác"},  
] 
const titleMonHoc=[  
  {propertyName:"STT" },
  {propertyName:"Mã môn học" },
  {propertyName:"Tên môn học" },
  {propertyName:"Loại môn học" },
  {propertyName:"Số tiết HK1" },
  {propertyName:"Số tiết HK2" },  
] 
const hocVien=[{
  "maHocVien": "HV002",
  "tenHocVien": "Trần Thị B",
  "nienKhoa": "2021-2024",
  "ngayNhapHoc": "2021-09-01",
  "tinhTrang": "graduated",   
},
{
  "maHocVien": "HV002",
  "tenHocVien": "Trần Thị B",
  "nienKhoa": "2021-2024",
  "ngayNhapHoc": "2021-09-01",
  "tinhTrang":"studying"
},
{
  "maHocVien": "HV002",
  "tenHocVien": "Trần Thị B",
  "nienKhoa": "2021-2024",
  "ngayNhapHoc": "2021-09-01",
  "tinhTrang":"studying"
}]
const monHoc=[{
  "maMonHoc": "HV001",
  "tenMonHoc": "Lập trình căn bản",
  "loaiMonHoc": "2022-2025",
  "soTietHK1": "45",
  "soTietHK2": "33",
  
},{
  "maMonHoc": "HV002",
  "tenMonHoc": "Hệ quản trị CSDL",
  "loaiMonHoc": "2022-2025",
  "soTietHK1": "35",
  "soTietHK2": "24",
  
},{
  "maMonHoc": "HV003",
  "tenMonHoc": "Cơ sở dữ liệu",
  "loaiMonHoc": "2022-2025",
  "soTietHK1": "22",
  "soTietHK2": "33", 
}] 
export default ClassList;
 