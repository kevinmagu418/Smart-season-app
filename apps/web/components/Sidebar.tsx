"use client";
import { Box, Typography, IconButton } from '@mui/material';
import { Dashboard, Agriculture, AddLocation, Close } from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems: { text: string; icon: React.ReactNode; path: string; role?: string }[] = [
  { text: 'Analytics', icon: <Dashboard />, path: '/dashboard' },
  { text: 'My Fields', icon: <Agriculture />, path: '/fields' },
];

export const Sidebar = ({ mobileOpen, setMobileOpen }: { mobileOpen: boolean, setMobileOpen: (o: boolean) => void }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  const content = (
    <div className="flex flex-col h-full bg-surface border-r border-border/50">
      <div className="p-8 mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center shadow-premium overflow-hidden border border-border/40 p-2 transform group-hover:scale-105 transition-transform duration-500">
            <img src="/logo.png" alt="SmartSeason Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-foreground tracking-tight leading-none">SmartSeason</h2>
            <span className="text-[10px] text-muted font-bold tracking-[0.2em] uppercase opacity-70">Agricultural systems</span>
          </div>
        </div>
      </div>

      <nav className="flex-grow px-4 space-y-1.5 focus:outline-none">
        {menuItems.filter(item => !item.role || item.role === user?.role).map((item) => {
          const active = pathname === item.path;
          return (
            <button
              key={item.text}
              onClick={() => {
                router.push(item.path);
                setMobileOpen(false);
              }}
              className={`w-full sidebar-link group ${active ? 'sidebar-link-active' : ''}`}
            >
              <div className={`transition-colors duration-300 ${active ? 'text-primary' : 'text-muted group-hover:text-primary'}`}>
                {item.icon}
              </div>
              <span className="text-sm tracking-tight">{item.text}</span>
              {active && (
                <motion.div 
                  layoutId="active-pill"
                  className="ml-auto w-1 h-5 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}

        <div className="pt-6 mt-6 border-t border-border/40">
           <p className="px-4 text-[10px] font-bold text-muted uppercase tracking-[0.15em] mb-4 opacity-50">Quick Actions</p>
           {user?.role === 'ADMIN' && (
              <button
                key="add-plot"
                onClick={() => {
                  router.push('/fields/create');
                  setMobileOpen(false);
                }}
                className={`w-full sidebar-link group ${pathname === '/fields/create' ? 'sidebar-link-active' : ''}`}
              >
                <div className={`transition-colors duration-300 ${pathname === '/fields/create' ? 'text-primary' : 'text-muted group-hover:text-primary'}`}>
                  <AddLocation />
                </div>
                <span className="text-sm tracking-tight">Add New Plot</span>
                {pathname === '/fields/create' && (
                  <motion.div 
                    layoutId="active-pill"
                    className="ml-auto w-1 h-5 rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
           )}
        </div>
      </nav>

      <div className="p-4 m-4 rounded-2xl bg-primary/5 border border-primary/10 relative overflow-hidden group transition-all hover:bg-primary/10">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
           <Agriculture sx={{ fontSize: 60 }} />
        </div>
        <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">
          Pro Support
        </p>
        <p className="text-muted text-[11px] leading-relaxed relative z-10 font-medium">
          Get real-time insights from our agronomy team.
        </p>
      </div>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/60 z-[100] md:hidden backdrop-blur-md"
          >
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-72 h-full shadow-2xl"
            >
              {content}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <aside className="hidden md:block w-72 h-screen sticky top-0 flex-shrink-0 z-40">
        {content}
      </aside>
    </>
  );
};
