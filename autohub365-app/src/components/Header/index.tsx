'use client';

import NextLink from 'next/link';
import * as React from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  Link,
} from '@mui/material';

const pages = [
  {
    title: 'All Cars',
    href: '/cars',
  },
  {
    title: 'Sell Car',
    href: '/add-car',
  },
];

const settings = [
  {
    title: 'Edit Profile',
    href: '/profile',
  },
  {
    title: 'My Cars',
    href: '/my-cars',
  },
  {
    title: 'Orders',
    href: '/orders',
  },
  {
    title: 'Logout',
    href: '/logout',
  },
];

export default function Header() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <header>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Link component={NextLink} href="/">
              <Typography
                variant="h5"
                sx={{
                  mr: 2,
                  display: { xs: 'none', sm: 'flex' },
                  color: 'white',
                }}
              >
                AutoHub365
              </Typography>
            </Link>
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              {pages.map((page) => (
                <Link key={page.title} href={page.href} component={NextLink}>
                  <Button sx={{ mx: 1, color: 'white' }}>{page.title}</Button>
                </Link>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.title} onClick={handleCloseUserMenu}>
                    <Link
                      href={setting.href}
                      component={NextLink}
                      sx={{ textDecoration: 'none', color: 'black' }}
                    >
                      {setting.title}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
}
