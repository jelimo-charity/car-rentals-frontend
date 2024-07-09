// import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
//   const loginAsGuestUser = () => {
//     // Function to handle guest user login
//     console.log('Logging in as guest user...');
//   };

  return (
    <section className='h-screen flex justify-center items-center bg-base-200'>
      <form
        method='post'
        className='card p-8 bg-base-100 shadow-lg w-96 flex flex-col gap-4 rounded-lg'
      >
        <h4 className='text-center text-3xl font-bold'>Login</h4>
        <input
          type='email'
          placeholder='Email'
          name='identifier'
          className='input input-bordered'
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          className='input input-bordered'
        />
        <div className='mt-4'>
          <button className='btn btn-primary w-full'>Login</button>
        </div>
        
        <p className='text-center'>
          Not a member yet?{' '}
          <Link to='/register' className='link link-primary'>
            Register
          </Link>
          {/* <a href="#" className="label-text-alt ml-10 link link-hover">Forgot password?</a> */}
        </p>
      </form>
    </section>
  );
};

export default Login;
