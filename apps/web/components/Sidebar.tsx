"use client";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Dashboard as DashboardIcon, Agriculture as GridIcon } from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '../lib/utils';

export const Sidebar = ({ mobileOpen, setMobileOpen }: { mobileOpen: boolean, setMobileOpen: (open: boolean) => void }) => {
  const router = useRouter();
  const pathname = usePathname();

  const links = [
    { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon fontSize="small" /> },
    { text: 'Fields', path: '/fields', icon: <GridIcon fontSize="small" /> },
  ];

  const drawerContent = (
    <div>
      <Toolbar />
      <div className="px-4 py-6">
        <Typography variant="overline" className="text-gray-400 font-semibold px-4 hidden lg:block mb-2">Menu</Typography>
        <List className="flex flex-col gap-1">
          {links.map((link) => {
            const active = pathname?.startsWith(link.path);
            return (
              <ListItem key={link.text} disablePadding>
                <ListItemButton 
                  onClick={() => { router.push(link.path); setMobileOpen(false); }}
                  className={cn(
                    "rounded-lg mx-2 transition-colors",
                    active ? "bg-green-50 text-green-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <ListItemIcon className={cn("min-w-10", active ? "text-green-700" : "text-gray-400")}>{link.icon}</ListItemIcon>
                  <ListItemText primary={link.text} primaryTypographyProps={{ className: "text-sm font-medium" }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        className="lg:hidden block"
        PaperProps={{ className: "w-64 border-r-0" }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        className="hidden lg:block lg:w-64 lg:shrink-0"
        PaperProps={{ className: "w-64 border-r border-gray-100 shadow-sm z-40 bg-white" }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

// we need Typography locally for the hidden Menu
import { Typography } from '@mui/material';
