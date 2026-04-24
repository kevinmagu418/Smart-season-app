"use client";
import { motion } from 'framer-motion';

export const LoadingSkeleton = ({ count = 4, type = 'card' }: { count?: number, type?: 'card' | 'table' }) => {
  return (
    <div className="w-full space-y-4">
      {[...Array(count)].map((_, i) => (
        <div 
          key={i} 
          className="bg-surface border border-border/50 p-5 rounded-2xl flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden"
        >
          {/* Skeleton Icon */}
          <div className="flex-shrink-0 w-12 h-12 bg-muted/10 rounded-xl animate-pulse" />
          
          {/* Skeleton Content */}
          <div className="flex-grow space-y-2 w-full sm:w-auto">
            <div className="h-5 bg-muted/10 rounded-md w-1/3 animate-pulse" />
            <div className="h-3 bg-muted/10 rounded-md w-1/4 animate-pulse opacity-60" />
          </div>
          
          {/* Skeleton Badge */}
          <div className="flex-shrink-0 h-8 bg-muted/10 rounded-full w-32 animate-pulse" />
          
          {/* Skeleton Agent */}
          <div className="flex-shrink-0 flex items-center gap-3 w-40">
            <div className="w-8 h-8 rounded-full bg-muted/10 animate-pulse" />
            <div className="h-3 bg-muted/10 rounded-md w-20 animate-pulse" />
          </div>

          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none" />
        </div>
      ))}
      
      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};
