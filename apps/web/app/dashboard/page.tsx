"use client";
import { useEffect, useState } from 'react';
import { Box, Toolbar, Typography, CircularProgress } from '@mui/material';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { DashboardStats } from '../../components/DashboardStats';
import { api } from '../../lib/api';
import { DashboardStats as StatsType } from '@smartseason/types';

export default function Dashboard() {
  const [stats, setStats] = useState<StatsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard').then(res => {
      setStats(res.data);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4" mb={4}>Dashboard</Typography>
        {loading ? <CircularProgress /> : stats && <DashboardStats stats={stats} />}
      </Box>
    </Box>
  );
}
