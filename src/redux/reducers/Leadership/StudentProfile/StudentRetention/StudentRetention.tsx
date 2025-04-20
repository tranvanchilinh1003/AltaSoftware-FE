import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

const API_URL = 'https://fivefood.shop/api/reserves';
const API_URL_CLASS = 'https://fivefood.shop/api/class';

interface StudentRetention {
  id: number;
  code: string;
  fullName: string;
  studentId: number;
  className: string;
  dob: string;
  gender: string;
  reserveDate: string;
  retentionPeriod: string;
  reason: string;
  file: string | undefined | any;
  semester: string;
  classId: number;
  semesterId: number;
  leadershipId: number;
}

interface FormattedData {
  id: number | any;
  studentId: number;
  reserveDate: string | null;
  retentionPeriod: string;
  reason: string;
  file: string;
  classId: number | any;
  semesterId: number | any;
}

interface StudentRetentionResponse {
  code: number;
  message: string;
  data: StudentRetention[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

// Kiểu dữ liệu của state
interface StudentRetentionState {
  StudentRetention: StudentRetentionResponse | null;
  selectedStudentRetention: StudentRetention | null;
  fetchClassEdit: SchoolClass | null;
  loading: boolean;
  error: string | null;
}

export interface StudentRetentionSingleResponse {
  code: number;
  message: string;
  data: StudentRetention;
}

interface GradeLevel {
  id: number;
  code: string;
  name: string;
  teacherId: string;
}

interface AcademicYear {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  semesters: any[]; // hoặc bạn có thể tạo thêm interface cho semester nếu cần
}

interface User {
  id: number;
  code: string;
  fullName: string;
  year: string | null;
  enrollmentDate: string;
  userStatus: string | null;
}

interface ClassType {
  id: number;
  name: string;
  status: boolean;
  description: string;
  academicYear: AcademicYear | null;
}

interface SchoolClass {
  id: number;
  code: string;
  name: string;
  studentQuantity: number;
  subjectQuantity: number;
  description: string;
  active: boolean;
  gradeLevel: GradeLevel;
  academicYear: AcademicYear;
  user: User;
  classType: ClassType;
  subjects: any[]; // hoặc interface Subject[] nếu có định nghĩa
  student: any[]; // hoặc interface Student[] nếu có định nghĩa
}
// Khởi tạo state ban đầu
const initialState: StudentRetentionState = {
  StudentRetention: null,
  selectedStudentRetention: null,
  fetchClassEdit: null,
  loading: false,
  error: null,
};

export const fetchStudentRetention = createAsyncThunk(
  'studentRetention/fetchStudentRetention',
  async ({
    page,
    pageSize,
    search,
    sortColumn,
    sortOrder,
  }: {
    page: number;
    pageSize: number;
    search: string;
    sortColumn: string;
    sortOrder: string;
  }) => {
    const response = await fetch(`${API_URL}?page=${page}&pageSize=${pageSize}&search=${search}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }
    const data: StudentRetentionResponse = await response.json();
    // console.log('check data', data);
    return data;
  },
);

export const fetchOneStudentRetention = createAsyncThunk('studentRetention/fetchOneStudentRetention', async (id: string | number) => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch student retention: ${response.status} ${response.statusText}`);
  }
  const data: StudentRetentionSingleResponse = await response.json();
  return data?.data;
});

// thêm mới
export const postStudentRetention = createAsyncThunk(
  'studentRetention/postStudentRetention',
  async ({ newStudentRetentionData, token }: { newStudentRetentionData: FormattedData; token: string }, { rejectWithValue }) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Sử dụng token truyền vào
      },
      body: JSON.stringify(newStudentRetentionData), // Gửi dữ liệu mới
    });

    if (!response.ok) {
      return rejectWithValue(`Failed to create: ${response.status} ${response.statusText}`); // Nếu lỗi, trả về thông báo lỗi
    }

    const data = await response.json();
    return data as StudentRetention; // Trả về dữ liệu tạo mới
  },
);

// xóa
export const deleteStudentRetention = createAsyncThunk('studentRetention/deleteStudentRetention', async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete training level: ${response.status} ${response.statusText}`);
  }

  return id; // Trả về ID để reducer có thể cập nhật state
});

// cập nhật
export const updateStudentRetention = createAsyncThunk(
  'studentRetention/updateStudentRetention',
  async ({ updatedData, token }: { updatedData: FormattedData; token: string }, { rejectWithValue }) => {
    const response = await fetch(`${API_URL}/${updatedData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      return rejectWithValue(`Failed to update: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data as StudentRetention;
  },
);
// lấy danh sách lớp + học sinh
export const fetchClassEdit = createAsyncThunk(
  'studentRetention/fetchClassEdit',
  async ({ page, pageSize, sortColumn, sortOrder }: { page: number; pageSize: number; sortColumn: string; sortOrder: string }) => {
    const response = await fetch(`${API_URL_CLASS}?page=${page}&pageSize=${pageSize}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }
    const data: SchoolClass = await response.json();
    // console.log('check data', data);
    return data;
  },
);

const studentRetention = createSlice({
  name: 'studentRetention',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentRetention.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentRetention.fulfilled, (state, action: PayloadAction<StudentRetentionResponse>) => {
        state.loading = false;
        state.StudentRetention = action.payload;
      })
      .addCase(fetchStudentRetention.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Có lỗi xảy ra!';
      })
      .addCase(fetchOneStudentRetention.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneStudentRetention.fulfilled, (state, action: PayloadAction<StudentRetention>) => {
        state.loading = false;
        state.selectedStudentRetention = action.payload;
      })
      .addCase(fetchOneStudentRetention.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Có lỗi khi lấy dữ liệu!';
      })

      .addCase(postStudentRetention.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postStudentRetention.fulfilled, (state, action: PayloadAction<StudentRetention>) => {
        state.loading = false;
        if (state.StudentRetention) {
          state.StudentRetention.data.push(action.payload);
        }
      })
      .addCase(postStudentRetention.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Có lỗi khi thêm mới!';
      })
      .addCase(deleteStudentRetention.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudentRetention.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        if (state.StudentRetention) {
          state.StudentRetention.data = state.StudentRetention.data.filter((trainingLevel) => trainingLevel.id !== action.payload);
        }
      })
      .addCase(deleteStudentRetention.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Có lỗi khi xóa!';
      })
      .addCase(updateStudentRetention.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudentRetention.fulfilled, (state, action: PayloadAction<StudentRetention>) => {
        state.loading = false;
        state.selectedStudentRetention = action.payload;
      })
      .addCase(updateStudentRetention.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || 'Có lỗi xảy ra khi cập nhật!';
      })
      .addCase(fetchClassEdit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClassEdit.fulfilled, (state, action: PayloadAction<SchoolClass>) => {
        state.loading = false;
        state.fetchClassEdit = action.payload;
      })
      .addCase(fetchClassEdit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Có lỗi xảy ra!';
      });
  },
});

export default studentRetention.reducer;
