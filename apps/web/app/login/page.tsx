"use client";
import { useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { Agriculture, Visibility, VisibilityOff, ArrowForward } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      setErrorText(err?.response?.data?.error || 'Authentication failed. Please check your credentials.');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-background">
      {/* Left Side: Immersive Brand Story */}
      <div className="hidden lg:flex w-[45%] bg-primary relative overflow-hidden items-center justify-center p-16">
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-20 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 -right-20 w-[600px] h-[600px] bg-black/20 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-black/30" />
        </div>
        
        <div className="relative z-10 text-white max-w-lg">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-20 h-20 bg-white shadow-2xl rounded-[2.5rem] flex items-center justify-center mb-12 p-4 transform -rotate-6">
              <img src="/logo.png" alt="SmartSeason Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-6xl font-display font-bold tracking-tighter mb-6 leading-[0.9]">
              The Future of <br />
              <span className="text-emerald-200">Agriculture.</span>
            </h1>
            <p className="text-lg text-emerald-50/70 font-medium leading-relaxed max-w-md">
              A precision monitoring ecosystem designed to synchronize field intelligence and optimize seasonal growth.
            </p>

            <div className="mt-16 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-primary bg-emerald-700 flex items-center justify-center text-[10px] font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-xs font-bold text-emerald-100/60 uppercase tracking-[0.2em]">Trusted by 500+ Farm Units</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Clean Login UI */}
      <div className="flex-grow flex items-center justify-center p-6 sm:p-12 relative">
        <div className="absolute top-8 right-8 flex items-center gap-2">
           <span className="text-[10px] font-bold text-muted uppercase tracking-widest opacity-50">Secure portal</span>
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="mb-12">
            <div className="lg:hidden w-12 h-12 bg-surface border border-border/50 rounded-2xl flex items-center justify-center p-2 mb-6 block">
               <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-4xl font-display font-bold text-foreground tracking-tight mb-3">
              Portal Access
            </h2>
            <p className="text-base text-muted font-medium opacity-70">
              Please authenticate to synchronize your dashboard data.
            </p>
          </div>

          <AnimatePresence>
            {errorText && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-red-500/5 text-red-500 p-4 rounded-2xl text-xs font-bold mb-8 border border-red-500/10 flex items-center gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {errorText}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em] ml-1 opacity-60">Corporate Email</label>
              <TextField 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                fullWidth 
                required 
                variant="outlined"
                placeholder="name@smartseason.io"
                sx={{ 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: '16px',
                    backgroundColor: 'rgba(0,0,0,0.02)',
                    '& fieldset': { borderColor: 'rgba(0,0,0,0.05)' },
                    '&:hover fieldset': { borderColor: 'var(--primary)' },
                  } 
                }}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em] ml-1 opacity-60">Security Key</label>
              <TextField 
                type={showPassword ? 'text' : 'password'} 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                fullWidth 
                required 
                variant="outlined"
                placeholder="••••••••"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: '16px',
                    backgroundColor: 'rgba(0,0,0,0.02)',
                    '& fieldset': { borderColor: 'rgba(0,0,0,0.05)' },
                    '&:hover fieldset': { borderColor: 'var(--primary)' },
                  } 
                }}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={submitting}
              className="btn-primary w-full py-4 text-sm font-bold shadow-premium mt-4"
            >
              {submitting ? <CircularProgress size={20} color="inherit" /> : (
                <span className="flex items-center justify-center gap-2">
                  Initialize Session <ArrowForward fontSize="small" />
                </span>
              )}
            </button>
          </form>
          
          <div className="mt-16 pt-10 border-t border-border/40">
            <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-6 block opacity-40">Development Sandbox Access</span>
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                className="bg-surface border border-border/60 hover:border-primary/40 text-foreground font-bold py-3 px-4 rounded-xl text-xs transition-all duration-300 shadow-sm"
                onClick={() => { setEmail('admin@demo.com'); setPassword('admin123'); }}
              >
                Demo Admin
              </button>
              <button 
                type="button"
                className="bg-surface border border-border/60 hover:border-primary/40 text-foreground font-bold py-3 px-4 rounded-xl text-xs transition-all duration-300 shadow-sm"
                onClick={() => { setEmail('agent1@demo.com'); setPassword('agent123'); }}
              >
                Demo Agent
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
