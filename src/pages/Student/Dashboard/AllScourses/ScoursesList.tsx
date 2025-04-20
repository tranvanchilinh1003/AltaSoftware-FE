import { Subject } from './type';

const CourseList = ({ subjects }: { subjects: Subject[] }) => {
  return (
    <div className="divide-y">
      {subjects.map((subject, index) => (
        <div
          key={subject.id}
          className={`grid grid-cols-5 gap-4
                    ${index % 2 === 0 ? 'bg-[#F0F3F6] border-[#F0F3F6]' : ''}`}
        >
          <span className="px-4 py-3 font-bold text-black-text text-start text-xs md:text-sm lg:text-base">{subject.title}</span>
          <span className="px-4 py-3 text-black-text text-start text-xs md:text-sm lg:text-base">{subject.details.class}</span>
          <span className="px-4 py-3 text-black-text text-start text-xs md:text-sm lg:text-base">{subject.details.schedule}</span>
          <span className="px-4 py-3 text-black-text text-start text-xs md:text-sm lg:text-base">{subject.details.dateRange}</span>
          <span
            className={`px-4 py-3 text-start text-xs md:text-sm lg:text-base italic
    ${subject.details.status === 'Đang học' ? 'text-[#49c510]' : ''}
    ${subject.details.status === 'Chưa hoàn thành' ? 'text-red-status' : ''}
    ${subject.details.status === 'Đã hoàn thành' ? 'text-blue-status' : ''}
    ${subject.details.status === 'Đã lên lịch' ? 'text-yellow-status' : ''}`}
          >
            {subject.details.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
