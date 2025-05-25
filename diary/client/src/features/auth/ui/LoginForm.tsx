import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@shared/store/userSlice';

//схема валидации
const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(5, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setLoading(true);
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      // const resData = await res.json();
      let resData;
      try {
        resData = await res.json();
      } catch (e) {
        console.error('Invalid JSON response');
        resData = { message: 'Server returned invalid response' };
      }


      if (!res.ok) {
        alert(resData.message || 'Login failed');
        return;
      }

      // Храни токен при необходимости (resData.token)
      alert(resData.message);
      dispatch(setUser({ id: resData.id, name: resData.name, email: resData.email }));       
      
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
      <div className='emailBlock'>
        <b>Email</b>
        <Input
          type="email"
          {...register('email')}
          placeholder='email'
        />
        {errors.email && <p className='errorMas'>{errors.email.message}</p>}
        <b>Password</b>
        <Input
          type="password"
          {...register('password')}
          className="CLASS__NAME"
          placeholder='password'
        />
        {errors.password && <p className='errorMas'>{errors.password.message}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </Button>
      </div>
    </form>
  );
};


/* 

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;


const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setLoading(true);
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      if (res.ok) {
        dispatch(setUser(resData.user)); //сохраняем пользователя в store
        navigate('/');
      }

      // Храни токен при необходимости (resData.token)
      alert(resData.message);
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };
*/