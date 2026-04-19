import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Field } from '@smartseason/types';
import { StatusBadge } from './StatusBadge';
import { useRouter } from 'next/navigation';

export const FieldTable = ({ fields }: { fields: Field[] }) => {
  const router = useRouter();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Crop</TableCell>
            <TableCell>Stage</TableCell>
            <TableCell>Agent</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.map((field) => (
            <TableRow key={field.id}>
              <TableCell>{field.name}</TableCell>
              <TableCell>{field.cropType}</TableCell>
              <TableCell>{field.stage}</TableCell>
              <TableCell>{field.agent?.name || 'Unassigned'}</TableCell>
              <TableCell>
                <Button variant="outlined" size="small" onClick={() => router.push(`/fields/${field.id}`)}>
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
