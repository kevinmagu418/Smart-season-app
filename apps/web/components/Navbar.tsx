"use client";
import { Typography, IconButton, Box, Avatar, Menu as MuiMenu, MenuItem as MuiMenuItem } from '@mui/material';
import { Menu, DarkModeOutlined, LightModeOutlined, Logout, Settings } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';
import { motion } from 'framer-motion';

export const Navbar = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <header className="nav-blur px-4 sm:px-8 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-12">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="p-2 -ml-2 hover:bg-primary/5 rounded-full md:hidden text-muted transition-colors transition-all duration-200"
          >
            <Menu />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-800 p-1 shadow-sm border border-border/40 overflow-hidden flex items-center justify-center">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xs font-bold text-muted uppercase tracking-[0.2em] opacity-50 font-display">
                System Overview
              </h1>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-surface border border-border/60 text-muted hover:text-primary hover:border-primary/20 hover:bg-primary/5 transition-all"
            title="Toggle theme"
          >
            {theme === 'light' ? <DarkModeOutlined fontSize="small" /> : <LightModeOutlined fontSize="small" />}
          </button>

          <div className="h-8 w-[1px] bg-border/60 mx-1" />

          <button
            onClick={(e) => setAnchorEl(e.currentTarget)}
            className="flex items-center gap-3 pl-1 pr-1.5 py-1 rounded-full hover:bg-primary/5 transition-all group"
          >
            <div className="relative">
              <Avatar 
                className="w-9 h-9 bg-primary/10 text-primary border border-primary/20 text-xs font-bold font-display"
              >
                {user?.name?.[0] || 'U'}
              </Avatar>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-surface rounded-full shadow-sm" />
            </div>
            <div className="hidden sm:block text-left mr-2">
              <p className="text-xs font-bold text-foreground leading-none mb-0.5">{user?.name}</p>
              <p className="text-[10px] text-muted font-bold uppercase tracking-wider opacity-60 font-display">{user?.role}</p>
            </div>
          </button>

          <MuiMenu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              className: "mt-2 min-w-[200px] border border-border/50 shadow-premium-lg bg-surface/90 backdrop-blur-xl rounded-2xl"
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <div className="px-4 py-3 border-b border-border/50 mb-1">
              <p className="text-xs font-bold text-foreground">{user?.email}</p>
              <p className="text-[10px] text-muted font-bold uppercase mt-0.5 tracking-wider font-display opacity-60 overflow-hidden text-ellipsis whitespace-nowrap">{user?.role} Account</p>
            </div>
            <MuiMenuItem onClick={() => setAnchorEl(null)} className="text-sm font-medium gap-3 py-2.5 mx-2 rounded-lg hover:bg-primary/5">
              <Settings fontSize="small" className="text-muted" /> <span className="flex-grow">Settings</span>
            </MuiMenuItem>
            <MuiMenuItem onClick={logout} className="text-sm font-medium gap-3 py-2.5 mx-2 rounded-lg hover:bg-red-50 text-red-600">
              <Logout fontSize="small" /> <span className="flex-grow">Sign Out</span>
            </MuiMenuItem>
          </MuiMenu>
        </div>
      </div>
    </header>
  );
};
