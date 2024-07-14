// src/pages/Admin/AdminDashboard.tsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
 
const data = [
  { name: 'Jan', bookings: 400, revenue: 2400, amt: 2400 },
  { name: 'Feb', bookings: 300, revenue: 2210, amt: 2290 },
  // More data...
];
 
const AdminDashboard: React.FC = () => {
  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="col-span-1">
          <CardContent>
            <Typography variant="h6">Total Bookings</Typography>
            <Typography variant="h4">1200</Typography>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardContent>
            <Typography variant="h6">Total Revenue</Typography>
            <Typography variant="h4">$45,000</Typography>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardContent>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">300</Typography>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8">
        <LineChart width={500} height={300} data={data}>
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