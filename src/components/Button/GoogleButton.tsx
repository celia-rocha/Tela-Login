import React from 'react';
import Button from './Button';
import googleIcon from '../../assets/google-icon.svg';

interface GoogleButtonProps {
  onClick?: () => void;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ onClick }) => {
  return (
    <Button className="google-btn" onClick={onClick}>
      <div className="icon-google">
        <img src={googleIcon} alt="Google Icon" width={20} height={20} />
      </div>
      <span>Entrar com Google</span>
    </Button>
  );
};

export default GoogleButton;
