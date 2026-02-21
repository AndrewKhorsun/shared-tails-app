import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/Button";
import "./Header.css";

export function Header(): ReactNode {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="header-logo">
          <span className="logo-icon">📚</span>
          <span className="logo-text">Shared Tails</span>
        </Link>

        <nav className="header-nav">
          {isAuthenticated ? (
            <>
              <Link to="/books" className="nav-link">
                My Books
              </Link>
              <span className="nav-user">Hello, {user?.username}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
