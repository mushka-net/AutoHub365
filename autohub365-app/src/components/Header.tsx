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
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/store';
import { useLogoutMutation } from '../lib/react-query';
import { useQuery } from 'react-query';
import { getUserAvatar } from '../services/personal.service';

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
];

export default function Header() {
  const [userAvatar, setUserAvatar] = React.useState<string | null>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { userId, setUserToken } = useStore();

  useQuery('user-avatar', () => getUserAvatar(userId!), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setUserAvatar(data);
    },
  });

  const { mutate, isSuccess } = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = () => {
    mutate();
    if (isSuccess) {
      handleCloseUserMenu();
      navigate('/login');
      setUserToken(null);
    }
  };

  return (
    <header>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Link component={RouterLink} to="/">
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
                <Link key={page.title} component={RouterLink} to={page.href}>
                  <Button sx={{ mx: 1, color: 'white' }}>{page.title}</Button>
                </Link>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User" src={userAvatar!} />
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
                  <Link
                    key={setting.title}
                    component={RouterLink}
                    to={setting.href}
                    sx={{ textDecoration: 'none', color: 'black' }}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>{setting.title}</MenuItem>
                  </Link>
                ))}
                <Link
                  component={RouterLink}
                  to={'/login'}
                  onClick={handleLogout}
                  sx={{ textDecoration: 'none', color: 'black' }}
                >
                  <MenuItem>
                    <Typography sx={{ textDecoration: 'none', color: 'black' }}>
                      Logout
                    </Typography>
                  </MenuItem>
                </Link>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
}
