import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { RegisterForm } from "../components/auth/RegisterForm";

export function RegisterPage(): ReactNode {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/books" replace />;
  }

  return <RegisterForm />;
}
