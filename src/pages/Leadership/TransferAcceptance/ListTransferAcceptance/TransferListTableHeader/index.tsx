import { TableCell, TableRow, TableHeader } from '../../../../../components/ui/tabble';
import TableHeaderCell from '../../../../../components/ui/TableHeaderCell';
const TransferListTableHeader: React.FC = () => {
  return (
    <TableHeader className="bg-gradient-to-r from-background-orange-1 to-background-1 text-white text-xs lg:text-xl md:text-lg sm:text-md xs:text-sm">
      <TableRow>
        <TableHeaderCell label="Mã học viên" />
        <TableHeaderCell label="Tên học viên" />
        <TableHeaderCell label="Ngày sinh" />
        <TableHeaderCell label="Giới tính" />
        <TableHeaderCell label="Chuyển từ" />
        <TableHeaderCell label="Học kỳ chuyển" />
        <TableHeaderCell label="Khối" />
        <TableHeaderCell label="Ngày chuyển" />
        <TableCell isHeader className="px-4 py-3 font-medium text-start text-white w-[150px]">
          <span className="invisible">Chức năng</span>
        </TableCell>
      </TableRow>
    </TableHeader>
  );
};

export default TransferListTableHeader;
