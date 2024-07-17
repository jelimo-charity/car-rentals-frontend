import React, { useState } from 'react';
import { Typography, Card, CardContent, TextField, Button, CircularProgress } from '@mui/material';
import { vehiclesApi } from '../../../features/Vehicles/VehicleApi';
import axios from 'axios';
import { TVehicle } from '../../../Types/types';
import { toast } from 'react-toastify';

interface FormDataState {
  rental_price: number;
  availability: boolean;
  image: File | null;
  manufacturer: string;
  model: string;
  year: number;
  fuel_type: string;
  seating_capacity: number;
  features: string;
}

const CarForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDataState>({
    rental_price: 0,
    availability: true,
    image: null,
    manufacturer: '',
    model: '',
    year: 0,
    fuel_type: '',
    seating_capacity: 0,
    features: '',
  });

  const [createVehicle, { isLoading: isCreating, isError: isCreateError, isSuccess: isCreateSuccess }] = vehiclesApi.useAddVehicleMutation();
  const { data: vehicles, error, isLoading: isFetching, refetch } = vehiclesApi.useGetVehiclesQuery();
  const [deleteVehicle] = vehiclesApi.useDeleteVehicleMutation();
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    if (type === 'file' && files) {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleDelete = async (user_id: number) => {
    try {
      await deleteVehicle(user_id).unwrap();
      refetch();
      toast.success('Vehicle deleted successfully');
    } catch (error) {
      console.error("Failed to delete vehicle:", error);
      toast.error('Failed to delete vehicle');
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let imageUrl = '';
      if (formData.image) {
        const formDataImage = new FormData();
        formDataImage.append('file', formData.image);
        formDataImage.append('upload_preset', 'carent'); // the upload preset 

        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dg9mim6xj/image/upload',
          formDataImage
        );

        imageUrl = response.data.secure_url;
      }

      const vehicleData = {
        rental_price: formData.rental_price,
        availability: formData.availability,
        image_url: imageUrl,
        manufacturer: formData.manufacturer,
        model: formData.model,
        year: formData.year,
        fuel_type: formData.fuel_type,
        seating_capacity: formData.seating_capacity,
        features: formData.features,
      };

      await createVehicle(vehicleData);

      setFormData({
        rental_price: 0,
        availability: true,
        image: null,
        manufacturer: '',
        model: '',
        year: 0,
        fuel_type: '',
        seating_capacity: 0,
        features: '',
      });

    } catch (error) {
      console.error('Error:', error);
    }
  };

 
  const handleEdit = (vehicle: TVehicle) => {
    // Implement edit logic here
    // For example:
    // console.log('Editing vehicle:', vehicle);
    console.log(`Editing vehicle: ${vehicle.manufacturer} ${vehicle.model}`);
  };

  return (
    <div className="p-4">
      <Typography variant="h4" className='text-customBlue' gutterBottom>Manage Vehicles</Typography>
      <Card className="mb-4">
        <CardContent>
          <Typography variant="h6" className='text-customBlueDarker'>Add New Vehicle</Typography>
          <form className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <TextField
              label="Manufacturer"
              variant="outlined"
              className='text-customBlueDarker'
              fullWidth
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
            />
            <TextField
              label="availability"
              variant="outlined"
              className='text-customBlueDarker'
              fullWidth
              name="model"
              value={formData.availability}
              onChange={handleChange}
            />
            <TextField
              label="Model"
              variant="outlined"
              className='text-customBlueDarker'
              fullWidth
              name="model"
              value={formData.model}
              onChange={handleChange}
            />
            <TextField
              label="Year"
              variant="outlined"
              className='text-customBlueDarker'
              fullWidth
              type="number"
              name="year"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
            />
            <TextField
              label="Fuel Type"
              variant="outlined"
              className='text-customBlueDarker'
              fullWidth
              name="fuel_type"
              value={formData.fuel_type}
              onChange={handleChange}
            />
            <TextField
              label="Seating Capacity"
              variant="outlined"
              className='text-customBlueDarker'
              fullWidth
              type="number"
              name="seating_capacity"
              value={formData.seating_capacity}
              onChange={(e) => setFormData({ ...formData, seating_capacity: parseInt(e.target.value) })}
            />
            <TextField
              label="Features"
              variant="outlined"
              className='text-customBlueDarker'
              fullWidth
              name="features"
              value={formData.features}
              onChange={handleChange}
            />
            <TextField
              label="Rental price"
              variant="outlined"
              className='text-customBlueDarker'
              fullWidth
              type="number"
              name="rental_price"
              value={formData.rental_price}
              onChange={(e) => setFormData({ ...formData, rental_price: parseInt(e.target.value) })}
            />
            <TextField
              variant="outlined"
              className='text-customBlueDarker'
              fullWidth
              name="image"
              type="file"
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" className="sm:col-span-2" disabled={isCreating}>
              {isCreating ? 'Adding...' : 'Add Vehicle'}
            </Button>
            {isCreateError && <Typography color="error">Error adding vehicle</Typography>}
            {isCreateSuccess && <Typography color="primary">Vehicle added successfully</Typography>}
          </form>
        </CardContent>
      </Card>

      {isFetching ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">Error fetching vehicles</Typography>
      ) : (
        <div>
          <Typography variant="h5" className='text-customBlueDarker' gutterBottom>Existing Vehicles</Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {vehicles?.map((vehicle: TVehicle) => (
              <Card key={vehicle.id}>
                <CardContent>
                  <Typography variant="h6">{vehicle.manufacturer} {vehicle.model}</Typography>
                  <Typography>Year: {vehicle.year}</Typography>
                  <Typography>Fuel Type: {vehicle.fuel_type}</Typography>
                  <Typography>Seating Capacity: {vehicle.seating_capacity}</Typography>
                  <Typography>Features: {vehicle.features}</Typography>
                  <Typography>Rental Rate: ${vehicle.rental_price}</Typography>
                  <Typography>Availability: {vehicle.availability }</Typography>
                  <img src={vehicle.image_url} alt={`${vehicle.manufacturer} ${vehicle.model}`} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
                  <div style={{ marginTop: '10px' }}>
                    <Button variant="contained" color="primary" onClick={() => handleEdit(vehicle)} style={{ marginRight: '10px' }}>Edit</Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(vehicle.id)}>Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarForm;
