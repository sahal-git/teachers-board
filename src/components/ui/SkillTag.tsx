import React from 'react';

interface SkillTagProps {
  skill: string;
  onClick?: () => void;
  active?: boolean;
  small?: boolean;
  className?: string;
}

const SkillTag: React.FC<SkillTagProps> = ({
  skill,
  onClick,
  active = false,
  small = false,
  className = '',
}) => {
  const baseClasses = `inline-block rounded-full transition-all duration-300 ${
    small ? 'text-xs px-2 py-0.5 my-0.5 mx-0.5' : 'text-sm px-3 py-1 my-1 mx-1'
  }`;
  
  const activeClasses = active
    ? 'bg-purple-600 text-white'
    : className || 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700';
  
  return (
    <span
      className={`${baseClasses} ${activeClasses} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {skill}
    </span>
  );
};

export default SkillTag;