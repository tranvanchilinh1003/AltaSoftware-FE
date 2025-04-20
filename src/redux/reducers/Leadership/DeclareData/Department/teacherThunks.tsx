import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteTeacherAPI } from '../../../../../services/Leadership/DeclareData/Department/teacherService';

export const deleteTeacher = createAsyncThunk('teacher/deleteTeacher', async (id: number, { rejectWithValue }) => {
  try {
    await deleteTeacherAPI(id);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || 'Lỗi xóa giáo viên');
  }
});
