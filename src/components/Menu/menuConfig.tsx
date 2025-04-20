import { MenuItem } from './type';

const eye = require('../../assets/images/people/fi_eye.png');
const book = require('../../assets/images/people/Book.png');
const edit = require('../../assets/images/people/u_file-edit-alt.png');
const vector = require('../../assets/images/people/Vector.png');
const fi_bell = require('../../assets/images/people/fi_bell.png');
const question = require('../../assets/images/people/u_comment-question.png');

const BookV1 = require('../../assets/images/people/leadership/Book.png');
const Profile = require('../../assets/images/people/leadership/Profile.png');
const VectorV1 = require('../../assets/images/people/leadership/Vector.png');
const Settings = require('../../assets/images/people/leadership/fi_settings.png');
const Manage = require('../../assets/images/people/leadership/manage.png');
export const menuConfig: Record<string, MenuItem[]> = {
  student: [
    { id: 1, title: 'Tổng quan', icon: eye, path: '/student', roles: ['student'] },
    {
      id: 2,
      title: 'Quản lý lớp học',
      icon: book,
      path: '/student/class-list',
      roles: ['student'],
      subMenu: [
        { id: 2.1, title: 'Danh sách lớp học', path: '/student/class-list', roles: ['student'] },
        { id: 2.2, title: 'Tham gia vào lớp học', path: '/student/join-class', roles: ['student'] },
      ],
    },
    {
      id: 3,
      title: 'Bài kiểm tra',
      icon: edit,
      path: '/student/test-list',
      roles: ['student'],
      subMenu: [
        { id: 3.1, title: 'Danh sách bài kiểm tra', path: '/student/test-list', roles: ['student'] },
        { id: 3.2, title: 'Bảng điểm', path: '/student/score-board', roles: ['student'] },
      ],
    },

    { id: 4, title: 'Lịch thi', icon: vector, path: '/student/exam-schedule', roles: ['student'] },
    { id: 5, title: 'Thông báo', icon: fi_bell, path: '/student/notifications', roles: ['student'] },
    { id: 6, title: 'Trợ giúp', icon: question, path: '/student/help', roles: ['student'] },
  ],
  teacher: [
    { id: 1, title: 'Tổng quan', icon: eye, path: '/teacher', roles: ['teacher'] },
    {
      id: 2,
      title: 'Quản lý lớp học',
      icon: book,
      path: '/teacher/class-list',
      roles: ['teacher'],
      subMenu: [
        { id: 2.1, title: 'Danh sách lớp học', path: '/teacher/class-list', roles: ['teacher'] },
        { id: 2.2, title: 'Thêm buổi học mới', path: '/teacher/add-class', roles: ['teacher'] },
        { id: 2.3, title: 'Tham gia vào lớp học', path: '/teacher/join-class', roles: ['teacher'] },
      ],
    },
    {
      id: 3,
      title: 'Bài kiểm tra',
      icon: edit,
      path: '/teacher/test-list',
      roles: ['teacher'],
      subMenu: [
        { id: 3.1, title: 'Danh sách bài kiểm tra', path: '/teacher/test-list', roles: ['teacher'] },
        { id: 3.2, title: 'Thêm bài kiểm tra mới', path: '/teacher/add-test', roles: ['teacher'] },
        { id: 3.3, title: 'Nhập điểm', path: '/teacher/enter-scores', roles: ['teacher'] },
        { id: 3.4, title: 'Bảng điểm', path: '/teacher/score-board', roles: ['teacher'] },
      ],
    },
    { id: 4, title: 'Lịch thi', icon: vector, path: '/teacher/exam-schedule', roles: ['teacher'] },
    { id: 5, title: 'Thông báo', icon: fi_bell, path: '/teacher/notifications', roles: ['teacher'] },
    { id: 6, title: 'Trợ giúp', icon: question, path: '/teacher/help', roles: ['teacher'] },
  ],
  leadership: [
    { id: 1, title: 'Tổng quan', icon: eye, path: '/leadership', roles: ['leadership'] },
    { id: 2, title: 'Khai báo dữ liệu', icon: VectorV1, path: '/leadership/declare-data', roles: ['leadership'] },
    {
      id: 3,
      title: 'Hồ sơ học viên',
      icon: Profile,
      path: '',
      roles: ['leadership'],
      subMenu: [
        { id: 3.1, title: 'Tất cả hồ sơ', path: '/leadership/all-student-profiles', roles: ['leadership'] },
        { id: 3.2, title: 'Tiếp nhận chuyển trường', path: '/leadership/transfer-acceptance', roles: ['leadership'] },
        { id: 3.3, title: 'Bảo lưu', path: '/leadership/student-retention', roles: ['leadership'] },
      ],
    },

    {
      id: 4,
      title: 'Hồ sơ giảng viên',
      icon: Manage,
      path: '',
      roles: ['leadership'],
      subMenu: [
        { id: 4.1, title: 'Tất cả hồ sơ', path: '/leadership/all-teacher-profiles', roles: ['leadership'] },
        { id: 4.2, title: 'Phân công giảng dạy', path: '/leadership/teaching-assignment', roles: ['leadership'] },
      ],
    },
    { id: 5, title: 'Thi cử', icon: BookV1, path: '/leadership/exams', roles: ['leadership'] },
    { id: 6, title: 'Cài đặt hệ thống', icon: Settings, path: '/leadership/system-settings', roles: ['leadership'] },
  ],
};
