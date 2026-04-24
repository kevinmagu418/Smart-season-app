"use client";
import React from 'react';
import { FieldStage } from '@smartseason/types';

const statusConfig: Record<FieldStage, { label: string; color: string; bg: string; dot: string }> = {
  [FieldStage.PLANTED]: { 
    label: 'Planted', 
    color: 'text-blue-600 dark:text-blue-400', 
    bg: 'bg-blue-50/50 dark:bg-blue-500/10', 
    dot: 'bg-blue-500' 
  },
  [FieldStage.GROWING]: { 
    label: 'Growing', 
    color: 'text-emerald-600 dark:text-emerald-400', 
    bg: 'bg-emerald-50/50 dark:bg-emerald-500/10', 
    dot: 'bg-emerald-500' 
  },
  [FieldStage.READY]: { 
    label: 'Ready For Harvest', 
    color: 'text-amber-600 dark:text-amber-400', 
    bg: 'bg-amber-50/50 dark:bg-amber-500/10', 
    dot: 'bg-amber-500' 
  },
  [FieldStage.HARVESTED]: { 
    label: 'Completed', 
    color: 'text-slate-600 dark:text-slate-400', 
    bg: 'bg-slate-50/50 dark:bg-slate-500/10', 
    dot: 'bg-slate-500' 
  },
};

export const StatusBadge = ({ status }: { status: FieldStage }) => {
  const config = statusConfig[status] || statusConfig[FieldStage.PLANTED];

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${config.bg} ${config.color} border border-current/10 backdrop-blur-sm shadow-sm`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} mr-2 shadow-[0_0_8px_rgba(var(--primary),0.5)] animate-pulse`} />
      {config.label}
    </div>
  );
};
