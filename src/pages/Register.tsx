// import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <section className='h-screen flex justify-center items-center bg-base-200'>
      <form
        method='post'
        className='card p-8 bg-base-100 shadow-lg w-96 flex flex-col gap-4 rounded-lg'
      >
        <h4 className='text-center text-3xl font-bold'>Register</h4>
        <input
          type='text'
          placeholder='Full Name'
          name='full_name'
          className='input input-bordered'
        />
        <input
          type='email'
          placeholder='Email'
          name='email'
          className='input input-bordered'
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          className='input input-bordered'
        />
        <input
          type='tel'
          placeholder='Contact Phone'
          name='contact_phone'
          className='input input-bordered'
        />
        <input
          type='text'
          placeholder='Address'
          name='address'
          className='input input-bordered'
        />
        <div className='mt-4'>
          <button className='btn btn-primary w-full'>Register</button>
        </div>
                 
       <p >
          Already a member?{' '}
          <Link to='/login' className='link link-primary'>
            Login
          </Link> 
          <a href="#" className="label-text-alt ml-10 link link-hover">Forgot password?</a>
        
        </p>
      </form>
    </section>
  );
};

export default Register;
