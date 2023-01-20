import React from 'react';
import { FieldProps, FormikValues } from 'formik';
import clsx from 'clsx';

type Props<V> = { options: { value: any; text: string }[] } & FieldProps<V> &
  React.InputHTMLAttributes<HTMLInputElement>;

const Select = <V extends FormikValues = FormikValues>({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.,
  className,
  options,
  ...props
}: Props<V>): JSX.Element => {
  return (
    <div>
      <label htmlFor={props.id} className="sr-only">
        {props.placeholder}
      </label>
      <select
        className={clsx(
          'relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm',
          {
            [className || '']: !!className,
          },
        )}
        {...props}
        {...field}
      >
        <option value="">{props.placeholder}</option>
        {options.map((x) => (
          <option key={x.value} value={x.value}>
            {x.text}
          </option>
        ))}
      </select>

      {touched[field.name] && errors[field.name] && (
        <p className="text-red-400 text-sm font-semibold my-2">
          {errors[field.name]}
        </p>
      )}
    </div>
  );
};

export default Select;
