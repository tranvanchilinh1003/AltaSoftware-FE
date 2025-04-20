import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

const API_URL = 'https://fivefood.shop/api/transfer-school/list';
const API_URL_POST = 'https://fivefood.shop/api/transfer-school';
const API_URL_ADDRESS = 'https://provinces.open-api.vn/api/p';
const API_URL_STUDENT = 'https://fivefood.shop/api/studentinfos/all';
const API_URL_GET_ONE = 'https://fivefood.shop/api/transfer-school/byStudentId';

interface TransferStudent {
  studentId: number;
  fullName: string;
  code: string;
  dateOfBirth: string; // ISO format date string
  gender: string;
  transferDate: string; // ISO format date string
  transferSemester: string;
  transferToSchool: string | null;
  gradeLevel: string;
  semesterStart: string; // ISO format date string
  semesterEnd: string; // ISO format date string
}

interface TransferStudentResponse {
  code: number;
  message: string;
  data: TransferStudent[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

interface StudentTransferInfo {
  studentId: number;
  studentCode: string;
  fullName: string;
  transferSchoolDate: string;
  transferToSchool: string;
  schoolAddress: string;
  reason: string;
  provinceCode: number;
  districtCode: number;
  attachmentName: string;
  attachmentPath: string;
  semesterId: number;
  userId: number;
}

interface FormattedData {
  studentId?: number;
  studentCode: any;
  fullName: any;
  transferSchoolDate: string; // hoặc Date nếu bạn sẽ chuyển đổi chuỗi thành đối tượng Date
  transferToSchool: string;
  schoolAddress: string;
  reason: string;
  provinceCode: number;
  districtCode: number;
  attachmentName: string;
  attachmentPath: string;
  semesterId: number;
  userId: number | any;
}

interface Semester {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
}

interface AcademicYear {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  semesters: Semester[];
}

interface Student {
  userId: number;
  code: string;
  fullName: string;
  dob: string; // ISO date string
  gender: string;
  nation: string;
  className: string;
  status: string | null;
  academicYear: AcademicYear;
}

interface StudentApiResponse {
  code: number;
  message: string;
  data: Student[];
}

// Kiểu dữ liệu của state
interface transferAcceptanceState {
  StudentTransferInfo: StudentTransferInfo | null;
  TransferStudentResponse: TransferStudentResponse | null;
  StudentApiResponse: StudentApiResponse | null;
  fetchProvince: Province[] | null;
  fetchDistrict: District | null;
  loading: boolean;
  error: string | null;
}

// tỉnhtỉnh
interface Province {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  districts: [];
}

// phường
interface Ward {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  district_code: number;
}
interface districtsDel {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  district_code: number;
  wards: Ward[];
}
// huận huyện
interface District {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  province_code: number;
  districts: districtsDel[];
}

// Khởi tạo state ban đầu
const initialState: transferAcceptanceState = {
  StudentTransferInfo: null,
  TransferStudentResponse: null,
  StudentApiResponse: null,
  fetchProvince: [],
  fetchDistrict: null,
  loading: false,
  error: null,
};

export const fetchTransferSchool = createAsyncThunk(
  'transferAcceptance/fetchTransferAcceptance',
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
    const response = await fetch(
      `${API_URL_POST}?page=${page}&pageSize=${pageSize}&search=${search}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }
    const data: TransferStudentResponse = await response.json();
    return data;
  },
);

export const fetchAllStudent = createAsyncThunk('transferAcceptance/fetchAllStudent', async (token) => {
  const response = await fetch(`${API_URL_STUDENT}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
  }
  const data: StudentApiResponse = await response.json();
  return data;
});

export const fetchOneTransferSchool = createAsyncThunk('transferAcceptance/fetchOneTransferAcceptance', async (id: any) => {
  const response = await fetch(`${API_URL_GET_ONE}/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch student retention: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return data?.data;
});

// thêm mới
export const postTransferAcceptance = createAsyncThunk(
  'transferAcceptance/postTransferAcceptance',
  async ({ Data, token }: { Data: FormattedData; token: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL_POST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(Data),
      });

      const result = await response.json();

      if (!response.ok) {
        return rejectWithValue(result);
      }

      return result;
    } catch (error) {
      return rejectWithValue({ message: 'Something went wrong', error });
    }
  },
);

// xóa
export const deleteTransferAcceptance = createAsyncThunk(
  'transferAcceptance/deleteTransferAcceptance',
  async ({ id, token }: { id: any; token: any }) => {
    const response = await fetch(`${API_URL_GET_ONE}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete training level: ${response.status} ${response.statusText}`);
    }

    return id; // Trả về ID để reducer có thể cập nhật state
  },
);

// cập nhật
export const updateTransferAcceptance = createAsyncThunk(
  'transferAcceptance/updateTransferAcceptance',
  async ({ updatedData, token }: { updatedData: FormattedData; token: string }, { rejectWithValue }) => {
    const response = await fetch(`${API_URL_POST}/${updatedData.studentCode}`, {
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
    // console.log('data retun', data);

    return data;
  },
);
// lấy danh sách tỉnh
export const fetchProvince = createAsyncThunk('transferAcceptance/fetchProvince', async () => {
  const response = await fetch(`${API_URL_ADDRESS}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
  }
  const data: Province[] = await response.json();
  return data;
});
// lấy danh sách huyện
export const fetchDistrict = createAsyncThunk('transferAcceptance/fetchDistrict', async (provinceCode: number) => {
  const response = await fetch(`${API_URL_ADDRESS}/${provinceCode}?depth=3`);
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
  }
  const data: District = await response.json();
  return data;
});

