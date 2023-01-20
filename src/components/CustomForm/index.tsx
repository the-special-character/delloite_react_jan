import {
  Field,
  FieldAttributes,
  Form,
  Formik,
  FormikConfig,
  FormikValues,
} from 'formik';
import React, { PropsWithChildren } from 'react';

type Props<V> = {
  btnText: string;
  fields: FieldAttributes<V>[];
} & FormikConfig<V> &
  PropsWithChildren;

const CustomForm = <V extends FormikValues = FormikValues, U = {}>({
  fields,
  btnText,
  children,
  ...props
}: Props<V>) => {
  return (
    <Formik {...props}>
      {({ isSubmitting, isValid, dirty, errors }) => (
        <Form className="mt-8 space-y-6">
          {errors.serverError && (
            <p className="text-center my-5 text-red-500 font-semibold text-sm">
              {errors.serverError}
            </p>
          )}
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            {fields.map((x) => (
              <Field {...x} key={x.name} />
            ))}
          </div>
          {children}
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-slate-400 disabled:cursor-wait"
              disabled={!(dirty && isValid) || isSubmitting}
            >
              {btnText || 'Submit'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CustomForm;
