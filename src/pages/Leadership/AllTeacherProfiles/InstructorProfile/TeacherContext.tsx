import { createContext, useContext } from 'react';

type TeacherContextType = {
  teacherData: any;
  teacherInfo: any;
  teacherFamily: any;
  setTeacherData: (data: any) => void;
  setTeacherInfo: (info: any) => void;
  setTeacherFamily: (family: any) => void;
};

export const TeacherContext = createContext<TeacherContextType>({
  teacherData: null,
  teacherInfo: null,
  teacherFamily: null,
  setTeacherData: () => {},
  setTeacherInfo: () => {},
  setTeacherFamily: () => {},
});

export const useTeacherContext = () => useContext(TeacherContext);
