"use client";
import { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, CircularProgress } from '@mui/material';
import { FieldStage } from '@smartseason/types';

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
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mt-6">
      <Typography variant="h6" className="font-semibold text-gray-900 mb-4 tracking-tight">Record Observation</Typography>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <TextField 
          label="Field Notes" 
          value={note} 
          onChange={e => setNote(e.target.value)} 
          required 
          multiline 
          rows={3} 
          variant="outlined"
          placeholder="Describe your observations, issues, or progress..."
          className="bg-gray-50/50"
        />
        <FormControl className="bg-gray-50/50">
          <InputLabel>Update Stage (Optional)</InputLabel>
          <Select value={stage} label="Update Stage (Optional)" onChange={e => setStage(e.target.value as FieldStage)}>
            {Object.values(FieldStage).map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </Select>
        </FormControl>
        <div className="flex justify-end pt-2">
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading}
            className="rounded-lg px-6 py-2 shadow-sm"
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Log Update'}
          </Button>
        </div>
      </form>
    </div>
  );
};
