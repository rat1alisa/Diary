import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@shared/store/userSlice';
import Cookies from 'js-cookie'; // добавили библиотеку cookies

// Схема валидации
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
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setLoading(true);
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      let resData;
      try {
        resData = await res.json();
      } catch (e) {
        console.error('Invalid JSON response');
        resData = { message: 'Server returned invalid response' };
      }

      if (res.ok) {
        Cookies.set('user', JSON.stringify({ id: 1, name: 'Test User' }), { expires: 7 });
        alert('Cookie set');
      } else {
        alert(resData.message || 'Login failed');
        return;
      }

      //Сохраняем токен в cookie
      if (resData.token) {
        Cookies.set('token', resData.token, { expires: 7 });
      }

      //Сохраняем пользователя в redux store и cookies
      dispatch(setUser({
        id: resData.id,
        name: resData.name,
        email: resData.email,
      }));

      alert(resData.message || 'Login successful');
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