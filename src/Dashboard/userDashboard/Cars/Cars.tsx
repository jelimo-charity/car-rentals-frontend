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
              <div
                key={vehicle.id}
                className="card card-compact bg-customBlueDarker shadow-xl w-full mb-6 relative overflow-hidden group"
                onClick={() => handleRentNow(vehicle)}
              >
                <figure className="h-40 overflow-hidden">
                  <img
                    src={vehicle.image_url}
                    alt={`${vehicle.manufacturer} ${vehicle.model}`}
                    className="object-cover h-full w-full"
                  />
                </figure>
                <div className="card-body text-white relative z-10">
                  <h2 className="card-title text-xl font-bold text-customBlueLight">{vehicle.manufacturer} {vehicle.model} ({vehicle.year})</h2>
                  <div className="availability-price flex justify-between mt-2">
                    <p className="text-lg font-bold text-green-500">
                      {vehicle.availability ? 'Available' : 'Not Available'}
                    </p>
                    <p className="text-lg font-bold text-yellow-500">
                      ${vehicle.rental_price}/hour
                    </p>
                  </div>
                  <div className="card-actions mt-4">
                    <button className="btn bg-customBlueDarker">Click to Rent Now</button>
                  </div>
                </div>
                <div className="card-hover-details absolute inset-x-0 bottom-0 bg-customBlueDarker bg-opacity-90 p-4 hidden group-hover:block">
                  <p className="mb-2">Features: <span className="text-yellow-500">{vehicle.features}</span></p>
                  <p className="mb-2">Fuel Type: <span className="text-yellow-500">{vehicle.fuel_type}</span></p>
                  <p>Seating Capacity: <span className="text-yellow-500">{vehicle.seating_capacity}</span></p>
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
