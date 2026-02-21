import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps): ReactNode {
  const classNames = `btn btn-${variant} btn-${size} ${className}`.trim();

  return (
    <button className={classNames} disabled={disabled || isLoading} {...props}>
      {isLoading ? <span className="btn-spinner" /> : children}
    </button>
  );
}
