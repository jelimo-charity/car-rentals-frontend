import React, { useState } from 'react';
import { Typography, Card, CardContent, TextField, Button, CircularProgress, Modal, Box } from '@mui/material';
import { toast } from 'react-toastify';
import { locationApi } from '../../../features/locations/locationsAPi';
import { TLocation } from '../../../Types/types';

interface FormDataState {
  name: string;
  address: string;
  contact_phone: string;
}

const LocationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    address: '',
    contact_phone: '',
  });

  const [editFormData, setEditFormData] = useState<FormDataState>(formData);
  const [editLocationId, setEditLocationId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [createLocation, { isLoading: isCreating }] = locationApi.useAddLocationMutation();
  const { data: locations, error, isLoading: isFetching, refetch } = locationApi.useGetLocationsQuery();
  const [deleteLocation] = locationApi.useDeleteLocationMutation();
  const [updateLocation] = locationApi.useUpdateLocationMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, isEdit = false) => {
    const { name, value } = e.target;
    isEdit
      ? setEditFormData({ ...editFormData, [name]: value })
      : setFormData({ ...formData, [name]: value });
  };

  const handleDelete = async (locationId: number) => {
    try {
      await deleteLocation(locationId).unwrap();
      refetch();
      toast.success('Location deleted successfully');
    } catch (error) {
      console.error('Failed to delete location:', error);
      toast.error('Failed to delete location');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createLocation(formData).unwrap();
      refetch();
      setFormData({
        name: '',
        address: '',
        contact_phone: '',
      });
      toast.success('Location added successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to add location');
    }
  };

  const handleEdit = async (id: number) => {
    if (!locations) {
      toast.error('Failed to fetch locations');
      return;
    }

    const locationToUpdate = locations.find((location: TLocation) => location.id === id);

    if (locationToUpdate) {
      setEditLocationId(id);
      setEditFormData({
        name: locationToUpdate.name,
        address: locationToUpdate.address,
        contact_phone: locationToUpdate.contact_phone,
      });
      setIsModalOpen(true);
    } else {
      toast.error('Location not found');
    }
  };

  const handleUpdate = async () => {
    if (!editLocationId) return;

    try {
      const updatedLocationData = {
        id: editLocationId,
        ...editFormData,
      };

      await updateLocation({ id: editLocationId, updatedLocation: updatedLocationData }).unwrap();
      refetch();
      toast.success('Location updated successfully');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update location');
    }
  };

  return (
    <div className="p-4">
      <Typography variant="h4" className='text-customBlue' gutterBottom>Manage Locations</Typography>
      <Card className="mb-4">
        <CardContent>
          <Typography variant="h6">Add New Location</Typography>
          <form className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              value={formData.name}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              name="address"
              value={formData.address}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              label="Contact Phone"
              variant="outlined"
              fullWidth
              name="contact_phone"
              value={formData.contact_phone}
              onChange={(e) => handleChange(e)}
            />
            <Button
              variant="contained"
              className="mt-4 sm:col-span-2"
              type="submit"
              disabled={isCreating}
            >
              {isCreating ? <CircularProgress size={24} /> : 'Add Location'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isFetching ? (
        <CircularProgress />
      ) : error ? (
        <div>Error loading locations</div>
      ) : (
        locations && (
          <div>
            {locations.map((location: TLocation) => (
              <Card key={location.id} className="mb-4  bg-customBlueDarkest">
                <CardContent className='bg-customBlueDarkest border-b border-b-customBlue  w-200'>
                  <Typography variant="h6" className='text-customBlue'>{location.name}</Typography>
                  <Typography className='text-customBlueLight'>Address: {location.address}</Typography>
                  <Typography className='text-customBlueLight'>Contact Phone: {location.contact_phone}</Typography>
                 <div className='space-x-2 mt-3'>
                 <Button variant="contained" color="primary" className="mr-2" onClick={() => handleEdit(location.id!)}>Edit</Button>
                 <Button variant="contained" color="error"  onClick={() => handleDelete(location.id!)}>Delete</Button>
                 </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      )}

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box className="p-4 bg-white">
          <Typography variant="h6">Edit Location</Typography>
          <form className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              value={editFormData.name}
              onChange={(e) => handleChange(e, true)}
            />
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              name="address"
              value={editFormData.address}
              onChange={(e) => handleChange(e, true)}
            />
            <TextField
              label="Contact Phone"
              variant="outlined"
              fullWidth
              name="contact_phone"
              value={editFormData.contact_phone}
              onChange={(e) => handleChange(e, true)}
            />
            <Button
              variant="contained"
              className="mt-4 sm:col-span-2"
              type="submit"
            >
              Update Location
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default LocationForm;
