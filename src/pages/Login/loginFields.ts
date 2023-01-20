import { FieldAttributes } from 'formik';
import TextInput from '../../components/TextInput';
import React from 'react';

type LoginFormType = {
  email: string;
  password: string;
};

export const loginInitValues = {
  email: '',
  password: '',
};

export const loginFields: FieldAttributes<LoginFormType>[] = [
  {
    component: TextInput,
    id: 'email-address',
    name: 'email',
    type: 'email',
    autoComplete: 'email',
    placeholder: 'Email address',
    className: 'rounded-t-md',
    validate: (value: string) => {
      if (!value) {
        return 'Required...';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'Enter valid email';
      }
      return '';
    },
  },
  {
    component: TextInput,
    id: 'password',
    name: 'password',
    type: 'password',
    autoComplete: 'current-password',
    placeholder: 'Password',
    className: 'rounded-b-md',
    validate: (value: string) => {
      if (!value) {
        return 'Required...';
      }
      return '';
    },
  },
];
