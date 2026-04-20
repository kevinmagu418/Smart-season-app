"use client";
import { useEffect, useState } from 'react';
import { Box, Toolbar, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { FieldTable } from '../../components/FieldTable';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { EmptyState } from '../../components/EmptyState';
import { useFields } from '../../hooks/useFields';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

/**
 * Fields directory page showing a comprehensive list of all agricultural plots.
 * Admins can add new fields, while Agents see their assigned plots.
 */
export default function Fields() {
  const { fields, loading, fetchFields } = useFields();
  const router = useRouter();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    fetchFields();
  }, [fetchFields]);

  return (
    <Box className="flex min-h-screen bg-accent-light">
      <Navbar onMenuClick={() => setMobileOpen(!mobileOpen)} />
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <Box component="main" className="flex-grow p-4 md:p-8 w-full max-w-7xl mx-auto">
        <Toolbar />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <Typography variant="h4" className="font-bold tracking-tight text-gray-900">Fields Directory</Typography>
              <Typography variant="body2" className="text-gray-500 mt-1">Manage and monitor your agricultural fields.</Typography>
            </div>
            {user?.role === 'ADMIN' && (
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<Add />}
                onClick={() => router.push('/fields/create')}
                className="shadow-sm rounded-lg whitespace-nowrap"
              >
                Add Field
              </Button>
            )}
          </div>

          {loading ? (
            <LoadingSkeleton count={5} type="table" />
          ) : fields.length > 0 ? (
            <FieldTable fields={fields} />
          ) : (
             <EmptyState 
                title="No fields found" 
                message={user?.role === 'ADMIN' ? "Get started by adding a new field to the system." : "You have no assigned fields currently."} 
              />
          )}
        </motion.div>
      </Box>
    </Box>
  );
}
