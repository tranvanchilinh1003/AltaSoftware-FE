import React from 'react';
import StudentList from './StudentList';
import SharedScreen from './SharedScreen';
import ClassShare from './ClassShare';
import './style.scss';
import { students, students_add } from './data/data';

const JoinClass = () => {
  return (
    <>
      <div className="joinClass-container">
        <StudentList students={students} students_add={students_add} />
        <div className="joinClass-conten">
          <SharedScreen />
          <ClassShare />
        </div>
      </div>
    </>
  );
};

export default JoinClass;
