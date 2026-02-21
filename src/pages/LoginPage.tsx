import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LoginForm } from "../components/auth/LoginForm";

export function LoginPage(): ReactNode {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/books" replace />;
  }

  return <LoginForm />;
}
