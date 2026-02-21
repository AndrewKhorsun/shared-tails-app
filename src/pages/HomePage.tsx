import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/Button";
import "./HomePage.css";

export function HomePage(): ReactNode {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container hero-content">
          <h1 className="hero-title">
            Discover Your Next <span className="text-accent">Favorite Story</span>
          </h1>
          <p className="hero-subtitle">
            Share your stories with the world. Create, read, and explore amazing
            tales crafted by writers like you.
          </p>
          <div className="hero-actions">
            {isAuthenticated ? (
              <Link to="/books">
                <Button variant="primary" size="lg">
                  Go to My Library
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button variant="primary" size="lg">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="features-title">Why Shared Tails?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">✍️</span>
              <h3>Write Your Story</h3>
              <p>Express your creativity and share your unique tales with readers worldwide.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📚</span>
              <h3>Build Your Library</h3>
              <p>Organize and manage all your stories in one beautiful, easy-to-use place.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🌟</span>
              <h3>Connect & Inspire</h3>
              <p>Join a community of storytellers and find inspiration in others' creations.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-content">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands of writers sharing their stories today.</p>
          {!isAuthenticated && (
            <Link to="/register">
              <Button variant="primary" size="lg">
                Create Your Account
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
