import { useState } from 'react';
import './style.scss';
import IconImages from '../../../../components/IconImages';
import AddStudentPopup from '../../../../components/AddStudentPopup';
import { StudentListProps } from './type';

const StudentList: React.FC<StudentListProps> = ({ students, students_add }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleAddStudent = (students_add: any) => {
    setSelectedStudents(students_add);
    console.log('Added student:', students_add);
  };

  return (
    <div className="student-list">
      <div className="student-list-header">
        <h3>Danh sách học viên</h3>
        <button className="add-studenlist-btn" onClick={setPopupOpen.bind(null, true)}>
          <img src={IconImages.iconPlusBlue} alt="close" width={'20px'} />
        </button>
        <button className="studenlist-menu-btn">⋮</button>
      </div>
      <ul>
        {students.map((student, index) => (
          <li key={index} className={`student ${student.muted ? 'muted' : ''}`}>
            <div className="student-avatar">{<img src={student.img} alt={student.name} />}</div>
            <div className="student-info">
              <span className={`name ${student.isTeacher ? 'teacher' : ''}`}>{student.name}</span>
              {student.muted ? <i className="icon-muted">🔇</i> : <i className="icon-unmuted">🎤</i>}
            </div>
            <button className="studenlist-menu-btn">⋮</button>
          </li>
        ))}
      </ul>
      <AddStudentPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} students={students_add} onAddStudent={handleAddStudent} />
    </div>
  );
};

export default StudentList;
