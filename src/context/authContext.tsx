import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { LoginFormType } from '../pages/Login/loginFields';
import { FormikHelpers } from 'formik';
import axiosInstance from '../utils/axiosInstance';
import { RegisterFormType } from '../pages/Register/registerFields';
import { UserType } from '../../types/types';

type AuthContextType = {
  login: (
    values: LoginFormType,
    formikHelpers: FormikHelpers<LoginFormType>,
  ) => Promise<void>;
  register: (
    values: RegisterFormType,
    formikHelpers: FormikHelpers<RegisterFormType>,
  ) => Promise<void>;
  logout: () => void;
  user?: UserType;
};

export const AuthContext = createContext<AuthContextType>({
  login: async (values, formikHelpers) => {},
  register: async (values, formikHelpers) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const token = localStorage.getItem('user');
    if (token) {
      setUser(JSON.parse(token));
    }
  }, []);

  const login = useCallback(
    async (
      values: LoginFormType,
      formikHelpers: FormikHelpers<LoginFormType>,
    ) => {
      try {
        const res = await axiosInstance.post('login', values);
        formikHelpers.resetForm();
        localStorage.setItem('user', JSON.stringify(res.data));
        setUser(res.data);
      } catch (error) {
        formikHelpers.setErrors({
          serverError: error.message,
        });
      }
    },
    [],
  );

  const register = useCallback(
    async (
      values: RegisterFormType,
      formikHelpers: FormikHelpers<RegisterFormType>,
    ) => {
      try {
        const { confirmPassword, ...rest } = values;
        const res = await axiosInstance.post('register', rest);
        formikHelpers.resetForm();
        localStorage.setItem('user', JSON.stringify(res.data));
        setUser(res.data);
      } catch (error) {
        formikHelpers.setErrors({
          serverError: error.message,
        });
      }
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(undefined);
    localStorage.clear();
  }, []);

  const value = useMemo(
    () => ({
      user,
      login,
      register,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
