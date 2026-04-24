"use client";
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider as AppThemeProvider } from '../context/ThemeContext';
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material';
import React, { useMemo } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // We keep MUI in sync with our Tailwind theme
  const muiTheme = useMemo(() => createTheme({
    typography: {
      fontFamily: '"Outfit", "Inter", sans-serif',
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 700 },
    },
    shape: { borderRadius: 16 },
    palette: {
      primary: { main: '#10b981' }, // Emerald 500
      secondary: { main: '#0f172a' },
      background: { default: 'transparent' } // Let Tailwind handle background
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '12px',
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          }
        }
      }
    }
  }), []);

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <AppThemeProvider>
          <MuiThemeProvider theme={muiTheme}>
            <CssBaseline />
            <AuthProvider>
              {children}
            </AuthProvider>
          </MuiThemeProvider>
        </AppThemeProvider>
      </body>
    </html>
  );
}
