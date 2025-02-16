import React, { useState } from 'react';
import './vehicles.css'
import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  CircularProgress,
  Modal,
  Box,
  CardMedia
} from '@mui/material';
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

  const [editFormData, setEditFormData] = useState<FormDataState>(formData);
  const [editVehicleId, setEditVehicleId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [createVehicle, { isLoading: isCreating }] = vehiclesApi.useAddVehicleMutation();
  const { data: vehicles, isLoading: isFetching, refetch } = vehiclesApi.useGetVehiclesQuery();
  const [deleteVehicle] = vehiclesApi.useDeleteVehicleMutation();
  const [updateVehicle] = vehiclesApi.useUpdateVehicleMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    isEdit = false
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    if (type === 'file' && files) {
      isEdit
        ? setEditFormData({ ...editFormData, [name]: files[0] })
        : setFormData({ ...formData, [name]: files[0] });
    } else if (type === 'checkbox') {
      isEdit
        ? setEditFormData({
            ...editFormData,
            [name]: (e.target as HTMLInputElement).checked,
          })
        : setFormData({
            ...formData,
            [name]: (e.target as HTMLInputElement).checked,
          });
    } else {
      isEdit
        ? setEditFormData({ ...editFormData, [name]: value })
        : setFormData({ ...formData, [name]: value });
    }
  };

  const handleDelete = async (vehicle_id: number) => {
    try {
      await deleteVehicle(vehicle_id).unwrap();
      refetch();
      toast.success('Vehicle deleted successfully');
    } catch (error) {
      console.error('Failed to delete vehicle:', error);
      toast.error('Failed to delete vehicle');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let imageUrl = '';
      if (formData.image) {
        const formDataImage = new FormData();
        formDataImage.append('file', formData.image);
        formDataImage.append('upload_preset', 'carent');

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

      await createVehicle(vehicleData).unwrap();
      refetch();
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
      toast.success('Vehicle added successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to add vehicle');
    }
  };

  const handleEdit = async (id: number) => {
    if (!vehicles) {
      toast.error('Failed to fetch vehicles');
      return;
    }

    const vehicleToUpdate = vehicles.find((vehicle) => vehicle.id === id);

    if (vehicleToUpdate) {
      setEditVehicleId(id);
      setEditFormData({
        rental_price: vehicleToUpdate.rental_price,
        availability: vehicleToUpdate.availability,
        image: null,
        manufacturer: vehicleToUpdate.manufacturer,
        model: vehicleToUpdate.model,
        year: vehicleToUpdate.year,
        fuel_type: vehicleToUpdate.fuel_type,
        seating_capacity: vehicleToUpdate.seating_capacity,
        features: vehicleToUpdate.features,
      });
      setIsModalOpen(true);
    } else {
      toast.error('Vehicle not found');
    }
  };

  const handleUpdate = async () => {
    if (!editVehicleId || !vehicles) return;

    const vehicleToUpdate = vehicles.find(
      (vehicle) => vehicle.id === editVehicleId
    );

    if (vehicleToUpdate) {
      try {
        let imageUrl = vehicleToUpdate.image_url;

        if (editFormData.image) {
          const formDataImage = new FormData();
          formDataImage.append('file', editFormData.image);
          formDataImage.append('upload_preset', 'carent');

          const response = await axios.post(
            'https://api.cloudinary.com/v1_1/dg9mim6xj/image/upload',
            formDataImage
          );

          if (response.status === 200) {
            imageUrl = response.data.secure_url;
          } else {
            console.error('Failed to upload image:', response.statusText);
            toast.error('Failed to upload image');
            return;
          }
        }

        const updatedVehicleData: TVehicle = {
          id: editVehicleId,
          rental_price: editFormData.rental_price,
          availability: editFormData.availability,
          image_url: imageUrl,
          manufacturer: editFormData.manufacturer,
          model: editFormData.model,
          year: editFormData.year,
          fuel_type: editFormData.fuel_type,
          seating_capacity: editFormData.seating_capacity,
          features: editFormData.features,
        };

        await updateVehicle({
          id: editVehicleId,
          updatedVehicle: updatedVehicleData,
        }).unwrap();
        refetch();
        toast.success('Vehicle updated successfully');
        setIsModalOpen(false);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error:', error.message);
          toast.error('Failed to update vehicle');
        } else {
          console.error('Unexpected error:', error);
          toast.error('An unexpected error occurred');
        }
      }
    } else {
      toast.error('Vehicle not found');
    }
  };

  return (
    <div className="p-4">
      <Typography variant="h4" className="text-customBlue" gutterBottom>
        Manage Vehicles
      </Typography>

      <Card className="mb-4">
        <CardContent>
          <Typography variant="h6" className="text-customBlueDarker">
            Add New Vehicle
          </Typography>
          <form
            className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
            onSubmit={handleSubmit}
          >
            <TextField
              label="Manufacturer"
              variant="outlined"
              className="text-customBlueDarker"
              fullWidth
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
            />
            <TextField
              label="Model"
              variant="outlined"
              className="text-customBlueDarker"
              fullWidth
              name="model"
              value={formData.model}
              onChange={handleChange}
            />
            <TextField
              label="Year"
              variant="outlined"
              className="text-customBlueDarker"
              fullWidth
              type="number"
              name="year"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: parseInt(e.target.value) })
              }
            />
            <TextField
              label="Fuel Type"
              variant="outlined"
              className="text-customBlueDarker"
              fullWidth
              name="fuel_type"
              value={formData.fuel_type}
              onChange={handleChange}
            />
            <TextField
              label="Seating Capacity"
              variant="outlined"
              className="text-customBlueDarker"
              fullWidth
              type="number"
              name="seating_capacity"
              value={formData.seating_capacity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  seating_capacity: parseInt(e.target.value),
                })
              }
            />
            <TextField
              label="Rental Price"
              variant="outlined"
              className="text-customBlueDarker"
              fullWidth
              type="number"
              name="rental_price"
              value={formData.rental_price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rental_price: parseFloat(e.target.value),
                })
              }
            />
            <TextField
              label="Features"
              variant="outlined"
              className="text-customBlueDarker"
              fullWidth
              name="features"
              value={formData.features}
              onChange={handleChange}
              multiline
              rows={4}
            />
            <div>
              <label className="block text-customBlueDarker mb-2">Availability</label>
              <input
                type="checkbox"
                name="availability"
                checked={formData.availability}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    availability: e.target.checked,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-customBlueDarker mb-2">Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="text-white bg-customBlue"
              disabled={isCreating}
            >
              {isCreating ? <CircularProgress size={24} /> : 'Add Vehicle'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Typography variant="h6" className="text-customBlue text-2xl p-2">
        Existing Vehicles
      </Typography>
      {isFetching ? (
        <CircularProgress />
      ) : (
        vehicles?.map((vehicle) => (
          <Card key={vehicle.id} className="mb-4 max-w-xl bg-customBlueDarkest flex flex-col ">
            <CardContent className='bg-customBlueDarker'>
              {/* <div className="flex flex-col  "> */}
                <CardMedia
                  component="img"
                  image={vehicle.image_url}
                  alt={`${vehicle.manufacturer} ${vehicle.model}`}
                  className="w-24 h-28  "
                />
                <div className="flex-1 ">
                  <Typography variant="h6" className="text-customBlue">
                    {vehicle.manufacturer} {vehicle.model}
                  </Typography>
                  <Typography variant="body1"  className="text-customBlueLight">
                    Year: {vehicle.year}, Fuel Type: {vehicle.fuel_type}
                  </Typography>
                  <Typography variant="body1" className="text-customBlueLight">
                    Rental Price: ${vehicle.rental_price}
                  </Typography>
                  <Typography variant="body1" className="text-customBlueLight">
                    Seating Capacity: {vehicle.seating_capacity}
                  </Typography>
                  <Typography variant="body1" className="text-customBlueLight">
                    Features: {vehicle.features}
                  </Typography>
                  <div className="mt-2 space-x-3">
                    <Button
                      variant="contained"
                      color='error'
                      onClick={() => handleDelete(vehicle.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color='primary'
                      onClick={() => handleEdit(vehicle.id)}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              {/* </div> */}
            </CardContent>
          </Card>
        ))
      )}

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box className="p-4 bg-customBlueDarkest">
          <Typography variant="h6" className="text-customBlueDarker">
            Edit Vehicle
          </Typography>
          <form className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
            <TextField
              label="Manufacturer"
              variant="outlined"
              fullWidth
              name="manufacturer"
              value={editFormData.manufacturer}
              onChange={(e) => handleChange(e, true)}
            />
            <TextField
              label="Model"
              variant="outlined"
              fullWidth
              name="model"
              value={editFormData.model}
              onChange={(e) => handleChange(e, true)}
            />
            <TextField
              label="Year"
              variant="outlined"
              fullWidth
              type="number"
              name="year"
              value={editFormData.year}
              onChange={(e) => setEditFormData({ ...editFormData, year: parseInt(e.target.value) })}
            />
            <TextField
              label="Fuel Type"
              variant="outlined"
              fullWidth
              name="fuel_type"
              value={editFormData.fuel_type}
              onChange={(e) => handleChange(e, true)}
            />
            <TextField
              label="Seating Capacity"
              variant="outlined"
              fullWidth
              type="number"
              name="seating_capacity"
              value={editFormData.seating_capacity}
              onChange={(e) => setEditFormData({ ...editFormData, seating_capacity: parseInt(e.target.value) })}
            />
            <TextField
              label="Rental Price"
              variant="outlined"
              fullWidth
              type="number"
              name="rental_price"
              value={editFormData.rental_price}
              onChange={(e) => setEditFormData({ ...editFormData, rental_price: parseFloat(e.target.value) })}
            />
            <TextField
              label="Features"
              variant="outlined"
              fullWidth
              name="features"
              value={editFormData.features}
              onChange={(e) => handleChange(e, true)}
              multiline
              rows={4}
            />
            <div>
              <label className="block text-customBlueDarker mb-2">Availability</label>
              <input
                type="checkbox"
                name="availability"
                checked={editFormData.availability}
                onChange={(e) => setEditFormData({ ...editFormData, availability: e.target.checked })}
              />
            </div>
            <div>
              <label className="block text-customBlueDarker mb-2">Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => handleChange(e, true)}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              onClick={handleUpdate}
              disabled={isCreating}
            >
              {isCreating ? <CircularProgress size={24} /> : 'Update Vehicle'}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default CarForm;
