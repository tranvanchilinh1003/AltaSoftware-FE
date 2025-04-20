import { TableCell, TableRow, TableHeader } from '../../../../../components/ui/tabble';
import TableHeaderCell from '../../../../../components/ui/TableHeaderCell';

const UserManagementTableHeader: React.FC = () => {
  return (
    <TableHeader className="bg-br-gradient-right-or text-white text-xs lg:text-xl md:text-lg sm:text-md xs:text-sm">
      <TableRow>
        <TableHeaderCell label="Tên Nhóm" />
        <TableHeaderCell label="Tổng số thành viên" />
        <TableHeaderCell label="Ghi chú" />
        <TableCell isHeader className="px-4 py-3 font-medium text-start text-white w-[150px]">
          <span className="invisible">Chức năng</span>
        </TableCell>
      </TableRow>
    </TableHeader>
  );
};

export default UserManagementTableHeader;
