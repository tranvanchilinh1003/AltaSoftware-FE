import { toast } from 'react-toastify';
import createAxiosInstance from '../../../../utils/axiosInstance';
import { formatDate } from '../../../../utils/formatDate';
import { parseBoolean } from '../../../../utils/parseBoolean';
import { useState } from 'react';
import axios from 'axios';

interface servicesProps {
  isValid: boolean;
  data: any;
  selectedImage: string;
  UserDefaultAVT: string;
  setLoading: any;
  reset: any;
}
type studentType = {
  code?: string;
  email: string;
  fullName: string;
  password?: string;
  dob: string; // ISO date string: "2004-11-12T00:00:00"
  gender: boolean;
  phoneNumber: string;
  placeBirth: string;
  nation: string;
  religion: string;
  enrollmentDate: string; // ISO date string: "2025-03-28T00:00:00"
  roleId: number;
  academicYearId: number;
  userStatusId: number;
  classId: number;
  entryType: number;
  addressFull: string;
  provinceCode: number;
  districtCode: number;
  wardCode: number;
  street: string;
  active: boolean;
  avatarUrl: string;
};
type familyType = {
  guardianName: string;
  guardianPhone: string;
  guardianJob: string;
  guardianDob: string;
  guardianRole: number;
  userId: number;
};

const axiosTrue = createAxiosInstance(true);

export const handleCreateUser = (servicesProps: servicesProps): void => {
  servicesProps.setLoading(true);

  if (servicesProps.isValid) {
    const birthday = servicesProps.data?.birthday;
    const enrollmentDate = servicesProps.data?.enrollmentDate;
    const formattedBirthday = formatDate(birthday as Date);
    const formattedEnrollment = formatDate(enrollmentDate as Date);

    const studentdata: studentType = {
      fullName: servicesProps.data?.fullname,
      password: '123456',
      gender: servicesProps.data?.gender?.value ? parseBoolean(servicesProps.data?.gender?.value) : true,
      dob: formattedBirthday,
      placeBirth: servicesProps.data?.birthPlace,
      nation: servicesProps.data?.folk,
      religion: servicesProps.data?.religion,
      academicYearId: servicesProps.data?.academicYear ? Number.parseInt(servicesProps.data?.academicYear?.value) : 0,
      classId: servicesProps.data?.class ? Number.parseInt(servicesProps.data?.class?.value) : 0,
      code: servicesProps.data?.code,
      enrollmentDate: formattedEnrollment,
      entryType: servicesProps.data?.entry ? Number.parseInt(servicesProps.data?.entry?.value) : 0,
      userStatusId: servicesProps.data?.status ? Number.parseInt(servicesProps.data?.status?.value) : 0,
      provinceCode: servicesProps.data?.province ? Number.parseInt(servicesProps.data?.province?.value) : 0,
      districtCode: servicesProps.data?.district ? Number.parseInt(servicesProps.data?.district?.value) : 0,
      wardCode: servicesProps.data?.ward ? Number.parseInt(servicesProps.data?.ward?.value) : 0,
      street: servicesProps.data?.addressDetail,
      email: servicesProps.data?.email,
      phoneNumber: servicesProps.data?.phone,
      addressFull: `${servicesProps.data?.addressDetail}, ${servicesProps.data?.ward?.label}, ${servicesProps.data?.district?.label}, ${servicesProps.data?.province?.label}`,

      active: true,
      roleId: 3,

      avatarUrl: servicesProps.selectedImage ? servicesProps.selectedImage?.split(',')[1] : '',
    };

    const familyData: familyType[] = servicesProps.data?.family
      ?.map((member: any) => ({
        guardianName: member?.guardianName,
        guardianPhone: member?.guardianPhone || '',
        guardianJob: member?.guardianJob || '',
        guardianDob: member?.guardianBornDate ? formatDate(member?.guardianBornDate as Date) : '',
        guardianRole: member?.guardianRole,
      }))
      .filter((item: any) => item?.guardianName.trim() !== '');

    console.log('student: ', studentdata);
    console.log('family: ', familyData);

    if (familyData?.length > 0) {
      axiosTrue
        .post('api/users', studentdata)
        .then((response) => {
          if (response?.data) {
            if (response?.data?.code === 1) {
              toast.error(response?.data?.message);
            } else {
              toast.success('Thêm mới học viên thành công !');
              const userId = response?.data?.data?.id;
              try {
                if (familyData) {
                  familyData.forEach((member) => {
                    member.userId = userId;
                    axiosTrue.post('api/studentinfos', member);
                  });
                  toast.success('Thêm thông tin gia đình của học viên thành công !');
                }
              } catch (error) {
                toast.error('Không thể thêm thông tin gia đình của học viên');
              }
              servicesProps.reset();
            }
          }
        })
        .catch((err) => {
          toast.error('Không thể thêm học viên !');
          console.log(err);
        })
        .finally(() => {
          servicesProps.setLoading(false);
        });
    } else {
      toast.error('Ít nhất phải có một thông tin gia đình của học viên');
      servicesProps.setLoading(false);
    }
  }
};

