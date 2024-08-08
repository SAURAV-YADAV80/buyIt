import React from 'react';
import { useField } from 'formik';

function Input({name,label, id,...rest }){
  const field = useField(name);
  const[data,meta] = field;
  const { value, onChange, onBlur } = data;
  const { error,touched } = meta;
  
  return <div className='flex flex-col gap-y-1'>
    <label htmlFor={id} className="sr-only">{label}</label>
    <input
      id={id}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      className="border border-gray-300 rounded-md p-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...rest}
    />
    {touched && error && <div className="text-red-500 text-sm">{error}</div>}
  </div>
}

export default Input;