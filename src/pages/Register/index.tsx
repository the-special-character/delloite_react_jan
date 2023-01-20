import React from 'react';
import CustomForm from '../../components/CustomForm';
import {
  RegisterFormType,
  registerFields,
  registerInitValues,
} from './registerFields';
import { useAuth } from '../../context/authContext';

type Props = {};

const Register = (props: Props) => {
  const { register } = useAuth();

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
