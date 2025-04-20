import React, { useState } from 'react';
import './style.scss';
import { AddStudentPopupProps, Student } from './type';
import IconImages from '../IconImages';
const AddStudentPopup: React.FC<AddStudentPopupProps> = ({ isOpen, onClose, students, onAddStudent }) => {
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState<string>('');

  const handleToggleStudent = (student: Student) => {
    setSelectedStudents((prev) => {
      const isAlreadySelected = prev.some((s) => s.id === student.id);
      if (isAlreadySelected) {
        return prev.filter((s) => s.id !== student.id); // Bỏ chọn
      } else {
        return [...prev, student]; // Chọn thêm
      }
    });
  };

  const handleConfirmSelection = () => {
    onAddStudent(selectedStudents);
    setSelectedStudents([]);
    onClose();
  };

  const filteredStudents = students.filter((student) => student.name.toLowerCase().includes(search.toLowerCase()));

  if (!isOpen) return null;

  return (
    <div className="popup">
      <div className="popup__overlay" onClick={onClose} />
      <div className="popup__content">
        <button className="popup__close" onClick={onClose}>
          <img src={IconImages.iconXCancel} alt="close" />
        </button>
        <h2 className="popup__title">Thêm học viên</h2>

        <div className="popup__search">
          <input type="text" placeholder="Tìm kết quả theo ID, tên,..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="popup__search-btn">
            <img src={IconImages.iconSearch} alt="close" />
          </button>
        </div>

        <div className="popup__list">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => {
              const isSelected = selectedStudents.some((s) => s.id === student.id);
              return (
                <div key={student.id} className="popup__student">
                  <img src={student.avatar} alt={student.name} className="popup__avatar" />
                  <span className="popup__name">{student.name}</span>
                  <button className={`popup__add-btn ${isSelected ? 'selected' : ''}`} onClick={() => handleToggleStudent(student)}>
                    {isSelected ? <img src={IconImages.iconXCancel} alt="cancel" /> : <img src={IconImages.iconPlusBlue} alt="add" />}
                  </button>
                </div>
              );
            })
          ) : (
            <p className="popup__no-results">Không tìm thấy học viên nào</p>
          )}
        </div>

        <button className="popup__submit" onClick={handleConfirmSelection} disabled={selectedStudents.length === 0}>
          Thêm ({selectedStudents.length})
        </button>
      </div>
    </div>
  );
};

export default AddStudentPopup;
