import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import  Input from './Input'

function ForgotPassword() {
  function resetPassword(values) {
    console.log("sending password reset request to", values.email);
  }

  const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
  });

  const initialValues= {
    email: '',
  };

  return (
    <div className='flex items-center justify-center w-full h-full bg-gray-200 p-4'>
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-white p-6 sm:p-8 md:p-10 rounded-md shadow-lg">
        <Formik initialValues={initialValues} onSubmit={resetPassword} validationSchema={schema}>
        <Form 
          className="flex flex-col gap-y-4"
        >
          
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
            label="Email"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md p-3 disabled:bg-blue-300 transition-colors"
          >
            Reset
          </button>
        </Form>
        </Formik>
        <div className="mt-4 text-center text-sm">
          Already have an account? <Link to={`/LogIn`} className="text-blue-500 hover:underline">Log In.</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;