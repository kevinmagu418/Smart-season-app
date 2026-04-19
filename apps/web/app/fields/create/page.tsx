"use client";
import { useState } from 'react';
import { Box, Toolbar, Typography, Button, TextField, Paper, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Navbar } from '../../../components/Navbar';
import { Sidebar } from '../../../components/Sidebar';
import { api } from '../../../lib/api';
import { useRouter } from 'next/navigation';
import { FieldStage } from '@smartseason/types';

export default function CreateField() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [cropType, setCropType] = useState('');
  const [plantingDate, setPlantingDate] = useState('');
  const [stage, setStage] = useState<FieldStage>(FieldStage.PLANTED);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/fields', { name, cropType, plantingDate: new Date(plantingDate), stage });
      router.push('/fields');
    } catch (err) {
      alert('Failed to create field');
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4" mb={4}>Create Field</Typography>
        <Paper sx={{ p: 4, maxWidth: 600 }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TextField label="Name" value={name} onChange={e => setName(e.target.value)} required />
            <TextField label="Crop Type" value={cropType} onChange={e => setCropType(e.target.value)} required />
            <TextField label="Planting Date" type="date" InputLabelProps={{ shrink: true }} value={plantingDate} onChange={e => setPlantingDate(e.target.value)} required />
            <FormControl>
              <InputLabel>Stage</InputLabel>
              <Select value={stage} label="Stage" onChange={e => setStage(e.target.value as FieldStage)}>
                {Object.values(FieldStage).map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </Select>
            </FormControl>
            <Button type="submit" variant="contained">Create</Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
}
