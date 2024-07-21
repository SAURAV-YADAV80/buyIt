import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
function ForgotPassword(){
  function resetPassword(values) {
    console.log("sending password reset request to", values.email);
  }
  
  const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
  })
  
  const { handleSubmit, values, handleChange, errors, handleBlur, touched, isValid, dirty } = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: resetPassword,
    validationSchema: schema,
  })
  
  return(
    <div className='flex items-center justify-center w-full max-auto h-[500px] bg-gray-200 mx-auto p-4'>
    <div className="w-1/3 bg-white p-10 rounded-md flex flex-col justify-center">
      <form 
        onSubmit= { handleSubmit }
        className="flex flex-col gap-y-2">
        <label htmlFor="email" className="sr-only"> Email </label>
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
        <button
          type="submit"
        disabled={!dirty || !isValid}
        className="bg-blue-500 text-white rounded-md p-1 disabled:bg-blue-300">reset</button>
      </form>
      <div type="submit" className="mt-3">Already have a account? <Link to={`/LogIn`} 
        className="text-blue-400 ">Log In.</Link></div>
    </div>
    </div>
  )
}

export default ForgotPassword;