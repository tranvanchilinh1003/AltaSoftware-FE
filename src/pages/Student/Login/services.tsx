import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface servicesProps {
  isValid?: boolean;
  clearErrors?: any;
  data?: any;
  axiosInstance?: any;
  setLoading?: any;
  setInfo?: any,
  setCookies?: any,
  setRole?: any,
  navigator?: any,
  setError?: any
}

export const serviceLogin = async (props: servicesProps) => {
  try {
    const response = await props.axiosInstance.post('api/auth/login', props.data);
    const info = response.data?.data;
    props.setInfo(info);
    props.setCookies('accessToken', info?.accessToken, { maxAge: (60 * 60) + (60*15), path: '/' });
    props.setCookies('refreshToken', info?.refreshToken?.token, { maxAge: 60 * 60 * 10, path: '/' });

    if (info?.user?.role === 'ADMIN') {
      props.setRole(1);
      props.navigator('/leadership');
    } else if (info?.user?.role === 'TEACHER') {
      props.setRole(2);
      props.navigator('/teacher');
    } else if (info?.user?.role === 'STUDENT') {
      props.setRole(3);
      props.navigator('/student');
    } else {
      props.navigator('/login');
    }
  } catch (error) {
    const err = error as AxiosError<any>;
    toast.error(err?.response?.data?.message);
    props.setError('loginFailed', { message: 'Tài khoản hoặc mật khẩu không đúng !' });
    console.log('Lỗi khi đăng nhập!', error);
  } finally {
    props.setLoading(false);
  }
};

export const serviceChangePassword = async (props: servicesProps) => {
  try {
    props.setLoading(true);
    const response = await props.axiosInstance.post('api/Account/change-password', props?.data);
    if (response?.data && response?.data?.code === 0) {
      toast.success(response?.data?.data);
      props?.navigator('/');
    }
  } catch (error) {
    const err = error as AxiosError<any>;
    toast.error(err?.response?.data?.data);
  } finally {
    props.setLoading(false);
  }
}

export const serviceGetOTP = async (props: servicesProps) => {
  try {
    props.setLoading(true);
    const response = await props?.axiosInstance.post('api/Account/request-password-reset', props?.data);
  } catch (error) {
    
  }
}
