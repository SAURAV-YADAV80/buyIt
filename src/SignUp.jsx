import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function SignUp() {
  function callSignUpApi(values) {
    console.log("data going to sign up server", values);
  }

  // Yup for validation
  const schema = Yup.object().shape({
    username: Yup.string().min(3, 'Must be at least 3 characters').required('Required'),
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required')
  });

  const { handleSubmit, values, handleChange, errors, handleBlur, touched, isValid, dirty } = useFormik({
    initialValues: {
      username: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: callSignUpApi,
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
            <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-gray-300 rounded-md p-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Username"
            />
            {touched.username && errors.username && <div className="text-red-500 text-sm">{errors.username}</div>}

            <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-gray-300 rounded-md p-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Full Name"
            />
            {touched.name && errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}

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

            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-gray-300 rounded-md p-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
            {touched.password && errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}

            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-gray-300 rounded-md p-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm Password"
            />
            {touched.confirmPassword && errors.confirmPassword && <div className="text-red-500 text-sm">{errors.confirmPassword}</div>}
          </div>
          <button 
            type="submit"
            disabled={!dirty || !isValid}
            className="bg-blue-500 text-white rounded-md p-3 disabled:bg-blue-300 transition-colors"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account? <Link to={`/LogIn`} className="text-blue-500 hover:underline">Log In.</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;