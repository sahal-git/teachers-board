import React from 'react';

interface LanguageSkillBarProps {
  level: number;
  maxLevel?: number;
  language: string;
  small?: boolean;
}

const LanguageSkillBar: React.FC<LanguageSkillBarProps> = ({
  level,
  maxLevel = 5,
  language,
  small = false,
}) => {
  const getLevelLabel = (level: number): string => {
    if (level >= 5) return 'Native';
    if (level >= 4) return 'Fluent';
    if (level >= 3) return 'Advanced';
    if (level >= 2) return 'Intermediate';
    return 'Basic';
  };

  const getColorScheme = (level: number): { bg: string; text: string } => {
    if (level >= 5) return { 
      bg: 'from-green-400 to-emerald-500',
      text: 'text-emerald-700'
    };
    if (level >= 4) return { 
      bg: 'from-blue-400 to-blue-500',
      text: 'text-blue-700'
    };
    if (level >= 3) return { 
      bg: 'from-violet-400 to-purple-500',
      text: 'text-purple-700'
    };
    if (level >= 2) return { 
      bg: 'from-amber-400 to-amber-500',
      text: 'text-amber-700'
    };
    return { 
      bg: 'from-rose-400 to-rose-500',
      text: 'text-rose-700'
    };
  };

  if (small) {
    return (
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-medium w-16 text-gray-700">{language}</span>
        <div className="flex items-center gap-1">
          {Array.from({ length: maxLevel }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i < level
                  ? `bg-gradient-to-r ${getColorScheme(level).bg} shadow-sm`
                  : 'bg-gray-200'
              }`}
            />
          ))}
          <span className={`ml-2 text-xs font-medium ${getColorScheme(level).text}`}>
            {getLevelLabel(level)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-800">{language}</span>
          <span className={`text-sm font-medium ${getColorScheme(level).text} bg-white px-2 py-0.5 rounded-full shadow-sm border border-opacity-10 ${getColorScheme(level).text.replace('text', 'border')}`}>
            {getLevelLabel(level)}
          </span>
        </div>
      </div>
      <div className="relative">
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
          <div
            className={`h-full bg-gradient-to-r ${getColorScheme(level).bg} 
              transition-all duration-500 ease-out rounded-full relative`}
            style={{ width: `${(level / maxLevel) * 100}%` }}
          >
            <div className="absolute inset-0 bg-white/20 background-stripes"></div>
          </div>
        </div>
        <style jsx>{`
          .background-stripes {
            background-image: linear-gradient(
              45deg,
              transparent 0%,
              transparent 45%,
              rgba(255,255,255,0.2) 45%,
              rgba(255,255,255,0.2) 55%,
              transparent 55%,
              transparent 100%
            );
            background-size: 10px 10px;
          }
        `}</style>
        <div className="absolute top-0 left-0 w-full h-full flex justify-between px-0.5 pointer-events-none">
          {Array.from({ length: maxLevel }).map((_, i) => (
            <div
              key={i}
              className={`w-0.5 h-3 ${
                i < level ? 'bg-white/30' : 'bg-black/5'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSkillBar;