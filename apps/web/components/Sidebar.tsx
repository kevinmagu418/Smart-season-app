import { Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import { useRouter } from 'next/navigation';

export const Sidebar = () => {
  const router = useRouter();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        {['Dashboard', 'Fields'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => router.push(text === 'Dashboard' ? '/dashboard' : '/fields')}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
