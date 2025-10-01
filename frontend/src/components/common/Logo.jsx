// src/components/common/Logo.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ 
  size = 'md', 
  showText = true, 
  className = '', 
  linkTo = '/',
  white = false 
}) => {
  const sizes = {
    sm: { width: 120, height: 50, textSize: 'text-sm' },
    md: { width: 200, height: 80, textSize: 'text-base' },
    lg: { width: 300, height: 120, textSize: 'text-lg' },
    xl: { width: 400, height: 160, textSize: 'text-xl' }
  };

  const { width, height, textSize } = sizes[size];
  
  const LogoComponent = () => (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Logo Image */}
      <img
        src="/logo.svg"  // Path to your logo in public folder
        alt="HIC Health InterComm Logo"
        style={{ width: width, height: height }}
        className="object-contain"
      />
      
      {/* Optional text below logo */}
      {showText && (
        <div className="mt-2 text-center">
          <p className={`font-bold ${white ? 'text-white' : 'text-gray-800'} ${textSize}`}>
            Health InterComm
          </p>
        </div>
      )}
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="inline-block">
        <LogoComponent />
      </Link>
    );
  }

  return <LogoComponent />;
};

// Preset logo variations
export const LogoFull = (props) => <Logo showText={true} {...props} />;
export const LogoIcon = (props) => <Logo showText={false} size="sm" {...props} />;
export const LogoWhite = (props) => <Logo white={true} {...props} />;
export const LogoLarge = (props) => <Logo size="lg" {...props} />;

export default Logo