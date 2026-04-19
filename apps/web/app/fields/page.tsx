"use client";
import { useEffect, useState } from 'react';
import { Box, Toolbar, Typography, Button, CircularProgress } from '@mui/material';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { FieldTable } from '../../components/FieldTable';
import { api } from '../../lib/api';
import { Field } from '@smartseason/types';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

export default function Fields() {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    api.get('/fields').then(res => {
      setFields(res.data);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Box display="flex" justifyContent="space-between" mb={4}>
          <Typography variant="h4">Fields</Typography>
          {user?.role === 'ADMIN' && (
            <Button variant="contained" onClick={() => router.push('/fields/create')}>Add Field</Button>
          )}
        </Box>
        {loading ? <CircularProgress /> : <FieldTable fields={fields} />}
      </Box>
    </Box>
  );
}
