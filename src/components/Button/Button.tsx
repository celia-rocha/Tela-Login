import React from 'react';
import './Button.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  isLoading = false, 
  disabled = false,
  className = '',
  type = 'button'
}) => {
  return (
    <button 
      type={type}
      className={`custom-button ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? <div className="spinner"></div> : children}
    </button>
  );
};

export default Button;
