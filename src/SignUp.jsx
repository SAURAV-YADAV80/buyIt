import React,{useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from './Input';
import axios from 'axios';
import {UserContext} from './App';

function SignUp() {
  const navigate = useNavigate();
  const {setUser} = useContext(UserContext);
  function callSignUpApi(values) {
    axios.post("https://myeasykart.codeyogi.io/signup", {
      email: values.email,
      password: values.password,
      fullName: values.name
    })
    .then(response => {
      console.log('Sign up successful', response.data);
      const { user,token } = response.data;
      setUser(user);
      localStorage.setItem("token",token);
      navigate('/');
    })
    .catch(error => {
      console.error('Error during sign up:', error);
    });

    console.log('signUpApi called');
  }

  // Yup for validation
  const schema = Yup.object().shape({
    username: Yup.string().min(3, 'Must be at least 3 characters').required('Required'),
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required')
  });

  const initialValues = {
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  return (
    <div className='flex items-center justify-center w-full h-full bg-gray-200 p-4'>
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-white p-6 sm:p-8 md:p-10 rounded-md shadow-lg">
        <Formik initialValues={initialValues} onSubmit={callSignUpApi} validationSchema={schema}>
          <Form className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <Input
                type='text'
                name='username'
                id='username'
                label='Username'
                placeholder='Enter Username'
                required
              />
              <Input
                type='text'
                name='name'
                id='name'
                label='Name'
                placeholder='Full Name'
                required
              />
              <Input
                type='email'
                name='email'
                id='email'
                label='Email'
                placeholder='Enter email'
                required
              />
              <Input
                type='password'
                name='password'
                id='password'
                label='Password'
                placeholder='Password'
                required
              />
              <Input
                type='password'
                name='confirmPassword'
                id='confirmPassword'
                label='Confirm Password'
                placeholder='Confirm Password'
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md p-3 disabled:bg-blue-300 transition-colors"
            >
              Sign Up
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

export default SignUp;