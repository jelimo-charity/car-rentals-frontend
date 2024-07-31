import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './pages/Error';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import AdminLayout from './Dashboard/adminDashboard/AdminLayout';
import AdminDashboard from './Dashboard/adminDashboard/AdminOverview';
import Vehicles from './Dashboard/adminDashboard/Vehicles/Vehicles';
import UsersComponent from './Dashboard/adminDashboard/Users/Users';
import Cars from './Dashboard/userDashboard/Cars/Cars';
import UserLayout from './Dashboard/userDashboard/UserLayout';
import Profile from './Dashboard/userDashboard/Profile/Profile';
import Booking from './Dashboard/userDashboard/Booking/Booking';
import ParentComponent from './Dashboard/userDashboard/Cart/ParentComponent';
import PaymentSuccess from './pages/Successpay';
import ProtectedRoute from './components/ProtectRoutes';
import LocationForm from './Dashboard/adminDashboard/Location/Location';
import Layout from './components/Layout';
import CreateTicketForm from './Dashboard/userDashboard/Ticket';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout><Home /></Layout>,
      errorElement: <Error />,
    },
    
    {
      path: '/register',
      element: <Layout><Register /></Layout>,
      errorElement: <Error />,
    },
    {
      path: '/login',
      element: <Layout><Login /></Layout>,
      errorElement: <Error />,
    },
    {
      path: '/contact',
      element: <Layout><CreateTicketForm /></Layout>,
      errorElement: <Error />,

    },
    {
      path: '/payment-successful',
      element: <PaymentSuccess />,
      errorElement: <Error />,
    },
    {
      path: '/payment-failed',
      element: <PaymentSuccess />,
      errorElement: <Error />,
    },
    {
      path: '/cars',
      element: <Layout><Cars /></Layout>,
      errorElement: <Error />,
    },
    {
      path: '/parentcomponent/:vehicleId',
      element: (
        <ProtectedRoute>
          <Layout>
          <ParentComponent />
          </Layout>
        </ProtectedRoute>
      ),
      errorElement: <Error />,
    },
    {
      path: '/userdash',
      element: (
        <ProtectedRoute>
       
          <UserLayout />
          
        </ProtectedRoute>
      ),
      errorElement: <Error />,
      children: [
        {
          path: '',
          element: <Cars />,
        },
       
       
        {
          path: 'profile',
          element: <Profile />,
        },
        {
          path: 'booking',
          element: <Booking />,
        },
       
      ],
    },
    {
      path: '/admindash',
      element: (
        <ProtectedRoute requiredRole='admin'>
          <AdminLayout />
        </ProtectedRoute>
      ),
      errorElement: <Error />,
      children: [
        {
          path: '',
          element: <AdminDashboard />,
        },
        {
          path: 'manage-vehicles',
          element: <Vehicles />,
        },
        {
          path: 'manage-users',
          element: <UsersComponent />,
        },
        {
          path: 'locations',
          element: <LocationForm />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
