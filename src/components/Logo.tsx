import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="text-white font-bold border-2 border-cyan-400 px-2 py-1 text-xl tracking-wider">
        STARTUP LINK
      </div>
      <div className="text-white text-xs tracking-widest mt-1">
        UNIMELB
      </div>
    </div>
  );
};

export default Logo;