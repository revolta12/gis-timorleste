import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, variant = 'primary', size = 'md', to, href, onClick, type = 'button', loading = false, disabled = false, fullWidth = false, className = '' }) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-tl-red hover:bg-red-700 text-white focus:ring-tl-red',
    secondary: 'bg-secondary hover:bg-hover text-white focus:ring-secondary border border-border',
    outline: 'border border-tl-red text-tl-red hover:bg-tl-red/10 focus:ring-tl-red',
    ghost: 'text-text-secondary hover:text-white hover:bg-hover focus:ring-hover',
    danger: 'bg-accent-red hover:bg-red-600 text-white focus:ring-accent-red'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;
  
  if (loading) {
    return (
      <button className={classes} disabled>
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Carregando...
      </button>
    );
  }
  
  if (to) {
    return <Link to={to} className={classes}>{children}</Link>;
  }
  
  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>{children}</a>;
  }
  
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
};

export default Button;
