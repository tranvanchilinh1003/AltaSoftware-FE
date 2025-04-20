import React from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import addRobotoFont from '../../../../utils/fonts/Roboto-Regular-normal'; // File thêm font
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { IScoreBoard } from './type';

// Hàm định dạng ngày
const formatDate = (dateValue: any) => {
  if (!dateValue) return '';
  const dateObj = new Date(dateValue);
  if (isNaN(dateObj.getTime())) return '';
  return dateObj.toLocaleDateString('vi-VN');
};

interface ScoreBoardExportProps {
  data: IScoreBoard[];
  exportType: 'pdf' | 'xlsx' | 'csv';
}

const ScoreBoardExport: React.FC<ScoreBoardExportProps> = ({ data, exportType }) => {
  const handleExport = () => {
    if (exportType === 'pdf') {
      // Đăng ký font trước khi tạo instance jsPDF
      addRobotoFont(jsPDF);

      // Tạo instance jsPDF (landscape)
      const doc = new jsPDF('landscape');

      // Set font với alias và fontStyle
      doc.setFont('Roboto-Regular', 'normal');
      doc.setFontSize(18);
      doc.text('Bảng Điểm', 14, 22);

      const tableColumn = ['STT', 'Họ và tên', 'Ngày sinh', 'Miệng', '15 phút', 'Hệ số 1', 'Hệ số 2', 'Trung bình', 'Ngày cập nhật'];
      const tableRows = data.map((item, index) => [
        index + 1,
        item.name,
        formatDate(item.birthday),
        item.mieng ?? 0,
        item.phut15 ?? 0,
        item.heSo1 ?? 0,
        item.heSo2 ?? 0,
        item.tbHocKy ?? 0,
        formatDate(item.ngayCapNhat),
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 30,
        theme: 'grid',
        styles: { font: 'Roboto-Regular', fontStyle: 'normal', fontSize: 10 },
        headStyles: {
          font: 'Roboto-Regular',
          fontStyle: 'normal',
          fontSize: 10,
        },
        bodyStyles: { font: 'Roboto-Regular', fontStyle: 'normal', fontSize: 10 },
      });

      doc.save('BangDiem.pdf');
    } else if (exportType === 'xlsx' || exportType === 'csv') {
      // Xuất Excel/CSV
      const worksheetData = [
        ['STT', 'Họ và tên', 'Ngày sinh', 'Miệng', '15 phút', 'Hệ số 1', 'Hệ số 2', 'Trung bình', 'Ngày cập nhật'],
        ...data.map((item, index) => [
          index + 1,
          item.name,
          formatDate(item.birthday),
          item.mieng ?? 0,
          item.phut15 ?? 0,
          item.heSo1 ?? 0,
          item.heSo2 ?? 0,
          item.tbHocKy ?? 0,
          formatDate(item.ngayCapNhat),
        ]),
      ];

      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Bảng Điểm');

      const fileType = exportType === 'xlsx' ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 'text/csv';
      const fileExt = exportType === 'xlsx' ? '.xlsx' : '.csv';

      const excelBuffer = XLSX.write(workbook, {
        bookType: exportType === 'xlsx' ? 'xlsx' : 'csv',
        type: 'array',
      });
      const blob = new Blob([excelBuffer], { type: fileType });
      saveAs(blob, `BangDiem${fileExt}`);
    }
  };

  return (
    <button
      onClick={handleExport}
      className="w-[160px] h-[40px] border border-orange-600 bg-orange-200 text-black-text font-semibold rounded-lg hover:bg-orange-300"
    >
      {exportType === 'pdf' ? 'Xuất PDF' : exportType === 'xlsx' ? 'Xuất Excel' : 'Xuất CSV'}
    </button>
  );
};

export default ScoreBoardExport;
