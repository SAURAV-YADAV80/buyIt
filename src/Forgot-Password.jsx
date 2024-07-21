import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function ForgotPassword() {
  function resetPassword(values) {
    console.log("sending password reset request to", values.email);
  }

  const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
  });

  const { handleSubmit, values, handleChange, errors, handleBlur, touched, isValid, dirty } = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: resetPassword,
    validationSchema: schema,
  });

  return (
    <div className='flex items-center justify-center w-full h-screen bg-gray-200 p-4'>
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-white p-6 sm:p-8 md:p-10 rounded-md shadow-lg">
        <form 
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-4"
        >
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border border-gray-300 rounded-md p-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
          />
          {touched.email && errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
          <button
            type="submit"
            disabled={!dirty || !isValid}
            className="bg-blue-500 text-white rounded-md p-3 disabled:bg-blue-300 transition-colors"
          >
            Reset
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account? <Link to={`/LogIn`} className="text-blue-500 hover:underline">Log In.</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;