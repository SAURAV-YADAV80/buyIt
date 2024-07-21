import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function LogIn() {
  function callLoginApi(values) {
    console.log("data", values.email, values.password);
  }

  // Yup for validation
  const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Must be at least 8 characters').required('Required')
  });

  const { handleSubmit, values, handleChange, errors, handleBlur, touched, isValid, dirty } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: callLoginApi,
    validationSchema: schema,
  });

  return (
    <div className='flex items-center justify-center w-full h-screen bg-gray-200 p-4'>
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-white p-6 sm:p-8 md:p-10 rounded-md shadow-lg">
        <form 
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-4"
        >
          <div className="flex flex-col gap-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className="border border-gray-300 rounded-md p-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
            />
            {touched.email && errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}

            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              className="border border-gray-300 rounded-md p-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
            {touched.password && errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
          </div>
          <button
            type="submit"
            disabled={!dirty || !isValid}
            className="bg-blue-500 text-white rounded-md p-3 disabled:bg-blue-300 transition-colors"
          >
            Log in
          </button>
          <div className="text-center mt-4 text-sm">
            Don't have an account? <Link to={`/SignUp`} className="text-blue-500 hover:underline">Sign up.</Link>
          </div>
          <div className="text-center mt-2 text-sm">
            Forgot Password? <Link to={`/Forgot-Password`} className="text-blue-500 hover:underline">Reset here.</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;