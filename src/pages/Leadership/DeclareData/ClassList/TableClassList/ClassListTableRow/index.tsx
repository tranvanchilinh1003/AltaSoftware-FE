import { TableCell, TableRow } from '../../../../../../components/ui/tabble';
import CheckboxComponent from '../../../../../../components/CheckBox';
import IconImages from '../../../../../../components/IconImages';
import { ClassListTableRowProps } from './type';
import { Link } from 'react-router-dom';

const ClassListTableRow: React.FC<ClassListTableRowProps> = ({ item, index, isChecked, onItemChange, onDelete }) => {
  return (
    <TableRow key={item.id} className={index % 2 === 0 ? 'bg-[#F0F3F6] border-[#F0F3F6]' : ''}>
      <TableCell className="px-4 py-3 text-gray-500 text-start text-sm md:text-base lg:text-lg dark:text-gray-400 w-[80px]">
        <CheckboxComponent
          isChecked={isChecked}
          onChange={(event) => onItemChange(index, event)}
          iconName={isChecked ? 'iconCheckActiveBlueLarge' : 'iconCheckboxUncheckedBlue'}
        />
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-start text-sm md:text-base lg:text-lg dark:text-gray-400">{item.classCode}</TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-start text-sm md:text-base lg:text-lg dark:text-gray-400">{item.className}</TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-start text-sm md:text-base lg:text-lg dark:text-gray-400">{item.teacher}</TableCell>

      <TableCell className="px-4 py-3 text-start w-[150px]">
        <div className="flex gap-2">
          <button>
            <Link to={'/leadership/declare-data/class-detail'}>
              <img src={IconImages.OrangeEyeOutline} alt="Xem" className="w-4 md:w-5 lg:w-6" />
            </Link>
          </button>

          <button>
            <Link to={'/leadership/declare-data/update-class'}>
              <img src={IconImages.OrangeEditWriteOutline} alt="Sửa" className="w-3 md:w-4 lg:w-5" />
            </Link>
          </button>

          <button onClick={() => onDelete && onDelete(item)}>
            <img src={IconImages.iconTrashBinOutlineOrange} alt="Xóa" className="w-4 md:w-5 lg:w-6" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ClassListTableRow;
