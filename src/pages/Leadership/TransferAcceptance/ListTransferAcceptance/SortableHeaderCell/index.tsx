import { TableCell } from '../../../../../components/ui/tabble';
import { IconArrowUpDown } from '../../../../../components/Icons';
import type { SortableHeaderCellProps } from './type';


const SortableHeaderCell: React.FC<SortableHeaderCellProps> = ({ label, width }) => {
  return (
    <TableCell isHeader className={`px-4 py-3 font-medium text-start text-white ${width || ''}`}>
      <div className="flex items-center gap-2 text-xs md:text-sm lg:text-base">
        {label}
        <button>
          <IconArrowUpDown className="w-4 h-4 lg:w-5 lg:h-5" />
        </button>
      </div>
    </TableCell>
  );
};

export default SortableHeaderCell;
