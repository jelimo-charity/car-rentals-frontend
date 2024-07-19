import React from 'react';
import { bookingApi } from '../../../features/Booking/bookingApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { TBooking } from '../../../Types/types';
import { vehiclesApi } from '../../../features/Vehicles/VehicleApi';

const Booking: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user ? user.id : null;

  const { data: bookings, error, isLoading } = bookingApi.useGeTBookingQuery(userId);
  const { data: locations } = bookingApi.useGetLocationsQuery();
  const { data: vehicles } = vehiclesApi.useGetVehiclesQuery();

  console.log(bookings);
  console.log(userId);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography>Error fetching bookings: {error.toString()}</Typography>;
  }

  const getLocationName = (id: number) => {
    return locations?.find(location => location.id === id)?.name || 'Unknown Location';
  };

  const getVehicleDetails = (id: number) => {
    const vehicle = vehicles?.find(vehicle => vehicle.id === id);
    return vehicle ? `${vehicle.manufacturer} ${vehicle.model}` : 'Unknown Vehicle';
  };

  return (
    <div className="p-4 bg-customBlueDarkest">
      <Typography variant="h4" className="text-customBlue flex justify-center items-center" gutterBottom>
        Bookings
      </Typography>
      {bookings && bookings.length === 0 ? (
        <Typography>No bookings found</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Vehicle</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Booking Date</TableCell>
                <TableCell>Return Date</TableCell>
                <TableCell>Total Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings?.map((booking: TBooking) => (
                <TableRow key={booking.id}>
                  {/* <TableCell>{booking.id}</TableCell> */}
                  <TableCell>{getVehicleDetails(booking.vehicle_id)}</TableCell>
                  <TableCell>{getLocationName(booking.location_id)}</TableCell>
                  <TableCell>{new Date(booking.booking_date).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(booking.return_date).toLocaleDateString()}</TableCell>
                  <TableCell>${booking.total_amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Booking;
