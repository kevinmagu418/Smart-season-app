"use client";
import { useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import { Grass } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorText(null);
    try {
      await login({ email, password });
    } catch (err: any) {
      setErrorText(err?.response?.data?.error || 'Invalid credentials or network error.');
      setSubmitting(false);
    }
  };

  const isDemo = email === 'admin@demo.com' || email === 'agent@demo.com';

  return (
    <div className="flex h-screen w-full items-center justify-center bg-accent-light px-4 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 w-full h-1/2 bg-green-600/5 rotate-1 -skew-y-3 origin-center scale-150"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden z-10"
      >
        <div className="p-8 sm:p-12">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-3 rounded-2xl text-green-600 shadow-sm">
              <Grass fontSize="large" />
            </div>
          </div>
          
          <Typography variant="h5" align="center" className="font-bold text-gray-900 tracking-tight">
            Welcome to SmartSeason
          </Typography>
          <Typography variant="body2" align="center" className="text-gray-500 mt-2 mb-8">
            Please log in to your account
          </Typography>

          <AnimatePresence>
            {errorText && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium mb-4 text-center border border-red-100"
              >
                {errorText}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <TextField 
              label="Email Address" 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              fullWidth 
              required 
              autoFocus
              variant="outlined"
            />
            <TextField 
              label="Password" 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              fullWidth 
              required 
              variant="outlined"
            />
            
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth 
              size="large"
              disabled={submitting}
              className="mt-2 py-3 text-base shadow-sm"
            >
              {submitting ? <CircularProgress size={24} color="inherit" /> : 'Log In'}
            </Button>
          </form>
          
          {/* Helper hint for assessment */}
          <div className="mt-8 text-center bg-gray-50 p-4 rounded-lg border border-gray-100">
            <Typography variant="caption" className="text-gray-500 font-medium block">
              Demo Accounts:
            </Typography>
            <div className="flex justify-center gap-4 mt-2">
              <Button size="small" onClick={() => { setEmail('admin@demo.com'); setPassword('admin123'); }}>Admin</Button>
              <Button size="small" onClick={() => { setEmail('agent@demo.com'); setPassword('agent123'); }}>Agent</Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
