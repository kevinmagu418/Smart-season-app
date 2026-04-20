"use client";
import { useState, useCallback } from 'react';
import { api } from '../lib/api';
import { cache } from '../lib/cache';
import { DashboardStats as StatsType } from '@smartseason/types';

export const useDashboard = () => {
  const [stats, setStats] = useState<StatsType | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const cached = cache.get('dashboard');
      if (cached) {
        setStats(cached);
        setLoading(false);
        return;
      }
      
      const res = await api.get('/dashboard');
      setStats(res.data);
      cache.set('dashboard', res.data, 30000); // cache for 30s
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { stats, loading, fetchStats };
};
