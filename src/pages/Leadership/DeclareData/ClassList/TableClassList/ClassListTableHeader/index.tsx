import {
  TableCell,
  TableRow,
  TableHeader,
} from '../../../../../../components/ui/tabble';
import CheckboxComponent from '../../../../../../components/CheckBox';
import { IconArrowUpDown } from '../../../../../../components/Icons';
import { ClassListTableHeaderProps } from './type';
const ClassListTableHeader: React.FC<
  ClassListTableHeaderProps
> = ({ selectAll, indeterminate, onSelectAllChange }) => {
  return (
    <TableHeader className="bg-gradient-to-r from-background-orange-1 to-background-1 text-while-text">
      <TableRow>
        <TableCell
          isHeader
          className="px-4 py-3 font-medium text-start text-while-text w-[80px]"
        >
          <div className="flex items-center gap-2 text-sm md:text-base lg:text-lg">
            <CheckboxComponent
              isChecked={selectAll}
              isIndeterminate={indeterminate}
              onChange={onSelectAllChange}
              iconName={
                indeterminate
                  ? 'iconMinusActiveBlueLarge'
                  : selectAll
                  ? 'iconCheckActiveBlueLarge'
                  : 'iconCheckboxUncheckedBlue'
              }
            />
          </div>
        </TableCell>

        <TableCell
          isHeader
          className="px-4 py-3 font-medium text-start text-while-text"
        >
          <div className="flex items-center gap-2 text-sm md:text-base lg:text-lg">
            Mã lớp
            <IconArrowUpDown className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </div>
        </TableCell>
        <TableCell
          isHeader
          className="px-4 py-3 font-medium text-start text-while-text"
        >
          <div className="flex items-center gap-2 text-sm md:text-base lg:text-lg">
            Tên lớp
            <IconArrowUpDown className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </div>
        </TableCell>
        <TableCell
          isHeader
          className="px-4 py-3 font-medium text-start text-while-text"
        >
          <div className="flex items-center gap-2 text-sm md:text-base lg:text-lg">
            <span className="block lg:hidden gap-2 text-sm md:text-base lg:text-lg">
              Giáo viên
            </span>
            <span className="hidden xl:block">
              Giáo viên chủ nhiệm
            </span>
            <IconArrowUpDown className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </div>
        </TableCell>

        <TableCell
          isHeader
          className="px-4 py-3 font-medium text-start text-while-text w-[150px]"
        >
          <span className="invisible">.</span>
        </TableCell>
      </TableRow>
    </TableHeader>
  );
};

export default ClassListTableHeader;
