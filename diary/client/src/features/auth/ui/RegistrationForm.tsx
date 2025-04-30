
import { useForm } from 'react-hook-form';
import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';

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
    formState: { errors },
  } = useForm<SignupFormValues>();

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const res = await fetch('/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      alert(resData.message);
    } catch (err) {
      console.error('Registration failed', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container sign-up-container">
      <h1>Create Account</h1>
      <div>
        <Input
          {...register('username', { required: 'Username is required' })}
          className="CLASS__NAME"
          placeholder='Username'
        />
        {errors.username && (
          <p className="CLASS__NAME">{errors.username.message}</p>
        )}
      </div>
      <div>
        <Input
          type="email"
          {...register('email', { required: 'Email is required' })}
          className="CLASS__NAME"
          placeholder='Email'
        />
        {errors.email && (
          <p className="CLASS__NAME">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input
          type="password"
          {...register('password', { required: 'Password is required' })}
          className="CLASS__NAME"
          placeholder='Password'
        />
        {errors.password && (
          <p className="CLASS__NAME">{errors.password.message}</p>
        )}
      </div>

      <div>
        <Input
          type="password"
          {...register('confirmPassword', { required: 'Confirm Password is required' })}
          className="CLASS__NAME"
          placeholder='Confirm Password'
        />
        {errors.confirmPassword && (
          <p className="CLASS__NAME">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="CLASS__NAME"
      >
        Register
      </Button>
    </form>
  );
};