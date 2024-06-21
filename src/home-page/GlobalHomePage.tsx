import { Box, Button } from '@mui/material';
import MenuAppBar from '../menu-app-bar/menuAppBar';
import { Link, Outlet } from 'react-router-dom';

function GlobalHomePage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MenuAppBar />
      <Outlet />
    </Box>
  );
}

export default GlobalHomePage;