const transferAcceptance = createSlice({
  name: 'transferAcceptance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransferSchool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransferSchool.fulfilled, (state, action: PayloadAction<TransferStudentResponse>) => {
        state.loading = false;
        state.TransferStudentResponse = action.payload;
      })
      .addCase(fetchTransferSchool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Có lỗi xảy ra!';
      })
      .addCase(fetchAllStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllStudent.fulfilled, (state, action: PayloadAction<StudentApiResponse>) => {
        state.loading = false;
        state.StudentApiResponse = action.payload;
      })
      .addCase(fetchAllStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Có lỗi xảy ra!';
      })
      .addCase(fetchOneTransferSchool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneTransferSchool.fulfilled, (state, action: PayloadAction<StudentApiResponse>) => {
        state.loading = false;
        state.StudentApiResponse = action.payload;
      })
      .addCase(fetchOneTransferSchool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Có lỗi khi lấy dữ liệu!';
      })

      // .addCase(deleteStudentRetention.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(deleteStudentRetention.fulfilled, (state, action: PayloadAction<any>) => {
      //   state.loading = false;
      //   if (state.StudentRetention) {
      //     state.StudentRetention.data = state.StudentRetention.data.filter((trainingLevel) => trainingLevel.id !== action.payload);
      //   }
      // })
      // .addCase(deleteStudentRetention.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message || 'Có lỗi khi xóa!';
      // })
      .addCase(updateTransferAcceptance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTransferAcceptance.fulfilled, (state, action: PayloadAction<StudentApiResponse>) => {
        state.loading = false;
        state.StudentApiResponse = action.payload;
      })
      .addCase(updateTransferAcceptance.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || 'Có lỗi xảy ra khi cập nhật!';
      })
      .addCase(fetchProvince.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProvince.fulfilled, (state, action: PayloadAction<Province[]>) => {
        state.loading = false;
        state.fetchProvince = action.payload;
      })
      .addCase(fetchProvince.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Có lỗi xảy ra!';
      })
      .addCase(fetchDistrict.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDistrict.fulfilled, (state, action: PayloadAction<District>) => {
        state.loading = false;
        state.fetchDistrict = action.payload;
      })
      .addCase(fetchDistrict.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Có lỗi xảy ra!';
      });
  },
});

export default transferAcceptance.reducer;
