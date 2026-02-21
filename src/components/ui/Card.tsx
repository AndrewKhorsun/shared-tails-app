import type { HTMLAttributes, ReactNode } from "react";
import "./Card.css";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverable?: boolean;
}

export function Card({
  children,
  hoverable = false,
  className = "",
  ...props
}: CardProps): ReactNode {
  const classNames = `card ${hoverable ? "card-hoverable" : ""} ${className}`.trim();

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({
  children,
  className = "",
}: CardHeaderProps): ReactNode {
  return <div className={`card-header ${className}`.trim()}>{children}</div>;
}

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export function CardBody({
  children,
  className = "",
}: CardBodyProps): ReactNode {
  return <div className={`card-body ${className}`.trim()}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({
  children,
  className = "",
}: CardFooterProps): ReactNode {
  return <div className={`card-footer ${className}`.trim()}>{children}</div>;
}
