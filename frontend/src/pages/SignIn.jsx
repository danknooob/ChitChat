import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSignIn from '../hooks/useSignIn';

export default function SignIn() {
    const [inputs, setInputs] = useState({
        userName: '',
        password: ''
    });

    const changeData = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const { loading, signIn } = useSignIn();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        const { userName, password } = inputs; 
        await signIn(userName, password);
    };

    return (
        <>
            <div className='flex flex-col items-center justify-center min-w-96 mx-auto '>
                <div className='w-full p-6 rounded-lg shadow-md bg-gray-800 bg-clip-padding backdrop-filter
                backdrop-blur-lg bg-opacity-0'>
                    <h1 className='text-3xl font-semibold text-center text-gray-800'>
                        SignIn <span className='text-blue-800'>ChatApp</span>
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className='label p-2'>
                                <span className=' text-base label-text font-semibold'>Username</span>
                            </label>
                            <input
                                type='text'
                                name='userName'
                                placeholder='Enter Username'
                                className='w-full input input-bordered h-10'
                                value={inputs.userName}
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
                        <span className='text-base label-text font-semibold'>{"Don't"} Have An Account? </span>
                        <Link to={'/sign-up'}>
                            <span className='text-blue-700'>SignUp</span>
                        </Link>
                        <div>
                            <button type="submit" className='btn btn-block btn-sm mt-2 font-bold' disabled={loading}>
                                {loading ? "Loading..." : "Log In"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
