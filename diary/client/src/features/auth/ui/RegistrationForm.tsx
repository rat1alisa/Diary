import { useForm } from 'react-hook-form';
import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@shared/store/userSlice';

interface SignupFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormValues>();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: SignupFormValues) => {
    //Проверка на совпадение паролей
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message || 'Registration failed');
        return;
      }

      const resData = await res.json();
      alert(resData.message);

      dispatch(setUser({name: resData.name}))
      navigate('/');
    } catch (err) {
      console.error('Registration failed', err);
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
      <div className='registerBlock'>
        <b>Username</b>
        <Input
          {...register('username', { required: 'Username is required' })}
          placeholder='username'
        />
        {errors.username && <p className='errorMas'>{errors.username.message}</p>}
      </div>

      <div className='registerBlock'>
        <b>Email</b>
        <Input
          type="email"
          {...register('email', { required: 'Email is required' })}
          placeholder='email'
        />
        {errors.email && <p className='errorMas'>{errors.email.message}</p>}
      </div>

      <div className='registerBlock'>
        <b>Password</b>
        <Input
          type="password"
          {...register('password', { required: 'Password is required' })}
          placeholder='password'
        />
        {errors.password && <p className='errorMas'>{errors.password.message}</p>}
      </div>

      <div className='registerBlock'>
        <b>Confirm Password</b>
        <Input
          type="password"
          {...register('confirmPassword', { required: 'Confirm Password is required' })}
          placeholder='confirm password'
        />
        {errors.confirmPassword && <p className='errorMas'>{errors.confirmPassword.message}</p>}
      </div>

      <Button type="submit" className="CLASS__NAME" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </Button>
    </form>
  );
};