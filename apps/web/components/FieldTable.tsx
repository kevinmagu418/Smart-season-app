"use client";
import { Field } from '@smartseason/types';
import { FieldCard } from './FieldCard';
import { motion } from 'framer-motion';

export const FieldTable = ({ fields }: { fields: Field[] }) => {
  if (fields.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-3 sm:gap-4 overflow-visible">
      {fields.map((field, i) => (
        <motion.div
          key={field.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: i * 0.08,
            ease: [0.22, 1, 0.36, 1] 
          }}
        >
          <FieldCard field={field} />
        </motion.div>
      ))}
    </div>
  );
};
