import React from 'react';
import { useParams } from 'react-router-dom';
import Cart from './Cart';
import { vehiclesApi } from '../../../features/Vehicles/VehicleApi';

const ParentComponent: React.FC = () => {
    const { vehicleId } = useParams<{ vehicleId: string }>();
  const parsedVehicleId = vehicleId ? parseInt(vehicleId, 10) : NaN;

  if (isNaN(parsedVehicleId)) {
    console.error('Invalid vehicle ID:', vehicleId);
    return <div>Invalid vehicle ID</div>;
  }
  const { data: vehicle, isLoading, error } = vehiclesApi.useGetVehicleQuery(Number(parsedVehicleId));
console.log(vehicle)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading vehicle data</div>;
  }

  return (
    <div className='bg-customBlueDarkest pb-10 pt-10'>
      {vehicle ? (
        <Cart vehicle={vehicle} />
      ) : (
        <div>No vehicle found</div>
      )}
    </div>
  );
};

export default ParentComponent;
