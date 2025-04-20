import dayjs from "dayjs";

export interface IUser {
    id: number; // Cột "id"
    code: string; // Cột "code"
    password: string; // Cột "password"
    fullName: string; // Cột "full_name"
    dob: dayjs.Dayjs | null; // Cột "dob"
    gender: boolean; // Cột "gender"
    email: string; // Cột "email"
    phoneNumber: string; // Cột "phone_number"

    placeBirth: string; // Cột nơi sinh
    nation: string; // Cột dân tộc
    religion: string; // Cột tôn giáo
    enrollmentDate: dayjs.Dayjs | null; // Cột ngày tạo

    role_id: number; // Cột "role_id"
    academicYearId: number; // Cột "academic_year_id"
    userStatusId: number; // Cột "user_status_id"
    classId: number; // Cột "class_id"
    entryType: number; // Cột "entry_type"

    addressFull: string; // Cột "address_full"
    provinceCode: number; // Cột "province_code"
    districtCode: number; // Cột "district_code"
    wardCode: number; // Cột "ward_code"
    street: string; // Cột "street"

    avatarUrl: string; // Cột "avatar_url"
    active: boolean; // Cột "active"
}
export interface ITeacherInfo {
    id: number; // ID giảng viên
    cccd: string; // Số căn cước công dân
    issuedDate: dayjs.Dayjs | null; // Ngày cấp căn cước công dân
    issuedPlace: string; // Nơi cấp căn cước công dân
    unionMember: boolean; // Có phải là đoàn viên không
    unionDate: dayjs.Dayjs | null; // Ngày vào đoàn
    unionPlace: string; // Nơi vào đoàn
    partyMember: boolean; // Có phải là đảng viên không
    partyDate: dayjs.Dayjs | null; // Ngày vào đảng
    userId: number; // ID người dùng
    addressFull: string; // Địa chỉ đầy đủ
    provinceCode: number; // Mã tỉnh
    districtCode: number; // Mã quận/huyện
    wardCode: number; // Mã xã/phường
    active: boolean; // Trạng thái hoạt động (đang hoạt động hay không)
    subjectId: number;
    position: string;
}

export interface IProvince {
    provinceId: number;
    provinceName: string;
    districtId: number;
    districtName: string;
    wardCode: number;
    wardName: string;
}