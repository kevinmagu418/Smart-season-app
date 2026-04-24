"use client";
import { useState } from 'react';
import { TextField, Select, MenuItem, FormControl, CircularProgress } from '@mui/material';
import { ChevronLeft, AddLocationAlt } from '@mui/icons-material';
import { LayoutShell } from '../../../components/LayoutShell';
import { api } from '../../../lib/api';
import { cache } from '../../../lib/cache';
import { useRouter } from 'next/navigation';
import { FieldStage } from '@smartseason/types';
import { motion } from 'framer-motion';

export default function CreateField() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [name, setName] = useState('');
  const [cropType, setCropType] = useState('');
  const [plantingDate, setPlantingDate] = useState('');
  const [stage, setStage] = useState<FieldStage>(FieldStage.PLANTED);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/fields', { name, cropType, plantingDate: new Date(plantingDate), stage });
      cache.clear('fields');
      cache.clear('dashboard');
      router.push('/fields');
    } catch (err) {
      alert('Failed to create field');
      setLoading(false);
    }
  };

  return (
    <LayoutShell>
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <button 
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-muted hover:text-primary transition-colors font-bold text-xs uppercase tracking-widest mb-8"
          >
            <ChevronLeft fontSize="small" className="group-hover:-translate-x-1 transition-transform" />
            Back to Fields
          </button>
          
          <header className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-sm border border-primary/10">
              <AddLocationAlt fontSize="large" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground tracking-tight">
                Register New Plot
              </h1>
              <p className="text-sm text-muted font-medium opacity-70">Enter the initial configuration details for the new agricultural unit.</p>
            </div>
          </header>
          
          <div className="bg-surface border border-border/50 p-8 sm:p-10 rounded-[2.5rem] shadow-premium">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em] ml-1 opacity-60">Field Name</label>
                  <TextField 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    required 
                    fullWidth
                    variant="outlined" 
                    placeholder="e.g. North Plot B"
                    sx={{ 
                      '& .MuiOutlinedInput-root': { 
                        borderRadius: '16px',
                        backgroundColor: 'rgba(0,0,0,0.02)',
                        '& fieldset': { borderColor: 'rgba(0,0,0,0.05)' },
                        '&:hover fieldset': { borderColor: 'var(--primary)' },
                      } 
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em] ml-1 opacity-60">Crop Type</label>
                  <TextField 
                    value={cropType} 
                    onChange={e => setCropType(e.target.value)} 
                    required 
                    fullWidth
                    variant="outlined"
                    placeholder="e.g. Maize, Wheat"
                    sx={{ 
                      '& .MuiOutlinedInput-root': { 
                        borderRadius: '16px',
                        backgroundColor: 'rgba(0,0,0,0.02)',
                        '& fieldset': { borderColor: 'rgba(0,0,0,0.05)' },
                        '&:hover fieldset': { borderColor: 'var(--primary)' },
                      } 
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em] ml-1 opacity-60">Planting Date</label>
                  <TextField 
                    type="date" 
                    InputLabelProps={{ shrink: true }} 
                    value={plantingDate} 
                    onChange={e => setPlantingDate(e.target.value)} 
                    required 
                    fullWidth
                    variant="outlined"
                    sx={{ 
                      '& .MuiOutlinedInput-root': { 
                        borderRadius: '16px',
                        backgroundColor: 'rgba(0,0,0,0.02)',
                        '& fieldset': { borderColor: 'rgba(0,0,0,0.05)' },
                        '&:hover fieldset': { borderColor: 'var(--primary)' },
                      } 
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em] ml-1 opacity-60">Field Stage</label>
                  <FormControl fullWidth>
                    <Select 
                      value={stage} 
                      onChange={e => setStage(e.target.value as FieldStage)}
                      sx={{ 
                        borderRadius: '16px',
                        backgroundColor: 'rgba(0,0,0,0.02)',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0,0,0,0.05)' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--primary)' },
                      }}
                    >
                      {Object.values(FieldStage).map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                    </Select>
                  </FormControl>
                </div>
              </div>

              <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-6">
                <p className="text-[10px] text-muted font-medium italic opacity-60 w-full sm:w-1/2">
                   * Once created, the plot will be available for agent assignments and monitoring updates.
                </p>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-primary w-full sm:w-auto px-12 py-4 text-sm"
                >
                  {loading ? <CircularProgress size={20} color="inherit" /> : 'Initialize Growth Tracker'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </LayoutShell>
  );
}
