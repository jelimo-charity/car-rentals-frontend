import React, { useState } from 'react';
import { Typography, Card, CardContent, TextField, Button } from '@mui/material';
import { vehiclesApi } from '../../../features/Vehicles/VehicleApi';
import axios from 'axios';

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

  const [createVehicle, { isLoading, isError, isSuccess }] = vehiclesApi.useCreateVehicleMutation();
 

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let imageUrl = '';
      if (formData.image) {
        const formDataImage = new FormData();
        formDataImage.append('file', formData.image);
        formDataImage.append('upload_preset', 'carent'); // Add your upload preset here

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
              label="Rental Rate"
              variant="outlined"
              className='text-customBlueDarker'
              fullWidth
              type="number"
              name="rental_price"
              value={formData.rental_price}
              onChange={(e) => setFormData({ ...formData, rental_price: parseInt(e.target.value) })}
            />
            <TextField
              label="Availability"
              variant="outlined"
              className='text-customBlueDarker'
              fullWidth
              name="availability"
              value={formData.availability}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              className='text-customBlueDarker'
              fullWidth
              name="image"
              type="file"
              // accept="image/*"
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" className="sm:col-span-2" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Vehicle'}
            </Button>
            {isError && <Typography color="error">Error adding vehicle</Typography>}
            {isSuccess && <Typography color="primary">Vehicle added successfully</Typography>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarForm;
