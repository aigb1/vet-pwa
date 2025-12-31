
import React, { useState } from 'react';
import { getInitials } from '../constants';

interface VetAvatarProps {
  name: string;
  imageUrl?: string;
  className?: string;
}

export const VetAvatar: React.FC<VetAvatarProps> = ({ name, imageUrl, className = "" }) => {
  const [error, setError] = useState(false);

  if (!imageUrl || error) {
    return (
      <div className={`${className} bg-amber-100 text-amber-800 flex items-center justify-center font-bold font-serif`}>
        {getInitials(name)}
      </div>
    );
  }

  return (
    <img 
      src={imageUrl} 
      className={`${className} object-cover`} 
      alt={name}
      onError={() => setError(true)}
    />
  );
};
