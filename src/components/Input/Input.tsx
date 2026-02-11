import React, { useState } from 'react';
import './Input.css';

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  error?: string;
  icon?: string; // Caminho para a imagem ou SVG string
  isPassword?: boolean;
}

const Input: React.FC<InputProps> = ({ 
  type, 
  placeholder, 
  value, 
  onChange, 
  onBlur, 
  error, 
  icon,
  isPassword = false
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const currentType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`input-container ${error ? 'has-error' : ''}`}>
      <div className="input-wrapper">
        {icon && <img src={icon} className="input-icon" alt="input icon" />}
        
        <input 
          type={currentType} 
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="custom-input"
        />

        {isPassword && (
          <button 
            type="button"
            className="toggle-password-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </button>
        )}
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default Input;
