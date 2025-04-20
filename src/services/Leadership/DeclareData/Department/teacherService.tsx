import createAxiosInstance from '../../../../utils/axiosInstance';
const axiosInstance = createAxiosInstance(true);
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchTeacherListAPI = async (page = 1, pageSize = 10, sortColumn = 'Id', sortOrder = 'asc', search = '') => {
  const response = await axiosInstance.get(`api/subject-groups`, {
    params: { page, pageSize, sortColumn, sortOrder, search },
  });

  return response.data;
};
export const deleteTeacherAPI = async (id: number) => {
  const response = await axiosInstance.delete(`/api/subject-groups/${id}`);
  return response.data;
};
