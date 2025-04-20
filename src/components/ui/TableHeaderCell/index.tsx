import { TableCell } from '../../../components/ui/tabble';
import { IconArrowUpDown } from '../../../components/Icons';
import type { TableHeaderCellProps } from './type';


const TableHeaderCell: React.FC<TableHeaderCellProps> = ({ label, width, sortable = true, children }) => {
    return (
      <TableCell isHeader className={`px-4 py-3 font-medium text-start text-white ${width || ''}`}>
        <div className="flex items-center gap-2 text-xs md:text-sm lg:text-base">
          {label}
          {sortable ? (
            <button>
              <IconArrowUpDown className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          ) : null}
          {children} {/* Cho phép truyền nội dung tùy chỉnh */}
        </div>
      </TableCell>
    );
  };

export default TableHeaderCell;
