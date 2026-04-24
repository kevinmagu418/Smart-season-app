"use client";
import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { LayoutShell } from '../../components/LayoutShell';
import { DashboardStats } from '../../components/DashboardStats';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { useDashboard } from '../../hooks/useDashboard';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Agriculture } from '@mui/icons-material';

export default function Dashboard() {
  const { stats, loading, fetchStats } = useDashboard();
  const { user } = useAuth();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const firstName = user?.name?.split(' ')[0] || 'User';

  return (
    <LayoutShell>
      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-foreground mb-4">
          Welcome back, {firstName}<span className="text-primary">.</span>
        </h1>
        <p className="text-base sm:text-lg text-muted font-medium max-w-2xl leading-relaxed opacity-80">
          {user?.role === 'ADMIN' 
            ? 'Monitor high-level agricultural performance and field health analytics.' 
            : 'Track real-time growth progress and updates for your assigned plots.'}
        </p>
      </header>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LoadingSkeleton count={4} type="card" />
          </motion.div>
        ) : stats ? (
          <motion.div 
            key="content" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <DashboardStats stats={stats} />
            
            {stats.recentUpdates && stats.recentUpdates.length > 0 && (
              <div className="mt-20">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-foreground tracking-tight mb-1">
                      System Activity
                    </h2>
                    <p className="text-sm text-muted font-medium opacity-70">
                      Recent chronological updates across the network
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em] bg-surface border border-border/60 px-4 py-2 rounded-full shadow-sm">
                      Real-time feed
                    </span>
                  </div>
                </div>
                
                <div className="bg-surface border border-border/50 rounded-3xl overflow-hidden shadow-premium">
                  <div className="flex flex-col">
                    {stats.recentUpdates.map((update: any, index: number, array: any[]) => (
                      <motion.div 
                        key={update.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.05 }}
                        className={`p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all duration-300 hover:bg-primary/[0.02] group ${
                          index !== array.length - 1 ? 'border-b border-border/40' : ''
                        }`}
                      >
                        <div className="flex items-center gap-4 flex-grow min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                             <Agriculture fontSize="small" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-foreground leading-tight mb-1 group-hover:text-primary transition-colors truncate">
                              {update.field.name}
                            </h4>
                            <p className="text-xs text-muted font-medium line-clamp-1 opacity-80 italic">
                              "{update.note}"
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center sm:text-right gap-4 sm:gap-6 w-full sm:w-auto">
                          <div className="h-8 w-[1px] bg-border/60 hidden sm:block" />
                          <div className="flex-shrink-0">
                            <p className="text-xs font-bold text-foreground mb-0.5">
                              {new Date(update.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                            <p className="text-[10px] text-muted font-black uppercase tracking-widest opacity-50">
                              {new Date(update.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </LayoutShell>
  );
}
