"use client";
import { useEffect, useState, useCallback } from 'react';
import { CircularProgress, TextField, Select, MenuItem, FormControl } from '@mui/material';
import { ChevronLeft, Agriculture, AccessTime, HistoryEdu, AssignmentInd } from '@mui/icons-material';
import { LayoutShell } from '../../../components/LayoutShell';
import { UpdateForm } from '../../../components/UpdateForm';
import { StatusBadge } from '../../../components/StatusBadge';
import { api } from '../../../lib/api';
import { cache } from '../../../lib/cache';
import { Field, FieldStage } from '@smartseason/types';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function FieldDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [field, setField] = useState<Field | null>(null);
  const [loading, setLoading] = useState(true);

  const loadField = useCallback(async () => {
    try {
      const res = await api.get(`/fields/${id}`);
      setField(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) loadField();
  }, [id, loadField]);

  const handleUpdate = async (note: string, stage: FieldStage) => {
    await api.post(`/fields/${id}/updates`, { note, stage });
    cache.clear('dashboard');
    cache.clear('fields');
    await loadField();
  };

  return (
    <LayoutShell>
      <AnimatePresence mode="wait">
        {loading || !field ? (
          <div key="loading" className="flex flex-col items-center justify-center py-40 gap-6">
            <CircularProgress size={40} thickness={4} className="text-primary" />
            <p className="text-sm font-bold text-muted uppercase tracking-[0.2em] animate-pulse">Syncing Field Data</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            key="content"
          >
            <button 
              onClick={() => router.back()}
              className="group flex items-center gap-2 text-muted hover:text-primary transition-colors font-bold text-xs uppercase tracking-widest mb-10"
            >
              <ChevronLeft fontSize="small" className="group-hover:-translate-x-1 transition-transform" />
              Back to Directory
            </button>

            <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
              <div>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground tracking-tight">
                    {field.name}
                  </h1>
                  <StatusBadge status={field.stage} />
                </div>
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-xl border border-border/50 text-foreground font-bold shadow-sm">
                    <Agriculture fontSize="small" className="text-primary" />
                    <span>{field.cropType}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-xl border border-border/50 text-foreground font-bold shadow-sm">
                    <AssignmentInd fontSize="small" className="text-primary" />
                    <span>{field.agent?.name || 'Awaiting Observer'}</span>
                  </div>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-8">
                <div className="mb-10">
                  <div className="flex items-center justify-between mb-10">
                    <div>
                      <h2 className="text-2xl font-display font-bold text-foreground tracking-tight mb-1">
                        Deployment History
                      </h2>
                      <p className="text-sm text-muted font-medium opacity-70">Sequential observational log for this unit.</p>
                    </div>
                    <HistoryEdu className="text-muted opacity-20" fontSize="large" />
                  </div>
                  
                  <div className="relative border-l border-border/60 ml-4 space-y-12 pb-6">
                    {field.updates && field.updates.length > 0 ? field.updates.map((u: any, ix: number) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: 0.1 + ix * 0.05 }}
                        key={u.id} 
                        className="relative pl-10"
                      >
                        <div className="absolute -left-[5px] top-4 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(16,185,129,0.4)] border-2 border-background" />
                        
                        <div className="bg-surface border border-border/50 p-8 rounded-[2rem] shadow-premium transition-all duration-300 hover:border-primary/20 group">
                          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                            <div>
                               <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Observation by</p>
                               <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                                 {u.agent?.name || 'Observer'}
                               </h4>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-black text-muted uppercase tracking-widest bg-muted/5 border border-border/40 px-4 py-2 rounded-full">
                              <AccessTime sx={{ fontSize: 13 }} />
                              {new Date(u.createdAt).toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>

                          <p className="text-base text-foreground/80 leading-relaxed whitespace-pre-wrap mb-8 italic font-medium">
                            "{u.note}"
                          </p>

                          <div className="flex items-center gap-3">
                             <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em] opacity-40">Phase Marker:</span>
                             <div className="px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                               {u.stage}
                             </div>
                          </div>
                        </div>
                      </motion.div>
                    )) : (
                      <div className="pl-10 py-10 bg-surface/30 border border-dashed border-border/60 rounded-3xl backdrop-blur-sm text-center">
                        <p className="text-sm text-muted font-bold uppercase tracking-widest opacity-50">No operational logs recorded.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 sticky top-8">
                <UpdateForm onSubmit={handleUpdate} currentStage={field.stage} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutShell>
  );
}
