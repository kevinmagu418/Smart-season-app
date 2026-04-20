"use client";
import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { Menu as MenuIcon, Grass } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { cn } from '../lib/utils';

export const Navbar = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="fixed" className="bg-white border-b border-gray-100 shadow-none z-50">
      <Toolbar className="flex justify-between">
        <div className="flex items-center gap-3">
          {onMenuClick && (
            <IconButton edge="start" onClick={onMenuClick} className="lg:hidden text-gray-500">
              <MenuIcon />
            </IconButton>
          )}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/dashboard')}>
            <div className="bg-green-100 p-1.5 rounded-lg text-green-700">
              <Grass />
            </div>
            <Typography variant="h6" className="text-gray-900 font-bold hidden sm:block">
              SmartSeason
            </Typography>
          </div>
        </div>

        {user ? (
          <div>
            <IconButton onClick={handleMenu} className="p-1 border border-gray-200">
              <Avatar className="bg-green-600 w-8 h-8 text-sm">{user.name.charAt(0)}</Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{ className: "mt-2 shadow-lg border border-gray-100 rounded-xl" }}
            >
              <MenuItem className="px-5 py-3 pointer-events-none flex flex-col items-start gap-1">
                <Typography className="text-sm font-medium text-gray-900">{user.name}</Typography>
                <Typography className="text-xs text-gray-500">{user.role}</Typography>
              </MenuItem>
              <div className="border-t border-gray-100 my-1 font-bold"></div>
              <MenuItem onClick={() => { handleClose(); logout(); }} className="px-5 py-2 text-red-600">
                Logout
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Button variant="contained" color="primary" onClick={() => router.push('/login')} className="shadow-none rounded-lg">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
