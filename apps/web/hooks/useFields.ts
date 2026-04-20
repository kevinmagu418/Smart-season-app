"use client";
import { useState, useCallback } from 'react';
import { api } from '../lib/api';
import { cache } from '../lib/cache';
import { Field } from '@smartseason/types';

export const useFields = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFields = useCallback(async (force = false) => {
    try {
      setLoading(true);
      setError(null);
      if (!force) {
        const cached = cache.get('fields');
        if (cached) {
          setFields(cached);
          setLoading(false);
          return;
        }
      }
      
      const res = await api.get('/fields');
      setFields(res.data);
      cache.set('fields', res.data);
    } catch (err) {
      setError('Failed to fetch fields');
    } finally {
      setLoading(false);
    }
  }, []);

  return { fields, loading, error, fetchFields };
};
