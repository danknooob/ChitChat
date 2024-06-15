import React, { useState } from 'react';
import GenderCheckBox from './GenderCheckBox';
import { Link } from 'react-router-dom';
import useSignUp from '../hooks/useSignUp';
export default function SignUp() {
  const [inputs, setInputs] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    gender: ''
  });

  const changeData = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const {loading,signup}=useSignUp();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
};
  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(inputs);
    await signup(inputs);
  }
  return (
    <>
      <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
          <h1 className='text-3xl font-semibold text-center text-gray-800'>
            SignUp <span className='text-blue-800'>ChatApp</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label className='label p-2'>
                <span className='text-base label-text font-semibold'>Username</span>
              </label>
              <input
                type='text'
                name='username'
                placeholder='Enter Username'
                className='w-full input input-bordered h-10'
                value={inputs.username}
                onChange={changeData}
              />
            </div>
            <div>
              <label className='label p-2'>
                <span className='text-base label-text font-semibold'>Full Name</span>
              </label>
              <input
                type='text'
                name='fullName'
                placeholder='Enter Full Name'
                className='w-full input input-bordered h-10'
                value={inputs.fullName}
                onChange={changeData}
              />
            </div>
            <div>
              <label className='label p-2'>
                <span className='text-base label-text font-semibold'>Email</span>
              </label>
              <input
                type='email'
                name='email'
                placeholder='Enter Email'
                className='w-full input input-bordered h-10'
                value={inputs.email}
                onChange={changeData}
              />
            </div>
            <div>
              <label className='label'>
                <span className='text-base label-text font-semibold'>Password</span>
              </label>
              <input
                type='password'
                name='password'
                placeholder='Enter password'
                className='w-full input input-bordered h-10'
                value={inputs.password}
                onChange={changeData}
              />
            </div>
            <div>
              <label className='label'>
                <span className='text-base label-text font-semibold'>Confirm Password</span>
              </label>
              <input
                type='password'
                name='confirmPassword'
                placeholder='Confirm Password'
                className='w-full input input-bordered h-10'
                value={inputs.confirmPassword}
                onChange={changeData}
              />
            </div>
            <GenderCheckBox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}/>
            <div className='flex justify-between items-center mt-2'>
              <span className='text-base label-text font-semibold'>Have An Account?</span>
              <Link to={'/sign-in'}>
                <span className='text-blue-700'>SignIn</span>
              </Link>
            </div>
            <div>
              <button type='submit' className='btn btn-block btn-sm mt-2'>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
