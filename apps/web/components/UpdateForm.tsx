import { useState } from 'react';
import { Box, TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Paper } from '@mui/material';
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
    <Paper sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" mb={2}>Add Update</Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField label="Note" value={note} onChange={e => setNote(e.target.value)} required multiline rows={3} />
        <FormControl>
          <InputLabel>Stage</InputLabel>
          <Select value={stage} label="Stage" onChange={e => setStage(e.target.value as FieldStage)}>
            {Object.values(FieldStage).map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" disabled={loading}>Submit Update</Button>
      </form>
    </Paper>
  );
};
