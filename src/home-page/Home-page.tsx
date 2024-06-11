import { Box, Button } from '@mui/material';
import MenuAppBar from '../menu-app-bar/menu-app-bar';
import { Link, Outlet } from 'react-router-dom';

function HomePage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MenuAppBar />
      <Box>
        <h1>HOME PAGE</h1>
      </Box>
      <Outlet />
    </Box>
  );
}

export default HomePage;
