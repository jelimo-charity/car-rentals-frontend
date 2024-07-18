// Cart.tsx
import React from 'react';
import { Typography, Button } from '@mui/material';
import { TVehicle } from '../../../Types/types';

interface CartProps {
  vehicles: TVehicle[];
  onRemove: (vehicleId: number) => void;
}

const Cart: React.FC<CartProps> = ({ vehicles, onRemove }) => {
  return (
    <div className="p-4 bg-customBlueDarkest">
      <Typography variant="h4" className="text-customBlue flex justify-center items-center " gutterBottom>
        Your Cart
      </Typography>
      <div>
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="card card-compact bg-customBlueDarker shadow-xl w-80">
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
                <Button className="btn bg-red-500" onClick={() => onRemove(vehicle.id)}>Remove</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
