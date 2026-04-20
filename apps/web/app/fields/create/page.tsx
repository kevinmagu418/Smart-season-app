"use client";
import { useState } from 'react';
import { Box, Toolbar, Typography, Button, TextField, Select, MenuItem, InputLabel, FormControl, CircularProgress } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { Navbar } from '../../../components/Navbar';
import { Sidebar } from '../../../components/Sidebar';
import { api } from '../../../lib/api';
import { cache } from '../../../lib/cache';
import { useRouter } from 'next/navigation';
import { FieldStage } from '@smartseason/types';
import { motion } from 'framer-motion';

export default function CreateField() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
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
    <Box className="flex min-h-screen bg-accent-light">
      <Navbar onMenuClick={() => setMobileOpen(!mobileOpen)} />
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <Box component="main" className="flex-grow p-4 md:p-8 w-full max-w-4xl mx-auto">
        <Toolbar />
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Button 
            startIcon={<ChevronLeft />} 
            onClick={() => router.back()}
            className="text-gray-500 mb-4 hover:bg-transparent hover:text-green-700 -ml-2"
          >
            Back to Fields
          </Button>
          
          <Typography variant="h4" className="font-bold tracking-tight text-gray-900 mb-6">Create New Field</Typography>
          
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField 
                  label="Field Name" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  required 
                  variant="outlined" 
                  placeholder="e.g. North Plot B"
                  className="bg-gray-50/50"
                />
                <TextField 
                  label="Crop Type" 
                  value={cropType} 
                  onChange={e => setCropType(e.target.value)} 
                  required 
                  variant="outlined"
                  placeholder="e.g. Corn, Soybeans"
                  className="bg-gray-50/50"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField 
                  label="Planting Date" 
                  type="date" 
                  InputLabelProps={{ shrink: true }} 
                  value={plantingDate} 
                  onChange={e => setPlantingDate(e.target.value)} 
                  required 
                  variant="outlined"
                  className="bg-gray-50/50"
                />
                <FormControl className="bg-gray-50/50">
                  <InputLabel>Initial Stage</InputLabel>
                  <Select value={stage} label="Initial Stage" onChange={e => setStage(e.target.value as FieldStage)}>
                    {Object.values(FieldStage).map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                  </Select>
                </FormControl>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100 mt-2">
                <Button 
                  type="submit" 
                  variant="contained" 
                  size="large"
                  disabled={loading}
                  className="rounded-lg px-8 py-2.5 shadow-sm"
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Field'}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </Box>
    </Box>
  );
}
