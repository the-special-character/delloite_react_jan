import { FieldAttributes } from 'formik';
import TextInput from '../../components/TextInput';
// import Select from '../../components/Select';

export type RegisterFormType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  serverError?: string;
};

export const registerInitValues: RegisterFormType = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const registerFields: FieldAttributes<RegisterFormType>[] = [
  {
    component: TextInput,
    id: 'name',
    name: 'name',
    autoComplete: 'name',
    placeholder: 'Name',
    className: 'rounded-t-md',
    validate: (value: Pick<RegisterFormType, 'email'>) => {
      if (!value) {
        return 'Required...';
      }
      return '';
    },
  },
  //   {
  //     component: Select,
  //     id: 'gender',
  //     name: 'gender',
  //     autoComplete: 'sex',
  //     placeholder: 'Please Select Gender',
  //     options: [
  //       {
  //         value: 'male',
  //         text: 'Male',
  //       },
  //       {
  //         value: 'female',
  //         text: 'Female',
  //       },
  //       {
  //         value: 'other',
  //         text: 'Other',
  //       },
  //     ],
  //     validate: (value: Pick<RegisterFormType, 'email'>) => {
  //       if (!value) {
  //         return 'Required...';
  //       }
  //       return '';
  //     },
  //   },
  {
    component: TextInput,
    id: 'email-address',
    name: 'email',
    type: 'email',
    autoComplete: 'email',
    placeholder: 'Email address',
    validate: (value: Pick<RegisterFormType, 'email'>) => {
      if (!value) {
        return 'Required...';
      }
      return '';
    },
  },
  {
    component: TextInput,
    id: 'password',
    name: 'password',
    type: 'password',
    autoComplete: 'new-password',
    placeholder: 'Password',
    validate: (value: Pick<RegisterFormType, 'password'>) => {
      if (!value) {
        return 'Required...';
      }
      return '';
    },
  },
  {
    component: TextInput,
    id: 'confirm-password',
    name: 'confirmPassword',
    type: 'password',
    autoComplete: 'new-password',
    placeholder: 'Confirm Password',
    className: 'rounded-b-md',
    validate: (value: Pick<RegisterFormType, 'password'>) => {
      if (!value) {
        return 'Required...';
      }
      return '';
    },
  },
];
