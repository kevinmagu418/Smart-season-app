"use client";
import { Typography } from '@mui/material';
import { StatusBadge } from './StatusBadge';
import { FieldStatus } from '@smartseason/types';
import { motion } from 'framer-motion';

export const FieldCard = ({ 
  title, value, status, icon: Icon 
}: { 
  title: string, value: string | number, status?: FieldStatus, icon?: any 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)" }}
      className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <Typography variant="subtitle2" className="text-gray-500 font-medium uppercase tracking-wider text-xs">
          {title}
        </Typography>
        {Icon && <Icon className="text-green-600" />}
      </div>
      <div className="flex justify-between items-end">
        <Typography variant="h4" className="text-gray-900 font-semibold tracking-tight">
          {value}
        </Typography>
        {status && <StatusBadge status={status} />}
      </div>
    </motion.div>
  );
};
