export interface UserListItem {
  id: number;
  name: string;
  email: string;
  userGroup: string;
  status: string;
}

const UserListData: UserListItem[] = [
  {
    id: 1,
    name: 'Nguyen Van A',
    email: 'nguyenvana@example.com',
    userGroup: 'Quản trị viên',
    status: 'Đang hoạt động',
  },
  {
    id: 2,
    name: 'Tran Thi B',
    email: 'tranthib@example.com',
    userGroup: 'Học sinh tiểu học',
    status: 'Đã vô hiệu hóa',
  },
  // ...more data...
];

export default UserListData;
