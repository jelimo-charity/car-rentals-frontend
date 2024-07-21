
import { Outlet, Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';


 const AdminLayout = () => {

  

   

  return (
    <div className="flex">
    <Drawer
      variant="permanent"
      anchor="left"
      className="w-64"
      classes={{ paper: 'w-64 bg-gradient-to-r from-[#0D1B2A] via-[#1b263b] to-[#415a77] text-white' }}
    >
      <List>
        <ListItem button component={Link} to="/admindash" className="hover:bg-blue-700 text-white font-bold">
          <ListItemIcon>
            <DashboardIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard Overview" className='text-white font-bold text-3xl'/>
        </ListItem>
        <ListItem button component={Link} to="/admindash/manage-vehicles" className="hover:bg-blue-700 text-white font-bold">
          <ListItemIcon>
            <DirectionsCarIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Manage Vehicles" className='text-white font-bold text-3xl'/>
        </ListItem>
        <ListItem button component={Link} to="/admindash/manage-users" className="hover:bg-blue-700 text-white font-bold">
          <ListItemIcon>
            <PeopleIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Manage Users" className='text-white font-bold text-3xl'/>
        </ListItem>
       
        <ListItem button component={Link} to="/admindash/locations" className="hover:bg-blue-700 text-bold">
          <ListItemIcon>
            <AssessmentIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Manage Location" className="text-white font-bold text-3xl" />
        </ListItem>
        
      </List>
    </Drawer>
    <main className="flex-1 p-4 bg-gray-100 min-h-screen">
      <Outlet />
    </main>
  </div>
  );
}

export default AdminLayout