import React, { useState } from 'react';
import { Card, CardContent, CircularProgress, Typography, TextField } from '@mui/material';
import { vehiclesApi } from '../../../features/Vehicles/VehicleApi';
import { TVehicle } from '../../../Types/types';

const Cars: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { data: vehicles, error, isLoading: isFetching } = vehiclesApi.useGetVehiclesQuery();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredVehicles = vehicles?.filter((vehicle) =>
    vehicle.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.year.toString().includes(searchTerm) ||
    vehicle.fuel_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.seating_capacity.toString().includes(searchTerm) ||
    vehicle.features.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <Typography variant="h4" className='text-customBlue' gutterBottom>Explore our Speedy Cars</Typography>
      <TextField
        label="Search by model, year, rental_price, availability and fuel_type"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        className=" bg-white"
      />

      {isFetching ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">Error fetching vehicles</Typography>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVehicles?.map((vehicle: TVehicle) => (
              <Card key={vehicle.id}>
                <CardContent>
                  <Typography variant="h6">{vehicle.manufacturer} {vehicle.model}</Typography>
                  <Typography>Year: {vehicle.year}</Typography>
                  <Typography>Fuel Type: {vehicle.fuel_type}</Typography>
                  <Typography>Seating Capacity: {vehicle.seating_capacity}</Typography>
                  <Typography>Features: {vehicle.features}</Typography>
                  <Typography>Rental price: ${vehicle.rental_price}</Typography>
                  <Typography>Availability: {vehicle.availability ? 'Available' : 'Not Available'}</Typography>
                  <img src={vehicle.image_url} alt={`${vehicle.manufacturer} ${vehicle.model}`} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cars;
