import { Link } from 'react-router';
import { Icons } from './Icons';
import { ISchoolYear } from './type';
import './style.css';

const SchoolYearTable = ({ data, onDelete }: { data: ISchoolYear[]; onDelete: (id: number) => void }) => {
  return (
    <div className=" rounded-lg overflow-hidden">
      {/* tb head */}
      <table className="w-full table-fixed overflow-hidden rounded-t-lg">
        <thead className="h-8 sm:h-6 md:h-7 lg:h-8 xl:h-10 sm:text-[8px] md:text-[10px]  xl:text-[16px] bg-gradient-to-r from-[#F17F21] to-[#FF5400] text-white sticky top-0 z-1">
          <tr>
            <th className="w-1/12 p-1 sm:p-1 md:p-2 xl:p-3 first:rounded-tl-lg ">
              <div className="flex items-center justify-center gap-2 cursor-pointer">
                <span className="font-bold">STT</span>
                {/* <div className="flex flex-col items-center justify-center gap-1">
                  <img src={Icons.arrow_up_icon} className="w-2 h-1.5 ml-[1px]" alt="Up" />
                  <img src={Icons.arrow_down_icon} className="w-2 h-1.5" alt="Down" />
                </div> */}
              </div>
            </th>
            <th className="w-2/12 p-1 sm:p-1 md:p-2 lg:p-3 first:rounded-tl-lg lg:pl-12">
              <div className="flex items-center justify-center gap-2 cursor-pointer">
                <span className="font-bold">Niên khóa</span>
                {/* <div className="flex flex-col items-center justify-center gap-1">
                  <img src={Icons.arrow_up_icon} className="w-2 h-1.5 ml-[1px]" alt="Up" />
                  <img src={Icons.arrow_down_icon} className="w-2 h-1.5" alt="Down" />
                </div> */}
              </div>
            </th>
            <th className="w-3/12 p-1 sm:p-1 md:p-2 lg:p-3 lg:pl-16">Thời gian bắt đầu</th>
            <th className="w-3/12 p-1 sm:p-1 md:p-2 lg:p-3 ">Thời gian kết thúc</th>
            <th className="p-1 sm:p-1 md:p-2 lg:p-3 last:rounded-tr-lg" colSpan={6}></th>
          </tr>
        </thead>
      </table>

      {/* tb body */}
      <div className="border border-gray-100 overflow-y-auto max-h-[250px] sm:max-h-[250px] md:max-h-[250px] lg:max-h-[270px] xl:max-h-[570px] min-h-[400px] custom-scrollbar">
        <table className="w-full overflow-hidden rounded-t-lg">
          <tbody>
            {data.map((row, index) => (
              <tr key={row.id} className="text-center text-[16px] odd:background-white even:bg-[#f0f3f6]">
                <td className="lg:p-1.5 lg:pl-3">{index + 1}</td>
                <td className="lg:p-1.5">{row.name}</td>
                <td className="lg:p-1.5">{new Date(row.startTime).toLocaleDateString()}</td>
                <td className="lg:p-1.5">{new Date(row.endTime).toLocaleDateString()}</td>
                <td className="lg:p-1.5 flex justify-center gap-2">
                  <Link to={`/leadership/declare-data/school-year/edit-school-year/${row.id}`}>
                    <button className="w-10 h-10 bg-gray-100 hover:bg-orange-50 transition duration-300">
                      <img src={Icons.pencil_icon} alt="edit icon" className="w-8 h-8" />
                    </button>
                  </Link>
                  <button className="w-10 h-10 bg-gray-100 hover:bg-orange-50" onClick={() => onDelete(row.id)}>
                    <img src={Icons.trash_icon} alt="remove icon" className="w-8 h-8" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchoolYearTable;
