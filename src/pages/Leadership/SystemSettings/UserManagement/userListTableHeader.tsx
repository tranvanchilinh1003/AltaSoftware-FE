import { TableCell, TableRow, TableHeader } from '../../../../components/ui/tabble';
import TableHeaderCell from '../../../../components/ui/TableHeaderCell';

const UserListTableHeader: React.FC = () => {
  return (
    <TableHeader className="bg-br-gradient-right-or text-white text-xs lg:text-xl md:text-lg sm:text-md xs:text-sm">
      <TableRow>
        <TableHeaderCell label="Tên" />
        <TableHeaderCell label="Email" />
        <TableHeaderCell label="Nhóm người dùng" />
        <TableHeaderCell label="Trạng thái" />
        <TableCell isHeader className="px-4 py-3 font-medium text-start text-white w-[150px]">
          <span className="invisible">Hành động</span>
        </TableCell>
      </TableRow>
    </TableHeader>
  );
};

export default UserListTableHeader;
