"use client";
import { Grid, Box, Typography } from '@mui/material';
import { Layers, LocalFlorist, ErrorOutline, CheckCircleOutline } from '@mui/icons-material';
import { DashboardStats as StatsType, FieldStatus } from '@smartseason/types';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color, delay }: any) => {
  const colorMap: Record<string, string> = {
    slate: 'from-slate-400/20 to-slate-600/20 text-slate-600 dark:text-slate-400 border-slate-200/50 dark:border-slate-800/50',
    emerald: 'from-emerald-400/20 to-emerald-600/20 text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-800/50',
    amber: 'from-amber-400/20 to-amber-600/20 text-amber-600 dark:text-amber-400 border-amber-200/50 dark:border-amber-800/50',
    indigo: 'from-indigo-400/20 to-indigo-600/20 text-indigo-600 dark:text-indigo-400 border-indigo-200/50 dark:border-indigo-800/50',
  };

  const activeColor = colorMap[color] || colorMap.slate;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative group h-full"
    >
      <div className="glass-card p-6 h-full flex flex-col justify-between relative overflow-hidden group-hover:border-primary/20 transition-all duration-500">
        <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${activeColor} opacity-10 group-hover:opacity-20 blur-2xl transition-opacity duration-700`} />
        
        <div className="flex justify-between items-start mb-6">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${activeColor} bg-opacity-10 border border-current/10 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
            <Icon fontSize="medium" />
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />
        </div>

        <div>
          <h4 className="text-3xl font-bold text-foreground font-display tracking-tight mb-1 group-hover:translate-x-1 transition-transform duration-300">
            {value || 0}
          </h4>
          <p className="text-[10px] font-bold text-muted uppercase tracking-[0.15em] font-display opacity-60">
            {title}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const DashboardStats = ({ stats }: { stats: StatsType }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <StatCard title="Total Managed Plots" value={stats.totalFields} icon={Layers} color="slate" delay={0.1} />
      <StatCard title="Healthy Growth" value={stats.activeCount} icon={LocalFlorist} color="emerald" delay={0.2} />
      <StatCard title="Action Required" value={stats.atRiskCount} icon={ErrorOutline} color="amber" delay={0.3} />
      <StatCard title="Harvest Completed" value={stats.completedCount} icon={CheckCircleOutline} color="indigo" delay={0.4} />
    </div>
  );
};
