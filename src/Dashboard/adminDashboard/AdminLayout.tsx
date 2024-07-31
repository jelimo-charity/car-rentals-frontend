import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PeopleIcon from '@mui/icons-material/People';
import AddLocation from '@mui/icons-material/AddLocation';
import Home from '@mui/icons-material/Home';
import { Menu } from '@mui/icons-material';
import { useMediaQuery, useTheme } from '@mui/material';
import Navbar from '../../components/Navbar';

const drawerWidth = 240;

const AdminLayout = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <List>
      <ListItem button component={Link} to="/admindash" className="hover:bg-blue-700 mt-10 text-white font-bold">
        <ListItemIcon>
          <DashboardIcon style={{ color: 'white' }} />
        </ListItemIcon>
        <ListItemText primary="Dashboard Overview" className='text-white font-bold text-3xl' />
      </ListItem>
      <ListItem button component={Link} to="/admindash/manage-vehicles" className="hover:bg-blue-700 text-white font-bold">
        <ListItemIcon>
          <DirectionsCarIcon style={{ color: 'white' }} />
        </ListItemIcon>
        <ListItemText primary="Manage Vehicles" className='text-white font-bold text-3xl' />
      </ListItem>
      <ListItem button component={Link} to="/admindash/manage-users" className="hover:bg-blue-700 text-white font-bold">
        <ListItemIcon>
          <PeopleIcon style={{ color: 'white' }} />
        </ListItemIcon>
        <ListItemText primary="Manage Users" className='text-white font-bold text-3xl' />
      </ListItem>
      <ListItem button component={Link} to="/admindash/locations" className="hover:bg-blue-700 text-bold">
        <ListItemIcon>
          <AddLocation style={{ color: 'white' }} />
        </ListItemIcon>
        <ListItemText primary="Manage Location" className="text-white font-bold text-3xl" />
      </ListItem>
      <ListItem button component={Link} to="/" className="hover:bg-blue-700 text-bold">
        <ListItemIcon>
          <Home style={{ color: 'white' }} />
        </ListItemIcon>
        <ListItemText primary="Home" className="text-white font-bold text-3xl" />
      </ListItem>
    </List>
  );

  return (
    <div className="flex">
      {isSmallScreen ? (
        <>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: 2 }}
          >
            <Menu />
          </IconButton>
          <Drawer
          className='pt-10 '
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                backgroundColor: '#0D1B2A',
                color: 'white',
              },
            }}
          >
            {drawerContent}
          </Drawer>
        </>
      ) : (
        <Drawer
          className='pt-10'
          variant="permanent"
          anchor="left"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: '#0D1B2A',
              color: 'white',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
      <main className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 bg-customBlueDarkest p-4 min-h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
