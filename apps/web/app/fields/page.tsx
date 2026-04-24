"use client";
import { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { LayoutShell } from '../../components/LayoutShell';
import { FieldTable } from '../../components/FieldTable';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { EmptyState } from '../../components/EmptyState';
import { useFields } from '../../hooks/useFields';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

export default function Fields() {
  const { fields, loading, fetchFields } = useFields();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    fetchFields();
  }, [fetchFields]);

  return (
    <LayoutShell>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold tracking-tight text-foreground mb-3">
            Fields Directory
          </h1>
          <p className="text-base text-muted font-medium max-w-2xl leading-relaxed opacity-80">
            Real-time monitoring and lifecycle management for your agricultural assets.
          </p>
        </div>
        {user?.role === 'ADMIN' && (
          <button 
            onClick={() => router.push('/fields/create')}
            className="btn-primary whitespace-nowrap"
          >
            <Add fontSize="small" />
            <span>Register New Plot</span>
          </button>
        )}
      </header>

      <section className="relative">
        {loading ? (
          <LoadingSkeleton count={6} type="card" />
        ) : fields.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FieldTable fields={fields} />
          </motion.div>
        ) : (
           <EmptyState 
              title="No fields found" 
              message={user?.role === 'ADMIN' ? "Ready to expand? Start by adding your first field plot to the system." : "It looks like you don't have any assigned fields at the moment."} 
            />
        )}
      </section>
    </LayoutShell>
  );
}
