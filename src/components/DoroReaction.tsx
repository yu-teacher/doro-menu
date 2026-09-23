import React from 'react';
import { DoroEmotion } from '../types/menu';
import { DORO_IMAGES } from '../constants/doroAssets';

interface DoroReactionProps {
  emotion: DoroEmotion;
  quote: string;
  size?: 'sm' | 'md' | 'lg';
  isShaking?: boolean;
  onPoke?: () => void;
  showPokeHint?: boolean;
}

export const DoroReaction: React.FC<DoroReactionProps> = ({
  emotion,
  quote,
  size = 'md',
  isShaking = false,
  onPoke,
  showPokeHint = false,
}) => {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-40 h-40 sm:w-48 sm:h-48',
    lg: 'w-52 h-52 sm:w-60 sm:h-60',
  };

  const animationClass = isShaking
    ? 'animate-doro-shake'
    : emotion === 'butt'
    ? 'animate-doro-wiggle'
    : 'animate-doro-float';

  return (
    <div className="flex flex-col items-center justify-center select-none my-2">
      {/* Speech Bubble */}
      <div className="relative max-w-sm sm:max-w-md px-5 py-3 mb-3 bg-white rounded-2xl border-2 border-pink-200 shadow-lg shadow-pink-100/50 text-center">
        <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed break-keep">
          "{quote}"
        </p>
        {/* Bubble arrow */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-pink-200 rotate-45"></div>
      </div>

      {/* Doro Image (Clickable for Poke!) */}
      <div
        onClick={onPoke}
        className={`relative ${sizeClasses[size]} ${animationClass} transition-transform duration-300 ${
          onPoke ? 'cursor-pointer active:scale-90 hover:scale-105' : ''
        }`}
        title={onPoke ? '도로롱을 쿡 찔러보라 도로롱! 👉' : undefined}
      >
        <img
          src={DORO_IMAGES[emotion] || '/doro/doro_beggar.png'}
          alt={`Doro ${emotion}`}
          className="w-full h-full object-contain filter drop-shadow-md rounded-2xl"
        />

        {/* Emotion specific accents */}
        {emotion === 'angry' && (
          <span className="absolute -top-2 -right-2 text-2xl animate-bounce">💢</span>
        )}
        {emotion === 'thinking' && (
          <span className="absolute -top-2 -left-2 text-2xl animate-spin">💭</span>
        )}
        {emotion === 'eating' && (
          <span className="absolute -top-2 -right-2 text-2xl">✨</span>
        )}
        {emotion === 'beer' && (
          <span className="absolute -top-2 -right-2 text-xl font-bold text-amber-500 animate-pulse">
            Hic!
          </span>
        )}

        {/* Poke hint badge */}
        {showPokeHint && onPoke && (
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-500 text-white shadow-xs opacity-80 hover:opacity-100 animate-pulse">
            👉 도로롱 찌르기
          </span>
        )}
      </div>
    </div>
  );
};
