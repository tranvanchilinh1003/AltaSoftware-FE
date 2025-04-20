import TitleComponent from '../../../components/Title';
import AllScourses from './AllScourses';
import StudentAchievementChart from './chart';

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-[1fr_2fr] pr-4  xl:grid-cols-[1fr_2fr] xl:gap-4">
      <div className="col-span-full xl:col-auto">
        <TitleComponent text="Tổng quan" size={30} weight="extrabold" className="" />
        <StudentAchievementChart />
      </div>
      <div className="col-span-full xl:col-auto">
        <TitleComponent text="Tấc cả khóa học" size={30} weight="extrabold" className="mb-5" />
        <AllScourses />
      </div>
    </div>
  );
};

export default Dashboard;
