import { Paper, Typography, Box } from '@mui/material';
import { StatusBadge } from './StatusBadge';
import { FieldStatus } from '@smartseason/types';

export const FieldCard = ({ title, value, status }: { title: string, value: string | number, status?: FieldStatus }) => (
  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
    <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography variant="h4">{value}</Typography>
      {status && <StatusBadge status={status} />}
    </Box>
  </Paper>
);
