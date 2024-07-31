// src/pages/Admin/AdminDashboard.tsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { usersApi } from '../../features/Users/usersApi';
import { bookingApi } from '../../features/Booking/bookingApi';
 

 
const AdminDashboard: React.FC = () => {

  const { data: bookingsData, error: bookingsError, isLoading: bookingsLoading } = bookingApi.useGeTBookingsQuery()
  const { data: usersData, error: usersError, isLoading: usersLoading } = usersApi.useGetUsersQuery();

  if (bookingsLoading || usersLoading) return <div>Loading...</div>;
  if (bookingsError || usersError) return <div>Error fetching data</div>;
 
  const totalBookings = bookingsData ? bookingsData.length : 0;
  const totalRevenue = bookingsData
    ? bookingsData.reduce((sum, booking) => sum + (Number(booking.total_amount) || 0), 0)
    : 0;
  const totalUsers = usersData ? usersData.length : 0;
 
  const chartData = bookingsData?.map((booking, index) => ({
    name: `Month ${index + 1}`,
    bookings: 1,
    revenue: Number(booking.total_amount) || 0,
  })) || [];

 
  return (
    <div className="p-4 bg-customBlueDarkest">
      {/* <Typography variant="h4" className='text-customBlueDarkest' gutterBottom>Admin Dashboard</Typography> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="col-span-1">
          <CardContent>
            <Typography variant="h6">Total Bookings</Typography>
            <Typography variant="h4">{totalBookings}</Typography>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardContent>
            <Typography variant="h6">Total Revenue</Typography>
            <Typography variant="h4">{totalRevenue}</Typography>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardContent>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">{totalUsers}</Typography>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 text-customBlueLight">
        <LineChart width={500} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="bookings" stroke="#8884d8" />
          <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
        </LineChart>
      </div>
    </div>
  );
}
 
export default AdminDashboard;