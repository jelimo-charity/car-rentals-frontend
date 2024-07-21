import React, { useState } from 'react';
import { CircularProgress, Typography, TextField, Button } from '@mui/material';
import { vehiclesApi } from '../../../features/Vehicles/VehicleApi';
import { TVehicle } from '../../../Types/types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../features/Cart/cartSlice';

const Cars: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState({
    manufacturer: '',
    model: '',
    year: '',
    fuel_type: '',
    seating_capacity: '',
    features: '',
  });

  const { data: vehicles, error, isLoading: isFetching } = vehiclesApi.useGetVehiclesQuery();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleRentNow = (vehicle: TVehicle) => {
    dispatch(addToCart(vehicle));
    navigate(`/parentcomponent/${vehicle.id}`);
  };

  const handleReset = () => {
    setSearchTerm('');
    setFilters({
      manufacturer: '',
      model: '',
      year: '',
      fuel_type: '',
      seating_capacity: '',
      features: '',
    });
  };

  const filteredVehicles = vehicles?.filter((vehicle) =>
    vehicle.manufacturer.toLowerCase().includes(filters.manufacturer.toLowerCase()) &&
    vehicle.model.toLowerCase().includes(filters.model.toLowerCase()) &&
    vehicle.year.toString().includes(filters.year) &&
    vehicle.fuel_type.toLowerCase().includes(filters.fuel_type.toLowerCase()) &&
    vehicle.seating_capacity.toString().includes(filters.seating_capacity) &&
    vehicle.features.toLowerCase().includes(filters.features.toLowerCase())
  );

  return (
    <div className="p-4 bg-customBlueDarkest">
      <Typography variant="h4" className="text-customBlue flex justify-center items-center" gutterBottom>
        Explore our Speedy Cars
      </Typography>
     
      <div className="mb-10 p-4 bg-customBlueDark rounded-lg mx-auto max-w-4xl">
        <div className="flex flex-wrap gap-4 justify-center">
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            className="bg-customBlueLight rounded"
            style={{ flex: '1 1 200px' }}
          />
          <TextField
            label="Manufacturer"
            variant="outlined"
            name="manufacturer"
            value={filters.manufacturer}
            onChange={handleFilterChange}
            className="bg-customBlueLight rounded"
            style={{ flex: '1 1 200px' }}
          />
          <TextField
            label="Model"
            variant="outlined"
            name="model"
            value={filters.model}
            onChange={handleFilterChange}
            className="bg-customBlueLight rounded"
            style={{ flex: '1 1 200px' }}
          />
          <TextField
            label="Year"
            variant="outlined"
            name="year"
            value={filters.year}
            onChange={handleFilterChange}
            className="bg-customBlueLight rounded"
            style={{ flex: '1 1 200px' }}
          />
          <TextField
            label="Fuel Type"
            variant="outlined"
            name="fuel_type"
            value={filters.fuel_type}
            onChange={handleFilterChange}
            className="bg-customBlueLight rounded"
            style={{ flex: '1 1 200px' }}
          />
          <TextField
            label="Seating Capacity"
            variant="outlined"
            name="seating_capacity"
            value={filters.seating_capacity}
            onChange={handleFilterChange}
            className="bg-customBlueLight rounded"
            style={{ flex: '1 1 200px' }}
          />
          <TextField
            label="Features"
            variant="outlined"
            name="features"
            value={filters.features}
            onChange={handleFilterChange}
            className="bg-customBlueLight rounded"
            style={{ flex: '1 1 200px' }}
          />
        </div>
        <div className="flex justify-center mt-4">
          <Button variant="contained" className="bg-customBlueDarker" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>

      {isFetching ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">Error fetching vehicles</Typography>
      ) : (
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles?.map((vehicle: TVehicle) => (
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
                    <button className="btn bg-customBlue" onClick={() => handleRentNow(vehicle)}>Rent Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cars;