export const handleUpdateUser = (servicesProps: servicesProps, id: number): void => {
  servicesProps.setLoading(true);

  if (servicesProps.isValid) {
    const birthday = servicesProps.data?.birthday;
    const enrollmentDate = servicesProps.data?.enrollmentDate;
    const formattedBirthday = formatDate(birthday as Date);
    const formattedEnrollment = formatDate(enrollmentDate as Date);

    const studentdata: studentType = {
      fullName: servicesProps.data?.fullname,
      gender: servicesProps.data?.gender?.value ? parseBoolean(servicesProps.data?.gender?.value) : true,
      dob: formattedBirthday,
      placeBirth: servicesProps.data?.birthPlace,
      nation: servicesProps.data?.folk,
      religion: servicesProps.data?.religion,
      academicYearId: servicesProps.data?.academicYear ? Number.parseInt(servicesProps.data?.academicYear?.value) : 0,
      classId: servicesProps.data?.class ? Number.parseInt(servicesProps.data?.class?.value) : 0,
      enrollmentDate: formattedEnrollment,
      entryType: servicesProps.data?.entry ? Number.parseInt(servicesProps.data?.entry?.value) : 0,
      userStatusId: servicesProps.data?.status ? Number.parseInt(servicesProps.data?.status?.value) : 0,
      provinceCode: servicesProps.data?.province ? Number.parseInt(servicesProps.data?.province?.value) : 0,
      districtCode: servicesProps.data?.district ? Number.parseInt(servicesProps.data?.district?.value) : 0,
      wardCode: servicesProps.data?.ward ? Number.parseInt(servicesProps.data?.ward?.value) : 0,
      street: servicesProps.data?.addressDetail,
      email: servicesProps.data?.email,
      phoneNumber: servicesProps.data?.phone,
      addressFull: `${servicesProps.data?.addressDetail}, ${servicesProps.data?.ward?.label}, ${servicesProps.data?.district?.label}, ${servicesProps.data?.province?.label}`,

      active: true,
      roleId: 3,

      avatarUrl: servicesProps.selectedImage ? servicesProps.selectedImage?.split(',')[1] : '',
    };

    const familyData: familyType[] = servicesProps.data?.family
      ?.map((member: any) => ({
        guardianName: member?.guardianName,
        guardianPhone: member?.guardianPhone || '',
        guardianJob: member?.guardianJob || '',
        guardianDob: member?.guardianBornDate ? formatDate(member?.guardianBornDate as Date) : '',
        guardianRole: member?.guardianRole,
      }))
      .filter((item: any) => item?.guardianName.trim() !== '');

    console.log('student: ', studentdata);
    console.log('family: ', familyData);
    if (familyData?.length > 0) {
      axiosTrue
        .put(`api/users/${id}`, studentdata)
        .then((response) => {
          if (response?.data) {
            if (response?.data?.code === 1) {
              toast.error(response?.data?.message);
            } else {
              toast.success('Cập nhật mới học viên thành công !');
              const userId = response?.data?.data?.id;
              try {
                if (familyData) {
                  familyData.forEach((member) => {
                    member.userId = userId;
                    axiosTrue.put(`api/studentinfos/${id}`, member);
                  });
                  toast.success('Cập nhật thông tin gia đình của học viên thành công !');
                }
              } catch (error) {
                toast.error('Không thể cập nhật thông tin gia đình của học viên');
              }
            }
          }
        })
        .catch((err) => {
          toast.error('Không thể cập nhật học viên !');
          console.log(err);
        })
        .finally(() => {
          servicesProps.setLoading(false);
        });
    } else {
      toast.error('Ít nhất phải có một thông tin gia đình của học viên');
      servicesProps.setLoading(false);
    }
  }
};
