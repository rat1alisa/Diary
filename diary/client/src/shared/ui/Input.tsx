import { FC, InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    type,
    name,
    autoComplete,
    className,
    ...rest
  } = props;

  const computedAutoComplete =
    autoComplete ||
    (type === "password" ? "current-password" :
    name === "username" ? "username" :
    undefined);

  return (
    <input
      {...rest}
      ref={ref}
      type={type}
      name={name}
      autoComplete={computedAutoComplete}
      className={`rounded ${className ?? ""}`}
    />
  );
});

Input.displayName = "Input";