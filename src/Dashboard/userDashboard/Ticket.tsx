import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Card, CardContent, TextField, Button, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import { ticketApi } from '../../features/Ticket/ticketAPI';
import { RootState } from '../../app/store';

interface TicketFormData {
  subject: string;
  description: string;
}

const TicketForm: React.FC = () => {
  const [formData, setFormData] = useState<TicketFormData>({
    subject: '',
    description: '',
  });

  const user = useSelector((state: RootState) => state.auth.user);
  const user_id = user? user.id : null;
  

  const [addTicket, { isLoading: isCreating }] = ticketApi.useAddTicketMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log('User:', user);
  console.log('User ID:', user_id);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addTicket({
        user_id: user_id,
        subject: formData.subject,
        description: formData.description,
        
      }).unwrap();
      setFormData({
        subject: '',
        description: '',
      });
      toast.success('Ticket created successfully');
    } catch (error) {
      console.error('Failed to create ticket:', error);
      toast.error('Failed to create ticket');
    }
  };

  return (
    <Card className="p-4">
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <form className="mt-4 grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
          <TextField
            label="Subject"
            variant="outlined"
            fullWidth
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <Button
            variant="contained"
            type="submit"
            disabled={isCreating}
          >
            {isCreating ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TicketForm;
