import React, { useCallback } from 'react';
import CustomForm from '../../components/CustomForm';
import {
  RegisterFormType,
  registerFields,
  registerInitValues,
} from './registerFields';
import { FormikHelpers } from 'formik';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

type Props = {};

const Register = (props: Props) => {
  const navigate = useNavigate();

  const register = useCallback(
    async (
      values: RegisterFormType,
      formikHelpers: FormikHelpers<RegisterFormType>,
    ) => {
      try {
        const { confirmPassword, ...rest } = values;
        const res = await axiosInstance.post('register', rest);
        formikHelpers.resetForm();
        navigate('/', {
          replace: true,
        });
      } catch (error) {
        formikHelpers.setErrors({
          serverError: error.message,
        });
      }
    },
    [],
  );

  return (
    <CustomForm<RegisterFormType>
      initialValues={registerInitValues}
      onSubmit={register}
      fields={registerFields}
      btnText="Sign up"
    />
  );
};

export default Register;
