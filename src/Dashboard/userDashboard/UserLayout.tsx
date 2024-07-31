import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Logout from './Logout';
import { AccountBox, HistoryEdu, Menu } from '@mui/icons-material';
import { useMediaQuery, useTheme } from '@mui/material';
import Navbar from '../../components/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const drawerWidth = 200;

const UserLayout = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user ? user.id : null;
  console.log(userId)
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
   
    <List>
       <h1 className='text-4xl pb-10 text-customBlue text-center '>{user.full_name}</h1>
      <ListItem button component={Link} to="/userdash" className="hover:bg-blue-700 text-white font-bold">
        <ListItemIcon>
          <DirectionsCarIcon style={{ color: 'white' }} />
        </ListItemIcon>
        <ListItemText primary="Speedy Cars" className='text-white font-bold text-3xl'/>
      </ListItem>
      <ListItem button component={Link} to="/userdash/booking" className="hover:bg-blue-700 text-white font-bold">
        <ListItemIcon>
          <HistoryEdu style={{ color: 'white' }} />
        </ListItemIcon>
        <ListItemText primary="Booking History" className='text-white font-bold text-3xl'/>
      </ListItem>
      <ListItem button component={Link} to="/userdash/profile" className="hover:bg-blue-700 text-bold">
        <ListItemIcon>
          <AccountBox style={{ color: 'white' }} />
        </ListItemIcon>
        <ListItemText primary="Profile" className="text-white font-bold text-3xl" />
      </ListItem>
    
     
      <Logout />
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
          variant="permanent"
          anchor="left"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: '#0d1b2a',
              color: 'white',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
      <main className="flex-1 bg-customBlueDarkest min-h-screen ml-0 sm-[200px]">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
}

export default UserLayout;
