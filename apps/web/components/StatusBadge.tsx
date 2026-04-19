import { Chip } from '@mui/material';
import { FieldStatus } from '@smartseason/types';

export const StatusBadge = ({ status }: { status: FieldStatus }) => {
  let color: "default" | "success" | "error" | "warning" = "default";
  
  if (status === 'Completed') color = "success";
  if (status === 'At Risk') color = "error";
  if (status === 'Active') color = "warning";

  return <Chip label={status} color={color} size="small" />;
};
