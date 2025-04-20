import { useState } from 'react';
import './style.scss';
import Button from '../../../../../components/Button';
import CheckboxComponent from '../../../../../components/CheckBox';

const SettingForm = () => {
  const [selectedOption, setSelectedOption] = useState<string>('full');
  const [permissions, setPermissions] = useState<Permissions>({
    khaiBaoDuLieu: { xem: false, chinhSua: false, xoa: false, themMoi: false },
    hoSoHocVien: { xem: false, chinhSua: false, xoa: false, themMoi: false },
    hoSoGiangVien: { xem: false, chinhSua: false, xoa: false, themMoi: false },
    thiCu: { xem: false, chinhSua: false, xoa: false, themMoi: false, nhapDiem: false },
    caiDatHeThong: { xem: false, chinhSua: false, xoa: false, themMoi: false },
  });

  type PermissionKeys = 'xem' | 'chinhSua' | 'xoa' | 'themMoi' | 'nhapDiem';

  type PermissionSection = {
    [key in PermissionKeys]?: boolean;
  };

  type Permissions = {
    khaiBaoDuLieu: PermissionSection;
    hoSoHocVien: PermissionSection;
    hoSoGiangVien: PermissionSection;
    thiCu: PermissionSection;
    caiDatHeThong: PermissionSection;
  };

  const handlePermissionChange = (section: keyof Permissions, permission: PermissionKeys) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [section]: {
        ...prevPermissions[section],
        [permission]: !prevPermissions[section][permission],
      },
    }));
  };

  return (
    <div className="education-form">
      <h2 className="title">Thiết lập nhóm người dùng</h2>
      <div className="form-group">
        <label>Tên nhóm:</label>
        <input className="TDDT" type="text" placeholder="Nhóm A" />
      </div>
      <div className="form-group">
        <label>Ghi chú:</label>
        <textarea placeholder="Nhập ghi chú..."></textarea>
      </div>
      <div className="form-group">
        <label>Phân quyền:</label>
        <div className="checkbox">
          <CheckboxComponent
            label="Toàn quyền quản trị"
            isChecked={selectedOption === 'full'}
            onChange={() => {
              console.log('Toàn quyền quản trị clicked');
              setSelectedOption('full');
            }}
          />
        </div>
        <div className="checkbox-group">
          <CheckboxComponent
            label="Tùy chọn"
            isChecked={selectedOption === 'custom'}
            onChange={() => {
              console.log('Tùy chọn clicked');
              setSelectedOption('custom');
            }}
          />
        </div>
      </div>
      {selectedOption === 'custom' && (
        <>
          <hr />
          <div className="extra-fields">
            <div className="permission-section">
              <label className="permission-label">Khai báo dữ liệu:</label>
              <div className="permission-row-custom-margin">
                <CheckboxComponent
                  label="Xem"
                  isChecked={permissions.khaiBaoDuLieu.xem}
                  onChange={() => handlePermissionChange('khaiBaoDuLieu', 'xem')}
                />
                <CheckboxComponent
                  label="Chỉnh sửa"
                  isChecked={permissions.khaiBaoDuLieu.chinhSua}
                  onChange={() => handlePermissionChange('khaiBaoDuLieu', 'chinhSua')}
                />
                <CheckboxComponent
                  label="Xóa"
                  isChecked={permissions.khaiBaoDuLieu.xoa}
                  onChange={() => handlePermissionChange('khaiBaoDuLieu', 'xoa')}
                />
                <CheckboxComponent
                  label="Thêm mới"
                  isChecked={permissions.khaiBaoDuLieu.themMoi}
                  onChange={() => handlePermissionChange('khaiBaoDuLieu', 'themMoi')}
                />
              </div>
            </div>
            <div className="permission-section">
              <label className="permission-label">Hồ sơ học viên:</label>
              <div className="permission-row-custom-margin">
                <CheckboxComponent
                  label="Xem"
                  isChecked={permissions.hoSoHocVien.xem}
                  onChange={() => handlePermissionChange('hoSoHocVien', 'xem')}
                />
                <CheckboxComponent
                  label="Chỉnh sửa"
                  isChecked={permissions.hoSoHocVien.chinhSua}
                  onChange={() => handlePermissionChange('hoSoHocVien', 'chinhSua')}
                />
                <CheckboxComponent
                  label="Xóa"
                  isChecked={permissions.hoSoHocVien.xoa}
                  onChange={() => handlePermissionChange('hoSoHocVien', 'xoa')}
                />
                <CheckboxComponent
                  label="Thêm mới"
                  isChecked={permissions.hoSoHocVien.themMoi}
                  onChange={() => handlePermissionChange('hoSoHocVien', 'themMoi')}
                />
              </div>
            </div>
            <div className="permission-section">
              <label className="permission-label">Hồ sơ giảng viên:</label>
              <div className="permission-row-custom-margin">
                <CheckboxComponent
                  label="Xem"
                  isChecked={permissions.hoSoGiangVien.xem}
                  onChange={() => handlePermissionChange('hoSoGiangVien', 'xem')}
                />
                <CheckboxComponent
                  label="Chỉnh sửa"
                  isChecked={permissions.hoSoGiangVien.chinhSua}
                  onChange={() => handlePermissionChange('hoSoGiangVien', 'chinhSua')}
                />
                <CheckboxComponent
                  label="Xóa"
                  isChecked={permissions.hoSoGiangVien.xoa}
                  onChange={() => handlePermissionChange('hoSoGiangVien', 'xoa')}
                />
                <CheckboxComponent
                  label="Thêm mới"
                  isChecked={permissions.hoSoGiangVien.themMoi}
                  onChange={() => handlePermissionChange('hoSoGiangVien', 'themMoi')}
                />
              </div>
            </div>
            <div className="permission-section">
              <label className="permission-label">Thi cử:</label>
              <div className="permission-row-custom-margin">
                <CheckboxComponent
                  label="Xem"
                  isChecked={permissions.thiCu.xem}
                  onChange={() => handlePermissionChange('thiCu', 'xem')}
                />
                <CheckboxComponent
                  label="Chỉnh sửa"
                  isChecked={permissions.thiCu.chinhSua}
                  onChange={() => handlePermissionChange('thiCu', 'chinhSua')}
                />
                <CheckboxComponent
                  label="Xóa"
                  isChecked={permissions.thiCu.xoa}
                  onChange={() => handlePermissionChange('thiCu', 'xoa')}
                />
                <CheckboxComponent
                  label="Thêm mới"
                  isChecked={permissions.thiCu.themMoi}
                  onChange={() => handlePermissionChange('thiCu', 'themMoi')}
                />
                <CheckboxComponent
                  label="Nhập điểm"
                  isChecked={permissions.thiCu.nhapDiem}
                  onChange={() => handlePermissionChange('thiCu', 'nhapDiem')}
                />
              </div>
            </div>
            <div className="permission-section">
              <label className="permission-label">Cài đặt hệ thống:</label>
              <div className="permission-row-custom-margin">
                <CheckboxComponent
                  label="Xem"
                  isChecked={permissions.caiDatHeThong.xem}
                  onChange={() => handlePermissionChange('caiDatHeThong', 'xem')}
                />
                <CheckboxComponent
                  label="Chỉnh sửa"
                  isChecked={permissions.caiDatHeThong.chinhSua}
                  onChange={() => handlePermissionChange('caiDatHeThong', 'chinhSua')}
                />
                <CheckboxComponent
                  label="Xóa"
                  isChecked={permissions.caiDatHeThong.xoa}
                  onChange={() => handlePermissionChange('caiDatHeThong', 'xoa')}
                />
                <CheckboxComponent
                  label="Thêm mới"
                  isChecked={permissions.caiDatHeThong.themMoi}
                  onChange={() => handlePermissionChange('caiDatHeThong', 'themMoi')}
                />
              </div>
            </div>
          </div>
        </>
      )}
      <div className="actions">
        <Button size="big" type="submit" className="secondary">
          Hủy
        </Button>
        <Button size="big" type="submit" className="primary">
          Lưu
        </Button>
      </div>
    </div>
  );
};

export default SettingForm;