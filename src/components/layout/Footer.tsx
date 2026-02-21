import type { ReactNode } from "react";
import "./Footer.css";

export function Footer(): ReactNode {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <span className="footer-logo">📚 Shared Tails</span>
          <p className="footer-tagline">Share your stories with the world</p>
        </div>
        <div className="footer-copyright">
          &copy; {currentYear} Shared Tails. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
