"use client";
import { Box, Typography, Avatar } from '@mui/material';
import { ChevronRight, AccountCircle, Agriculture } from '@mui/icons-material';
import { Field } from '@smartseason/types';
import { StatusBadge } from './StatusBadge';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export const FieldCard = ({ field }: { field: Field }) => {
  const router = useRouter();

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.005, backgroundColor: 'var(--surface-elevated)' }}
      whileTap={{ scale: 0.995 }}
      onClick={() => router.push(`/fields/${field.id}`)}
      className="group relative bg-surface border border-border/50 p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-300 shadow-sm hover:shadow-premium-lg hover:border-primary/20 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
    >
      {/* Decorative Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

      {/* Icon/Visual Indicator */}
      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
        <Agriculture className="w-6 h-6" />
      </div>

      {/* Main Info */}
      <div className="flex-grow min-w-0 z-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
          <h3 className="text-base font-bold text-foreground truncate group-hover:text-primary transition-colors">
            {field.name}
          </h3>
          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-border" />
          <span className="text-[10px] font-bold text-muted uppercase tracking-widest font-display opacity-80 whitespace-nowrap">
            {field.cropType}
          </span>
        </div>
        <p className="text-xs text-muted font-medium truncate opacity-70">
          Last updated: {new Date().toLocaleDateString()} &bull; 0.4 Hectares
        </p>
      </div>

      {/* StatusBadge Column */}
      <div className="flex-shrink-0 sm:min-w-[140px] z-10">
        <StatusBadge status={field.stage as any} />
      </div>

      {/* Agent Info */}
      <div className="flex-shrink-0 flex items-center gap-3 sm:min-w-[160px] z-10 border-t sm:border-t-0 sm:border-l border-border/50 pt-3 sm:pt-0 sm:pl-6 mt-1 sm:mt-0">
        <Avatar 
          className="w-8 h-8 bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold font-display"
        >
          {field.agent?.name?.[0] || '?'}
        </Avatar>
        <div className="min-w-0">
          <p className="text-[10px] font-bold text-muted uppercase tracking-wider font-display opacity-60 leading-none mb-1">Assigned Agent</p>
          <p className="text-xs font-semibold text-foreground truncate">{field.agent?.name || 'Unassigned'}</p>
        </div>
      </div>

      {/* Click Affordance */}
      <div className="flex-shrink-0 hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-primary/5 text-primary opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
        <ChevronRight />
      </div>
    </motion.div>
  );
};
