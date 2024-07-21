import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function SignUp(){
  function callSignUpApi(values) {
    console.log("data going to sign up server", values);
  }
  // Yup for validation
  const schema = Yup.object().shape({
    username: Yup.string().min(3, 'Must be at least 3 characters').required('Required'),
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
    confirmPassword: Yup.string().min(8, 'Must be at least 8 characters').required('Required')
  })

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
  })
  
  return(
    <div className='flex items-center justify-center w-full max-auto h-[500px] bg-gray-200 mx-auto p-4'>
      <div className="w-1/3 bg-white p-10 rounded-md flex flex-col justify-center">
        <form 
          onSubmit = { handleSubmit }
          className="flex flex-col justify-center gap-y-2">
          <div className="flex flex-col gap-y-1">
            <label htmlFor="username" className="sr-only">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="border border-gray-300 rounded-md"
              placeholder="Enter Username"
              />
            {touched.username && errors.username && <div className="text-red-500">{errors.username}</div>}
            <label htmlFor="name" className="sr-only">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="border border-gray-300 rounded-md"
              placeholder="Full Name"
              />
            {touched.name && errors.name && <div className="text-red-500">{errors.name}</div>}
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="border border-gray-300 rounded-md"
              placeholder="Enter email"
              />
            {touched.email && errors.email && <div className="text-red-500">{errors.email}</div>}
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-gray-300 rounded-md"
              placeholder="Password"
              />
            {touched.password && errors.password && <div className="text-red-500">{errors.password}</div>}
            <label htmlFor="confirmPassword" className="sr-only">Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-gray-300 rounded-md"
              placeholder="Confirm Password"
              />
            {touched.confirmPassword && errors.confirmPassword && <div className="text-red-500">{errors.confirmPassword}</div>}
          </div>
          <button 
            type="submit"
            disabled={!dirty || !isValid}
            className="bg-blue-500 text-white rounded-md p-1 disabled:bg-blue-300">Sign Up</button>
        </form>
        <div type="submit" className="mt-3">Already have a account? <Link to={`/LogIn`} 
          className="text-blue-400 ">Log In.</Link></div>
      </div>
    </div>
  )
}

export default SignUp;