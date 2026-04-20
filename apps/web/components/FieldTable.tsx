"use client";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { Field } from '@smartseason/types';
import { StatusBadge } from './StatusBadge';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export const FieldTable = ({ fields }: { fields: Field[] }) => {
  const router = useRouter();

  if (fields.length === 0) return null;

  return (
    <>
      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {fields.map((field, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            key={field.id}
            onClick={() => router.push(`/fields/${field.id}`)}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center cursor-pointer hover:border-green-300 transition-colors"
          >
            <div>
              <Typography variant="subtitle1" className="font-semibold text-gray-900">{field.name}</Typography>
              <Typography variant="body2" className="text-gray-500 mb-2">{field.cropType} • {field.agent?.name || 'Unassigned'}</Typography>
              <StatusBadge status={field.stage as any} />
            </div>
            <ChevronRight className="text-gray-400" />
          </motion.div>
        ))}
      </div>

      {/* Desktop Table View */}
      <TableContainer className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHead className="bg-gray-50/50">
            <TableRow>
              <TableCell className="font-semibold text-gray-500 tracking-wider text-xs uppercase">Name</TableCell>
              <TableCell className="font-semibold text-gray-500 tracking-wider text-xs uppercase">Crop</TableCell>
              <TableCell className="font-semibold text-gray-500 tracking-wider text-xs uppercase">Stage</TableCell>
              <TableCell className="font-semibold text-gray-500 tracking-wider text-xs uppercase">Agent</TableCell>
              <TableCell align="right" className="font-semibold text-gray-500 tracking-wider text-xs uppercase">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((field, i) => (
              <TableRow 
                key={field.id} 
                hover
                onClick={() => router.push(`/fields/${field.id}`)}
                className="cursor-pointer transition-colors hover:bg-green-50/50"
              >
                <TableCell className="font-medium text-gray-900">{field.name}</TableCell>
                <TableCell className="text-gray-600">{field.cropType}</TableCell>
                <TableCell>
                   <StatusBadge status={field.stage as any} />
                </TableCell>
                <TableCell className="text-gray-600">{field.agent?.name || <span className="text-gray-400 italic">Unassigned</span>}</TableCell>
                <TableCell align="right">
                  <Button variant="text" size="small" endIcon={<ChevronRight />} className="text-gray-500 hover:text-green-600">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
