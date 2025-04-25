import { useForm } from "react-hook-form";
import { Input } from "@shared/ui/Input";
import { Button } from "@shared/ui/Button";
import { useLogin } from "../model/useLogin";
import { LoginFormValues } from "../model/types";

export const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginFormValues>();
  const { login, loading } = useLogin();

  const onSubmit = async (data: LoginFormValues) => {
    await login(data); //асинхронная
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        placeholder="Username"
        {...register("username")}
      />
      <Input
        type="password"
        placeholder="Password"
        {...register("password")}
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Login"}
      </Button>
    </form>
  );
};