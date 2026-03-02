import React from 'react';
import { Gem } from 'lucide-react';
import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className, 
  variant = 'dark', 
  size = 'md',
  showTagline = true 
}) => {
  const isLight = variant === 'light';
  
  const sizeClasses = {
    sm: { text: 'text-xl', icon: 8, tagline: 'text-[6px]', gap: 'gap-0.5' },
    md: { text: 'text-2xl', icon: 10, tagline: 'text-[7px]', gap: 'gap-0.5' },
    lg: { text: 'text-4xl', icon: 16, tagline: 'text-[10px]', gap: 'gap-1' }
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={cn("flex flex-col items-center select-none", className)}>
      <div className={cn("flex items-center", currentSize.gap)}>
        <span className={cn(
          "font-serif tracking-[0.3em] uppercase", 
          currentSize.text,
          isLight ? "text-white" : "text-brand-900"
        )}>
          R
        </span>
        <div className="relative flex items-center justify-center">
          <span className={cn(
            "font-serif uppercase", 
            currentSize.text,
            isLight ? "text-white" : "text-brand-900"
          )}>
            O
          </span>
          <Gem 
            size={currentSize.icon} 
            className={cn("absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", isLight ? "text-brand-400" : "text-brand-700")} 
            strokeWidth={1.5} 
          />
        </div>
        <span className={cn(
          "font-serif tracking-[0.3em] uppercase ml-[0.3em]", 
          currentSize.text,
          isLight ? "text-white" : "text-brand-900"
        )}>
          CH
        </span>
      </div>
      {showTagline && (
        <span className={cn(
          "uppercase tracking-[0.5em] font-medium -mt-1",
          currentSize.tagline,
          isLight ? "text-brand-400" : "text-brand-600"
        )}>
          Jewelry Brand
        </span>
      )}
    </div>
  );
};

/**
 * SVG VERSION FOR EXTERNAL USE:
 * 
 * <svg width="200" height="80" viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
 *   <rect width="200" height="80" fill="none"/>
 *   <text x="50%" y="45" text-anchor="middle" font-family="serif" font-size="40" letter-spacing="12" fill="#1a1a1a">ROCH</text>
 *   <path d="M92 35 L100 25 L108 35 L100 45 Z" fill="none" stroke="#5c564e" stroke-width="1"/>
 *   <text x="50%" y="65" text-anchor="middle" font-family="sans-serif" font-size="8" letter-spacing="4" font-weight="bold" fill="#7d756a">JEWELRY BRAND</text>
 * </svg>
 */
