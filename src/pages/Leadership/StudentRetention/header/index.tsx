import Button from '../../../../components/Button';
import CalendarInput from '../../../../components/CalendarInput';
import './style.scss';
const StudentRetentionHeader: React.FC = () => {
  return (
    <>
      <div className="header-container-opstion">
        <header className="header">
          <span className="breadcrumb">
            <span className="inactive">Hồ sơ học viên</span>
            <span className="separator">{'>'}</span>
            <span className="active">Hồ sơ bảo lưu</span>
          </span>
        </header>

        <div className="button-container">
          <div className="CalendarInput">
            <CalendarInput selectedDate={new Date()} locale="vi-VN" placeholder="Chọn ngày" />
          </div>
          <Button className="primary" size="big" icon>
            Thêm mới
          </Button>
        </div>
      </div>
    </>
  );
};

export default StudentRetentionHeader;
