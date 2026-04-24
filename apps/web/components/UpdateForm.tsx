"use client";
import { useState } from 'react';
import { TextField, Select, MenuItem, FormControl, CircularProgress } from '@mui/material';
import { FieldStage } from '@smartseason/types';
import { AssignmentTurnedIn } from '@mui/icons-material';

export const UpdateForm = ({ onSubmit, currentStage }: { onSubmit: (note: string, stage: FieldStage) => Promise<void>, currentStage: FieldStage }) => {
  const [note, setNote] = useState('');
  const [stage, setStage] = useState<FieldStage>(currentStage);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(note, stage);
      setNote('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface border border-border/50 p-6 sm:p-8 rounded-[2rem] shadow-premium h-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <AssignmentTurnedIn fontSize="small" />
        </div>
        <div>
          <h3 className="text-xl font-display font-bold text-foreground tracking-tight leading-none mb-1">
            Log Observation
          </h3>
          <p className="text-[10px] text-muted font-bold uppercase tracking-widest opacity-60">Status synchronization</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em] ml-1 opacity-60">Field Intelligence</label>
          <TextField 
            value={note} 
            onChange={e => setNote(e.target.value)} 
            required 
            multiline 
            rows={4} 
            variant="outlined"
            placeholder="Document vital observations, health indicators, or environmental changes..."
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
          <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em] ml-1 opacity-60">Development Phase</label>
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
              {Object.values(FieldStage).map(s => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <button 
          type="submit" 
          disabled={loading || !note}
          className="btn-primary py-4 w-full text-sm mt-4 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : (
            <span className="flex items-center justify-center gap-2">
              Commit Observation
            </span>
          )}
        </button>
      </form>
    </div>
  );
};
