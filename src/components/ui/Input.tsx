import type { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from "react";
import "./Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({
  label,
  error,
  className = "",
  id,
  ...props
}: InputProps): ReactNode {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s/g, "-")}`;

  return (
    <div className="input-group">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`input ${error ? "input-error" : ""} ${className}`.trim()}
        {...props}
      />
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  className = "",
  id,
  ...props
}: TextareaProps): ReactNode {
  const textareaId = id || `textarea-${label?.toLowerCase().replace(/\s/g, "-")}`;

  return (
    <div className="input-group">
      {label && (
        <label htmlFor={textareaId} className="input-label">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`input textarea ${error ? "input-error" : ""} ${className}`.trim()}
        {...props}
      />
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
}
