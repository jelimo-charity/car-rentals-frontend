import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { removeFromCart, clearCart } from '../../../features/Cart/cartSlice';
import { TLocation, TVehicle } from '../../../Types/types';
import { Typography, Button, Select, MenuItem, TextField } from '@mui/material';
import { bookingApi } from '../../../features/Booking/bookingApi';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [addbooking] = bookingApi.useAddbookingMutation()
  const [locations, setLocations] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({
    booking_date: '', // Initially a string
    return_date: '', // Initially a string
    location_id: '', // Initially empty
  });

  useEffect(() => {
    // Fetch available locations from your API
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://localhost:8000/locations'); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setLocations(data); // Assuming data is an array of locations with { id, name }
        } else {
          console.error('Failed to fetch locations');
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleBookingDetailsChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string | undefined; value: unknown; }>) => {
    const { name, value } = e.target;
    setBookingDetails({ ...bookingDetails, [name as string]: value as string });
  };

  const handleBooking = async () => {
    if (!bookingDetails.booking_date || !bookingDetails.return_date || !bookingDetails.location_id) {
      alert('Please fill in all booking details.');
      return;
    }
  
    try {
      for (const vehicle of cartItems) {
        const bookingData = {
          user_id: 2,
          vehicle_id: vehicle.id,
          location_id: parseInt(bookingDetails.location_id),
          booking_date: (bookingDetails.booking_date), 
          return_date: (bookingDetails.return_date),
          total_amount: vehicle.rental_price,
        };
  
        console.log('Booking Data:', bookingData);
  
        const response = await addbooking(bookingData);
  
        console.log('Booking Response:', response);
      }
  
      dispatch(clearCart());
      alert('Booking Successful');
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Booking Failed');
    }
  };
  

  return (
    <div className="p-4 bg-customBlueDarkest">
      <Typography variant="h4" className="text-customBlue flex justify-center items-center" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography>Your have no bookings to make</Typography>
      ) : (
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((vehicle: TVehicle) => (
              <div key={vehicle.id} className="card card-compact bg-customBlueDarker shadow-xl w-full mb-6">
                <figure className="h-40 overflow-hidden">
                  <img
                    src={vehicle.image_url}
                    alt={`${vehicle.manufacturer} ${vehicle.model}`}
                    className="object-cover h-full w-full"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{vehicle.manufacturer} {vehicle.model}</h2>
                  <p>Year: {vehicle.year}</p>
                  <p>Fuel Type: {vehicle.fuel_type}</p>
                  <p>Seating Capacity: {vehicle.seating_capacity}</p>
                  <p>Features: {vehicle.features}</p>
                  <p>Rental price: ${vehicle.rental_price}</p>
                  <p>Availability: {vehicle.availability ? 'Available' : 'Not Available'}</p>
                  <div className="card-actions justify-end">
                    <button className="btn bg-customBlue" onClick={() => handleRemove(vehicle.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Typography variant="h5" className="text-customBlue flex justify-center items-center" gutterBottom>
              Booking Details
            </Typography>
            <div className="flex flex-col gap-4 max-w-md mx-auto">
              <TextField
                label="Booking Date"
                variant="outlined"
                name="booking_date"
                type="date"
                value={bookingDetails.booking_date}
                onChange={handleBookingDetailsChange}
                InputLabelProps={{ shrink: true }}
                className="bg-customBlueLight rounded"
              />
              <TextField
                label="Return Date"
                variant="outlined"
                name="return_date"
                type="date"
                value={bookingDetails.return_date}
                onChange={handleBookingDetailsChange}
                InputLabelProps={{ shrink: true }}
                className="bg-customBlueLight rounded"
              />
              <Select
                variant="outlined"
                name="location_id"
                value={bookingDetails.location_id}
                onChange={handleBookingDetailsChange}
                className="bg-customBlueLight rounded"
              >
                {locations.map((location: TLocation) => (
                  <MenuItem key={location.id} value={location.id}>
                    {location.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="flex justify-center mt-4">
              <Button variant="contained" className="bg-customBlueDarker" onClick={handleBooking}>
                Proceed to Pay
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
