import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTeacherListAPI } from '../../../../../services/Leadership/DeclareData/Department/teacherService';
import { deleteTeacher } from './teacherThunks';
import { Teacher } from './type';

export const fetchTeacherList = createAsyncThunk(
  'teacher/fetchTeacherList',
  async ({ page, pageSize, search }: { page: number; pageSize: number; search?: string }, { rejectWithValue }) => {
    try {
      const response: any = await fetchTeacherListAPI(page, pageSize, 'Id', 'asc', search || '');
      console.log(response);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Lỗi khi lấy danh sách giáo viên');
    }
  },
);
interface TeacherState {
  data: Teacher[];
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

const initialState: TeacherState = {
  data: [],
  loading: false,
  error: null,
  page: 1,
  pageSize: 8,
  totalItems: 0,
  totalPages: 1,
};

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacherList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeacherList.fulfilled, (state, action) => {
        state.loading = false;
        const teachers = action.payload.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          fullName: item.teacher.fullName,
        }));
        state.data = teachers;
        state.page = action.payload.page;
        state.pageSize = action.payload.pageSize;
        state.totalItems = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchTeacherList.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.payload as string;
      })
      .addCase(deleteTeacher.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.loading = false;
        // Xóa giáo viên khỏi state
        state.data = state.data.filter((teacher) => teacher.id !== action.payload);
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Lỗi không xác định';
      });
  },
});

export default teacherSlice.reducer;
