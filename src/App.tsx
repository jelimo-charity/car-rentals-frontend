import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error from './pages/Error'
import Home from './pages/Home'
import About from './pages/About'
import Register from './pages/Register'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './App.css'
import UserDash from './Dashboard/userDashboard/UserDash'
import AdminLayout from './Dashboard/adminDashboard/AdminLayout'
import AdminDashboard from './Dashboard/adminDashboard/AdminOverview'
import Vehicles from './Dashboard/adminDashboard/Vehicles/Vehicles'
import Users from './Dashboard/adminDashboard/Users'
import Report from './Dashboard/adminDashboard/Report'

function App() {
  const router = createBrowserRouter([{
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
 
  {
    path: "/userdash",
    element: <UserDash />,
    errorElement: <Error />,
  },
  {
    path: "/admindash",
    element: <AdminLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <AdminDashboard />
      },
      {
        path: "manage-vehicles",
        element: <Vehicles />
      },
      {
        path: "manage-users",
        element: <Users />
      },
      {
        path: "reports",
        element: <Report />
      }
    ]
  },

])
  return (
    <>
    <RouterProvider router= {router} />
    <ToastContainer />
    </>
  )
}

export default App
