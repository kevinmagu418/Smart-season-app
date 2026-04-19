import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => router.push('/dashboard')}>
          SmartSeason Field Monitor
        </Typography>
        {user ? (
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body2">{user.name} ({user.role})</Typography>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </Box>
        ) : (
          <Button color="inherit" onClick={() => router.push('/login')}>Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
