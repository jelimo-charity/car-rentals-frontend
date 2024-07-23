




const CreateTicketForm: React.FC = () => {



  return (
    <div className="p-4">
      {/* <Typography variant="h4" gutterBottom>Manage Locations</Typography>
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
              <Card key={location.id} className="mb-4">
                <CardContent>
                  <Typography variant="h6">{location.name}</Typography>
                  <Typography>Address: {location.address}</Typography>
                  <Typography>Contact Phone: {location.contact_phone}</Typography>
                  <Button variant="contained" color="primary" className="mr-2" onClick={() => handleEdit(location.id!)}>Edit</Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(location.id!)}>Delete</Button>
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
      </Modal> */}
    </div>
  );
};

export default CreateTicketForm;
