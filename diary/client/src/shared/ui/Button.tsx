import { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props} className="button">
      {children}
    </button>
  );
};