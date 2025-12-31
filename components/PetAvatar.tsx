
import React, { useState } from 'react';

interface PetAvatarProps {
  name: string;
  imageUrl?: string;
  className?: string;
}

export const PetAvatar: React.FC<PetAvatarProps> = ({ name, imageUrl, className = "" }) => {
  const [error, setError] = useState(false);

  if (!imageUrl || error) {
    return (
      <div className={`${className} bg-amber-50 flex items-center justify-center text-amber-600`}>
        <svg className="w-1/2 h-1/2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C10.9 2 10 2.9 10 4C10 5.1 10.9 6 12 6C13.1 6 14 5.1 14 4C14 2.9 13.1 2 12 2M7 6C5.9 6 5 6.9 5 8C5 9.1 5.9 10 7 10C8.1 10 9 9.1 9 8C9 6.9 8.1 6 7 6M17 6C15.9 6 15 6.9 15 8C15 9.1 15.9 10 17 10C18.1 10 19 9.1 19 8C19 6.9 18.1 6 17 6M12 22C14.8 22 17 19.8 17 17C17 14.2 14.8 12 12 12C9.2 12 7 14.2 7 17C7 19.8 9.2 22 12 22Z" />
        </svg>
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
