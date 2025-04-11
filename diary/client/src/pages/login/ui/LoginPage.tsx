import { LoginForm } from "@features/auth/ui/LoginForm";

export const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-4 shadow rounded bg-white">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};