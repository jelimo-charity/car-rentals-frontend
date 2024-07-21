import { useDispatch } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { logout } from '../../features/slices/authSlice';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
 
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }
  return (
    <ListItem button onClick={handleLogout} className="hover:bg-customBlueLight">
            <ListItemIcon className="text-white">
                <ExitToAppIcon  className= 'text-white'/>
            </ListItemIcon>
            <ListItemText className= 'text-white' primary="Logout" />
        </ListItem>
  )
}
 
export default Logout