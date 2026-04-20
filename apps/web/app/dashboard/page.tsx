"use client";
import { useEffect, useState } from 'react';
import { Box, Toolbar, Typography } from '@mui/material';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { DashboardStats } from '../../components/DashboardStats';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { useDashboard } from '../../hooks/useDashboard';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

/**
 * Dashboard page providing a high-level overview of field metrics.
 * Supports role-based views for Admin (system-wide) and Agent (personal).
 */
export default function Dashboard() {
  const { stats, loading, fetchStats } = useDashboard();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Fetch dashboard statistics on component mount
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <Box className="flex min-h-screen bg-accent-light">
      <Navbar onMenuClick={() => setMobileOpen(!mobileOpen)} />
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <Box component="main" className="flex-grow p-4 md:p-8 w-full max-w-7xl mx-auto">
        <Toolbar />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Typography variant="h4" className="mb-2 font-bold tracking-tight text-gray-900">
            Welcome back, {user?.name?.split(' ')[0] || 'User'}
          </Typography>
          <Typography variant="body1" className="mb-8 text-gray-500">
            {user?.role === 'ADMIN' ? 'Review the global performance and status of all agricultural plots.' : 'Overview of your assigned fields and recent maintenance updates.'}
          </Typography>

          {loading ? (
            <LoadingSkeleton count={4} type="card" />
          ) : stats ? (
            <DashboardStats stats={stats} />
          ) : null}
        </motion.div>
      </Box>
    </Box>
  );
}
