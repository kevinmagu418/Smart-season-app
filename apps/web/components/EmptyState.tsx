import { InboxOutlined } from '@mui/icons-material';
import { Typography, Box } from '@mui/material';

export const EmptyState = ({ title = "No data found", message = "There is nothing to display here right now." }: { title?: string, message?: string }) => (
  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={8} className="text-gray-400">
    <InboxOutlined sx={{ fontSize: 64, mb: 2, color: '#d7cec7' }} />
    <Typography variant="h6" className="text-gray-600">{title}</Typography>
    <Typography variant="body2" className="mt-1">{message}</Typography>
  </Box>
);
