"use client";
import { SearchOff } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState = ({ title, message, actionText, onAction }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 sm:p-20 text-center bg-surface/30 border border-dashed border-border/60 rounded-3xl backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 15 }}
        className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 relative"
      >
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-50" />
        <SearchOff className="text-primary w-10 h-10 relative z-10" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-display font-bold text-foreground mb-3 tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-muted font-medium max-w-sm mx-auto mb-10 leading-relaxed opacity-70">
          {message}
        </p>
        {actionText && (
          <button 
            onClick={onAction}
            className="btn-primary px-10"
          >
            {actionText}
          </button>
        )}
      </motion.div>
    </div>
  );
};
