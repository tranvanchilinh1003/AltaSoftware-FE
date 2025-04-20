import AllStudentProfilesHeader from './header';
// import TableAllStudentProfiles from './table/StudentAll';

const AllStudentProfiles: React.FC = () => {
  return (
    <>
      <div className="student-retention">
        <AllStudentProfilesHeader />
        <div className="content">{/* <TableAllStudentProfiles /> */}</div>
      </div>
    </>
  );
};

export default AllStudentProfiles;
