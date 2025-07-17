import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-brand transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-primary-400 hover:bg-primary-500 text-white focus:ring-primary-500',
    secondary: 'bg-secondary-400 hover:bg-secondary-500 text-white focus:ring-secondary-500',
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  
  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default Button;