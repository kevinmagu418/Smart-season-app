"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Error, Info, Close } from '@mui/icons-material';
import { Box, Typography, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: 'bg-emerald-500 border-emerald-400',
    error: 'bg-red-500 border-red-400',
    info: 'bg-blue-500 border-blue-400',
  };

  const Icons = {
    success: CheckCircle,
    error: Error,
    info: Info,
  };

  const Icon = Icons[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`fixed bottom-8 right-8 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${colors[type]} text-white backdrop-blur-lg bg-opacity-90`}
    >
      <Icon className="w-6 h-6" />
      <Typography className="font-semibold tracking-tight">{message}</Typography>
      <IconButton size="small" onClick={onClose} className="text-white/80 hover:text-white ml-2">
        <Close fontSize="small" />
      </IconButton>
    </motion.div>
  );
};
