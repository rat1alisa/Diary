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
    <form onSubmit={handleSubmit(onSubmit)} className="CLASS__NAME">
      <div>
        <label>Username</label>
        <Input
          {...register('username', { required: 'Username is required' })}
          className="CLASS__NAME"
        />
        {errors.username && <p>{errors.username.message}</p>}
      </div>

      <div>
        <label>Email</label>
        <Input
          type="email"
          {...register('email', { required: 'Email is required' })}
          className="CLASS__NAME"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Password</label>
        <Input
          type="password"
          {...register('password', { required: 'Password is required' })}
          className="CLASS__NAME"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <div>
        <label>Confirm Password</label>
        <Input
          type="password"
          {...register('confirmPassword', { required: 'Confirm Password is required' })}
          className="CLASS__NAME"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>

      <Button type="submit" className="CLASS__NAME" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </Button>
    </form>
  );
};