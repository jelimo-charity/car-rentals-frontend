import {useSelector} from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom';
import { ReactNode } from 'react';
import { RootState } from '../app/store';
 
 
interface ProtectedRouteProps {
    requiredRole?: string;
    children?: ReactNode;
}
 
 
 
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({requiredRole, children}) => {
 const user = useSelector((state: RootState) => state.auth.user);
 
 if(!user){
        return <Navigate to="/login" />;
 }
    if(requiredRole && user.role !== requiredRole){
            return <Navigate to="/" />;
    }
    return children ? <>{children}</>: <Outlet />;
}
export default ProtectedRoute;
