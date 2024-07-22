import React, { useEffect, useState } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TVehicle } from '../Types/types';
import { vehiclesApi } from '../features/Vehicles/VehicleApi';
import { addToCart } from '../features/Cart/cartSlice';

const FeaturedCars: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [featuredVehicles, setFeaturedVehicles] = useState<TVehicle[]>([]);

  const { data: vehicles, error, isLoading: isFetching } = vehiclesApi.useGetVehiclesQuery();

  useEffect(() => {
    if (vehicles && vehicles.length > 0) {
      setFeaturedVehicles(vehicles.slice(0, 3));
    }
  }, [vehicles]);

  const handleRentNow = (vehicle: TVehicle) => {
    dispatch(addToCart(vehicle));
    navigate(`/parentcomponent/${vehicle.id}`);
  };

  return (
    <div className="p-4 bg-customBlueDarkest">
      <Typography variant="h4" className="text-customBlue flex justify-center items-center" gutterBottom>
        Featured Cars
      </Typography>

      {isFetching ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">Error fetching vehicles</Typography>
      ) : (
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVehicles.map((vehicle: TVehicle) => (
              <div key={vehicle.id} className="card card-compact bg-customBlueDarker shadow-xl w-full mb-6 relative overflow-hidden group" onClick={() => handleRentNow(vehicle)}>
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
                    <button className="btn bg-customBlueDarker ml-0">Click to Rent Now</button>
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

export default FeaturedCars;
