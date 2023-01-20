import React from 'react';
import { Form, Formik, Field } from 'formik';
import { loginFields, loginInitValues } from './loginFields';
import CustomForm from '../../components/CustomForm';

const wait = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

type Props = {};

const Login = (props: Props) => {
  return (
    <CustomForm
      initialValues={loginInitValues}
      onSubmit={async () => {
        await wait(3000);
      }}
      fields={loginFields}
      btnText="Sign in"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-900"
          >
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Forgot your password?
          </a>
        </div>
      </div>
    </CustomForm>
  );
};

export default Login;
