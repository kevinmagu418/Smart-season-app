"use client";
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutShellProps {
  children: React.ReactNode;
}

export const LayoutShell = ({ children }: LayoutShellProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - Desktop is fixed in its container, Mobile is absolute/portal */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      
      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0 h-screen overflow-hidden">
        <Navbar onMenuClick={() => setMobileOpen(true)} />
        
        <main className="flex-grow overflow-y-auto overflow-x-hidden scroll-smooth">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-12 py-10"
          >
            {children}
            
            <footer className="mt-20 py-8 border-t border-border/40 text-center">
              <p className="text-muted text-[10px] font-bold uppercase tracking-[0.25em] opacity-40">
                &copy; 2026 SmartSeason Systems &bull; Precision Agriculture
              </p>
            </footer>
          </motion.div>
        </main>
      </div>
    </div>
  );
};
