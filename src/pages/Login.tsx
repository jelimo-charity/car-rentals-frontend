// import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { api } from '../features/Auth/authApi';
import { setUser } from '../features/slices/authSlice';
import { toast } from 'react-toastify';

type Inputs = {
  email: string,
  password: string
};

const Login = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const [createUser, { isLoading }] = api.useLoginMutation()

  const onSubmit = async (data: Inputs) => {
    try {
      const response = await createUser(data).unwrap();
      dispatch(setUser(response))
      toast.success('login successful')
      navigate('/')
      console.log("API response:", response);
      
      if (response && response.msg && Array.isArray(response.msg) && response.msg.length > 0) {
        toast.success(`login successful `);
      } 
    } catch (error) {
      console.error("Error during login:", error);
      toast.error('Login failed. Please try again.');
    }
  };
  

  return (
    <section className='h-screen flex justify-center items-center bg-customBlueDarkest'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='card p-8 bg-customBlueDarker shadow-lg w-96 flex flex-col gap-4 rounded-lg'
      >
        <h4 className='text-center text-3xl font-bold'>{isLoading ? "loading" : "Register"}</h4>
        
        <input
          {...register("email", { required: true })}
          type='email'
          placeholder='Email'
          className='input input-bordered bg-customLight'
        />
        {errors.email && <span>This field is required</span>}
        
        <input
          {...register("password", { required: true })}
          type='password'
          placeholder='Password'
          className='input input-bordered bg-customLight'
        />
        {errors.password && <span>This field is required</span>}
        
        <div className='mt-4'>
          <button type='submit' className='btn btn-primary w-full'>Login</button>
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
