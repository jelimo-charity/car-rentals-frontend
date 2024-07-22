// Register.tsx
// import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { api } from '../features/Auth/authApi';
import { toast } from 'react-toastify';
import { setUser } from '../features/slices/authSlice';
import { useDispatch } from 'react-redux';

type Inputs = {
  full_name: string,
  email: string,
  password: string,
  contact_phone: string,
  address: string
};

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const [createUser, { isLoading }] = api.useRegisterMutation()

  const onSubmit = async (data: Inputs) => {
    try {
      const response = await createUser(data).unwrap();
      dispatch(setUser(response))
      toast.success(response.msg)
      navigate('/login')
      console.log("API response:", response);
      
      if (response && response.msg && Array.isArray(response.msg) && response.msg.length > 0) {
        toast.success(`User with ID ${response.msg[0].id} created successfully`);
      } 
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error('Registration failed. Please try again.');
    }
  };
  


  return (
    <section className='h-screen flex justify-center items-center bg-customBlueDarkest'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='card p-8 bg-customBlueDarker shadow-lg w-96 flex flex-col gap-4 rounded-lg'
      >
        <h4 className='text-center text-3xl font-bold'>Register</h4>
        
        <input
          {...register("full_name", { required: true })}
          type='text'
          placeholder='Full Name'
          className='input input-bordered bg-customLight'
        />
        {errors.full_name && <span>This field is required</span>}
        
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
        
        <input
          {...register("contact_phone", { required: true })}
          type='tel'
          placeholder='Contact Phone'
          className='input input-bordered bg-customLight'
        />
        {errors.contact_phone && <span>This field is required</span>}
        
        <input
          {...register("address", { required: true })}
          type='text'
          placeholder='Address'
          className='input input-bordered bg-customLight'
        />
        {errors.address && <span>This field is required</span>}
        
        <div className='mt-4'>
          <button type='submit' className='btn btn-primary w-full' >{isLoading ? "loading" : "Register"}</button>
        </div>
        
        <p>
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
