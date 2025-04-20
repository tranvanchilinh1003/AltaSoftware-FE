import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import Button from '../../../../../components/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../redux/store'; // Cập nhật đường dẫn theo đúng cấu trúc project
import {
  fetchOneTrainingLevels,
  updateTrainingLevel,
} from './../../../../../redux/reducers/Leadership/SystemSettings/TrainingLevelManagement/TrainingLevelManagementSlice';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';

const UpdateForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const trainingLevel = useSelector((state: RootState) => state.trainingLevelManagement.TrainingLevelResponseGetOne?.data);

  const [cookies] = useCookies(['refreshToken']);
  const refreshToken = cookies.refreshToken;
  const [formData, setFormData] = useState({
    id: 1,
    trinhDoDaoTao: '',
    hinhThucDaoTao: '',
    nienche: true,
    tinchi: true,
    namHoc: '',
    hocKyNam: '',
    hocPhanBatBuoc: '',
    hocPhanTuChon: '',
    ghiChu: '',
    kichHoat: false,
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchOneTrainingLevels({ id, token: refreshToken }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (trainingLevel) {
      setFormData({
        id: trainingLevel.id,
        trinhDoDaoTao: trainingLevel.name || '',
        hinhThucDaoTao: trainingLevel.trainingType || '',
        nienche: trainingLevel.isAnnualSystem ?? true,
        tinchi: trainingLevel.isCredit ?? true,
        namHoc: trainingLevel.trainingDuration?.toString() || '',
        hocKyNam: trainingLevel.semesterPerYear?.toString() || '',
        hocPhanBatBuoc: trainingLevel.mandatoryCourse?.toString() || '',
        hocPhanTuChon: trainingLevel.electiveCourse?.toString() || '',
        ghiChu: trainingLevel.description || '',
        kichHoat: trainingLevel.status ?? false,
      });
    }
  }, [trainingLevel]);

  const [errors, setErrors] = useState({
    trinhDoDaoTao: '',
    hinhThucDaoTao: '',
    ghiChu: '',
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Xóa lỗi khi người dùng nhập lại
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleOptionChange = (name: 'nienche' | 'tinchi') => {
    setFormData((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const validateForm = () => {
    let newErrors = { trinhDoDaoTao: '', hinhThucDaoTao: '', ghiChu: '' };
    let isValid = true;

    if (!formData.trinhDoDaoTao.trim()) {
      newErrors.trinhDoDaoTao = 'Trình độ đào tạo không được để trống.';
      isValid = false;
    }

    if (!formData.hinhThucDaoTao.trim()) {
      newErrors.hinhThucDaoTao = 'Hình thức đào tạo không được để trống.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const formattedData = {
        // id: id,
        name: formData.trinhDoDaoTao,
        trainingType: formData.hinhThucDaoTao,
        isAnnualSystem: formData.nienche,
        trainingDuration: formData.namHoc ? Number(formData.namHoc) : undefined,
        semesterPerYear: formData.hocKyNam ? Number(formData.hocKyNam) : undefined,
        isCredit: formData.tinchi,
        mandatoryCourse: formData.hocPhanBatBuoc ? Number(formData.hocPhanBatBuoc) : undefined,
        electiveCourse: formData.hocPhanTuChon ? Number(formData.hocPhanTuChon) : undefined,
        status: formData.kichHoat,
        description: formData.ghiChu,
      };
      dispatch(updateTrainingLevel({ updatedData: formattedData, id: id, token: refreshToken }))
        .unwrap()
        .then((res) => {
          // console.log('Cập nhật thành công:', res);
          toast.success('Cập nhật bảo lưu thành công!');
        })
        .catch((err) => {
          // console.error('Lỗi cập nhật:', err);
          toast.error('Lỗi cập nhật! Vui lòng kiểm tra lại dữ liệu trước khi cập nhật!');
        });
    }
  };

  const handleCancel = () => {
    setFormData({
      id: 1,
      trinhDoDaoTao: '',
      hinhThucDaoTao: '',
      nienche: true,
      tinchi: false,
      namHoc: '',
      hocKyNam: '',
      hocPhanBatBuoc: '',
      hocPhanTuChon: '',
      ghiChu: '',
      kichHoat: false,
    });
    navigate('/leadership/system-settings/training-level-management');
  };

  return (
    <div className="education-form-add">
      <h2 className="title">Cập nhật Bậc đào tạo</h2>

      <div className="form-group-education-add">
        <label>Trình độ đào tạo:</label>
        <input
          className="TDDT"
          type="text"
          name="trinhDoDaoTao"
          placeholder="Trung học cơ sở"
          value={formData.trinhDoDaoTao}
          onChange={handleChange}
        />
      </div>
      {errors.trinhDoDaoTao && <p className="error-text">{errors.trinhDoDaoTao}</p>}

      <div className="form-group-education-add">
        <label>Hình thức đào tạo:</label>
        <input className="HTDT" type="text" name="hinhThucDaoTao" placeholder="Tư nhân" value={formData.hinhThucDaoTao} onChange={handleChange} />
      </div>
      {errors.hinhThucDaoTao && <p className="error-text">{errors.hinhThucDaoTao}</p>}

      <div className="form-group-education-add">
        <label>
          <div className="checkbox-group">
            <input type="checkbox" checked={formData.nienche} onChange={() => handleOptionChange('nienche')} />
            <label>Niên chế</label>
          </div>
        </label>
        {formData.nienche && (
          <div className="extra-fields">
            <input type="number" name="namHoc" placeholder="Số năm" value={formData.namHoc} onChange={handleChange} /> Năm
            <input type="number" name="hocKyNam" placeholder="Học kỳ/Năm" value={formData.hocKyNam} onChange={handleChange} /> Học kỳ/Năm
          </div>
        )}
      </div>

      <div className="box-Text">
        <p>Đào tạo theo niên chế là đào tạo theo đơn vị năm học</p>
        <p>Mỗi chương trình đào tạo của một ngành, nghề được thể hiện trong một số tháng hoặc năm nhất định</p>
        <p>Mỗi năm học thường được tổ chức thành hai học kỳ</p>
      </div>

      <div className="form-group-education-add">
        <label>
          <div className="checkbox-group">
            <input type="checkbox" checked={formData.tinchi} onChange={() => handleOptionChange('tinchi')} />
            <label>Tín chỉ</label>
          </div>
        </label>

        {formData.tinchi && (
          <div className="extra-fields">
            <input type="number" name="namHoc" placeholder="Số năm" value={formData.namHoc} onChange={handleChange} /> Năm
            <input type="number" name="hocPhanBatBuoc" placeholder="Học phần bắt buộc" value={formData.hocPhanBatBuoc} onChange={handleChange} />
            Học phần bắt buộc
            <input type="number" name="hocPhanTuChon" placeholder="Học phần tự chọn" value={formData.hocPhanTuChon} onChange={handleChange} />
            Học phần tự chọn
          </div>
        )}
      </div>

      <div className="form-group-education-add">
        <label>Ghi chú:</label>
        <textarea name="ghiChu" placeholder="Nhập ghi chú..." value={formData.ghiChu} onChange={handleChange}></textarea>
      </div>

      <div className="form-group-education-add">
        <label>
          <div className="checkbox-group">
            <input type="checkbox" name="kichHoat" checked={formData.kichHoat} onChange={handleChange} />
            <label>Kích hoạt</label>
          </div>
        </label>
      </div>

      <div className="actions">
        <Button size="big" type="button" className="secondary" onClick={handleCancel}>
          Hủy
        </Button>
        <Button size="big" type="button" className="primary" onClick={handleSubmit}>
          Lưu
        </Button>
      </div>
    </div>
  );
};

export default UpdateForm;
