
import {
    TableCell, TableHeader, TableRow
} from '../../../../../components/ui/tabble';
import TableHeaderCell from '../../../../../components/ui/TableHeaderCell';

const TeachingAssignmentListTableHeader: React.FC= () => {
    return (
        <TableHeader className="table-auto bg-gradient-to-r from-background-orange-1 to-background-1 text-white text-xs lg:text-xl md:text-lg sm:text-md xs:text-sm">
            <TableRow>
                <TableCell
                    isHeader
                    className="px-4 py-3 font-medium text-start text-white">
                    <span className="invisible">Checkbox</span>
                </TableCell>
                <TableHeaderCell label="Mã lớp" />
                <TableHeaderCell label="Tên lớp" />
                <TableHeaderCell label="Ngày bắt đầu" />
                <TableHeaderCell label="Ngày kết thúc" />
                <TableHeaderCell label="Danh sách chủ đề" />
                <TableCell
                    isHeader
                    className="px-4 py-3 font-medium text-start text-white">
                    <span className="invisible">Chức năng</span>
                </TableCell>
            </TableRow>
        </TableHeader>
    );
};

export default TeachingAssignmentListTableHeader;
