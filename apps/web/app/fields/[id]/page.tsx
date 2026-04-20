"use client";
import { useEffect, useState, useCallback } from 'react';
import { Box, Toolbar, Typography, CircularProgress, Button } from '@mui/material';
import { ChevronLeft, Comment, Agriculture, AccessTime } from '@mui/icons-material';
import { Navbar } from '../../../components/Navbar';
import { Sidebar } from '../../../components/Sidebar';
import { UpdateForm } from '../../../components/UpdateForm';
import { StatusBadge } from '../../../components/StatusBadge';
import { api } from '../../../lib/api';
import { cache } from '../../../lib/cache';
import { Field, FieldStage } from '@smartseason/types';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function FieldDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [field, setField] = useState<Field | null>(null);
  const [loading, setLoading] = useState(true);

  const loadField = useCallback(async () => {
    try {
      const res = await api.get(`/fields/${id}`);
      setField(res.data);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) loadField();
  }, [id, loadField]);

  const handleUpdate = async (note: string, stage: FieldStage) => {
    await api.post(`/fields/${id}/updates`, { note, stage });
    cache.clear('dashboard');
    cache.clear('fields');
    await loadField();
  };

  return (
    <Box className="flex min-h-screen bg-accent-light">
      <Navbar onMenuClick={() => setMobileOpen(!mobileOpen)} />
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <Box component="main" className="flex-grow p-4 md:p-8 w-full max-w-4xl mx-auto">
        <Toolbar />
        
        {loading || !field ? (
          <div className="flex justify-center py-20"><CircularProgress /></div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <Button 
              startIcon={<ChevronLeft />} 
              onClick={() => router.back()}
              className="text-gray-500 mb-4 hover:bg-transparent hover:text-green-700 -ml-2"
            >
              Back to Fields
            </Button>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <Typography variant="h4" className="font-bold tracking-tight text-gray-900">{field.name}</Typography>
                <Typography variant="body1" className="text-gray-500 flex items-center gap-1 mt-1">
                  <Agriculture fontSize="small" /> {field.cropType}
                </Typography>
              </div>
              <StatusBadge status={field.stage as any} className="text-sm px-3 py-1" />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 md:gap-12 mb-8">
              <div>
                <Typography variant="caption" className="text-gray-400 font-semibold uppercase tracking-wider">Planted On</Typography>
                <Typography variant="body1" className="font-medium">{new Date(field.plantingDate).toLocaleDateString()}</Typography>
              </div>
              <div>
                <Typography variant="caption" className="text-gray-400 font-semibold uppercase tracking-wider">Assigned Agent</Typography>
                <Typography variant="body1" className="font-medium">{field.agent?.name || 'Unassigned'}</Typography>
              </div>
              <div>
                <Typography variant="caption" className="text-gray-400 font-semibold uppercase tracking-wider">Current Stage</Typography>
                <Typography variant="body1" className="font-medium text-green-700">{field.stage}</Typography>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Typography variant="h6" className="font-semibold text-gray-900 mb-6">Activity Timeline</Typography>
                
                <div className="relative border-l border-green-200 ml-3 space-y-8 pb-4">
                  {field.updates && field.updates.length > 0 ? field.updates.map((u: any, ix: number) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      transition={{ delay: ix * 0.1 }}
                      key={u.id} 
                      className="relative pl-6"
                    >
                      <div className="absolute -left-3 top-1 bg-green-50 rounded-full border-2 border-green-500 p-1">
                        <Comment className="text-green-600 text-[12px]" />
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <Typography variant="body2" className="font-semibold text-gray-900">{u.agent?.name || 'Unknown Agent'}</Typography>
                          <div className="flex items-center text-xs text-gray-400">
                            <AccessTime className="text-[14px] mr-1" />
                            {new Date(u.createdAt).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                        <Typography variant="body1" className="text-gray-700 whitespace-pre-wrap">{u.note}</Typography>
                        <div className="mt-3 inline-block">
                          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md font-medium border border-gray-200">
                            Stage: {u.stage}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )) : (
                    <div className="pl-6 text-gray-500 text-sm">No updates recorded yet.</div>
                  )}
                </div>
              </div>

              <div>
                <UpdateForm onSubmit={handleUpdate} currentStage={field.stage} />
              </div>
            </div>
          </motion.div>
        )}
      </Box>
    </Box>
  );
}
