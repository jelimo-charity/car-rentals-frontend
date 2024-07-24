
import { Outlet, Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Logout from './Logout';
import { AccountBox, HistoryEdu, Home } from '@mui/icons-material';


 const UserLayout = () => {

  

   

  return (
    <div className="flex">
    <Drawer
      variant="permanent"
      anchor="left"
      className="w-60"
      classes={{ paper: 'w-50 bg-gradient-to-r from-[#0D1B2A] via-[#1b263b] to-[#415a77] text-white' }}
    >
      <List>
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
        <ListItem button component={Link} to="/" className="hover:bg-blue-700 text-bold">
          <ListItemIcon>
            <Home style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Home" className="text-white font-bold text-3xl" />
        </ListItem>
        {/* <ListItem button component={Link} to="/userdash/contact" className="hover:bg-blue-700 text-bold">
          <ListItemIcon>
            <AssessmentIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Contact" className="text-white font-bold text-3xl" />
        </ListItem> */}
       <Logout />
        
      </List>
    </Drawer>
    <main className="flex-1 p-4 bg-gray-100 min-h-screen">
      <Outlet />
    </main>
  </div>
  );
}

export default UserLayout