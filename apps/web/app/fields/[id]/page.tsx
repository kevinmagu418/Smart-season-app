"use client";
import { useEffect, useState } from 'react';
import { Box, Toolbar, Typography, CircularProgress, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Navbar } from '../../../components/Navbar';
import { Sidebar } from '../../../components/Sidebar';
import { UpdateForm } from '../../../components/UpdateForm';
import { api } from '../../../lib/api';
import { Field, FieldStage } from '@smartseason/types';
import { useParams } from 'next/navigation';

export default function FieldDetail() {
  const params = useParams();
  const id = params.id as string;
  const [field, setField] = useState<Field | null>(null);
  const [loading, setLoading] = useState(true);

  const loadField = () => {
    api.get(`/fields/${id}`).then(res => setField(res.data)).finally(() => setLoading(false));
  };

  useEffect(() => {
    if (id) loadField();
  }, [id]);

  const handleUpdate = async (note: string, stage: FieldStage) => {
    await api.post(`/fields/${id}/updates`, { note, stage });
    loadField();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {loading || !field ? <CircularProgress /> : (
          <Box maxWidth={800}>
            <Typography variant="h4" mb={2}>{field.name}</Typography>
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography>Crop: {field.cropType}</Typography>
              <Typography>Stage: {field.stage}</Typography>
              <Typography>Planted: {new Date(field.plantingDate).toLocaleDateString()}</Typography>
              <Typography>Agent: {field.agent?.name || 'Unassigned'}</Typography>
            </Paper>

            <Typography variant="h5" mb={2}>Updates History</Typography>
            <Paper sx={{ mb: 4 }}>
              <List>
                {field.updates?.map((u: any, ix) => (
                  <div key={u.id}>
                    <ListItem>
                      <ListItemText 
                        primary={<>{u.note} <Typography component="span" variant="caption" color="primary">[{u.stage}]</Typography></>} 
                        secondary={new Date(u.createdAt).toLocaleString()} 
                      />
                    </ListItem>
                    {ix < field.updates.length - 1 && <Divider />}
                  </div>
                ))}
                {(!field.updates || field.updates.length === 0) && <ListItem><ListItemText secondary="No updates yet" /></ListItem>}
              </List>
            </Paper>

            <UpdateForm onSubmit={handleUpdate} currentStage={field.stage} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
