"use client";
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

// We map MUI to the Tailwind palette
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#16a34a' }, // Tailwind green-600
    secondary: { main: '#a19286' }, // Tailwind accent-dark
    background: { default: '#f5f5f4' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 500,
    }
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
  }
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
