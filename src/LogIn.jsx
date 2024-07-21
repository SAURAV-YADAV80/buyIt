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
    <div className='flex items-center justify-center w-full max-auto h-[500px] bg-gray-300 mx-auto p-4'>
      <div className="w-1/3 bg-white p-10 rounded-md flex flex-col justify-center">
        <form 
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-y-2 h-full"
        >
          <div className="flex flex-col gap-y-1">
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className="border border-gray-300 rounded-md p-2"
              placeholder="Enter email"
            />
            {touched.email && errors.email && <div className="text-red-500">{errors.email}</div>}
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              className="border border-gray-300 rounded-md p-2"
              placeholder="Password"
            />
            {touched.password && errors.password && <div className="text-red-500">{errors.password}</div>}
          </div>
          <button
            type="submit"
            disabled={!dirty || !isValid}
            className="bg-blue-500 text-white rounded-md p-2 disabled:bg-blue-300"
          >
            Log in
          </button>
        </form>
        <div className="mt-3 text-center">
          Don't have an account? <Link to={`/SignUp`} className="text-blue-400">Sign up.</Link>
        </div>
        <div className="mt-3 text-center">
          Forgot Password? <Link to={`/Forgot-Password`} className="text-blue-400">Reset here.</Link>
        </div>
      </div>
    </div>
  );
}

export default LogIn;