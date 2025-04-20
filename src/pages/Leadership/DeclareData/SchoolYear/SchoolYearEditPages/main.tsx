import SchoolYearFormEdit from '../SchoolYearFormEdit';
const SchoolYearEditPages: React.FC = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-8 items-start">
        <div className="col-span-full">
          <SchoolYearFormEdit />
        </div>
      </div>
    </div>
  );
};

export default SchoolYearEditPages;
