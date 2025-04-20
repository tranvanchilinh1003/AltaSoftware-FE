import CheckboxComponent from '../../../../../components/CheckBox';
import IconImages from '../../../../../components/IconImages';
import { IconClipboardTextOutline } from '../../../../../components/Icons';
import { TableCell, TableRow } from '../../../../../components/ui/tabble';
import { columns } from '../tableColumns';
import { getCellValue } from './getCellValue';
import { TeachingAssignmentListTableRowProps } from './type';

const TeachingAssignmentListTableRow: React.FC<TeachingAssignmentListTableRowProps> = ({ item, index, onDelete, onEdit, isChecked, onItemChange }) => {
  return (
      <TableRow key={item.id} className={index % 2 === 0 ? 'bg-[#F0F3F6] border-[#F0F3F6]' : ''}>
          <TableCell key="id" className="hidden">{item.id}</TableCell>
          <TableCell className="px-4 py-3 text-center w-[50px]">
              <CheckboxComponent
                  isChecked={isChecked}
                  onChange={(event) => {
                      console.log(`Mã mục: ${item.id}, Đã chọn: ${event.target.checked}`);
                      onItemChange(item.id, event);  // Truyền item.id vào đây
                  }}
                  iconName={isChecked ? 'iconCheckActiveBlueLarge' : 'iconCheckboxUncheckedBlue'}
              />


          </TableCell>
      {/* Data Columns */}
          {columns.map((col) => (
              <TableCell key={col.key}>
                  {getCellValue(item, col)}
              </TableCell>
          ))}

      <TableCell className="px-4 py-3 text-start">
        <div className="flex gap-2">
                  <button>
                      <IconClipboardTextOutline className='w-5 h-5 md:w-6 md:h-6 lg:w-6 lg:h-6 text-orange-text' />
                  </button>
        </div>
      </TableCell>
      {/* Action Buttons Column */}
      <TableCell className="px-4 py-3 text-start w-[150px]">
        <div className="flex gap-2">
          <button onClick={() => onEdit(item)}>
            <img src={IconImages.OrangeEditWriteOutline} alt="Xem" className="w-4 md:w-5 lg:w-6" />
          </button>
          <button>
            <img
              src={IconImages.iconTrashBinOutlineOrange}
              alt="Xóa"
              className="w-4 md:w-5 lg:w-6 cursor-pointer"
              onClick={() => onDelete?.(item.id)}
            />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TeachingAssignmentListTableRow;
