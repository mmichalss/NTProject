import { Box, Button } from '@mui/material';
import MenuAppBar from '../menu-app-bar/menu-app-bar';
import { Link, Outlet } from 'react-router-dom';
import Tables from './Tables';

function HomePage() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Tables />
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
