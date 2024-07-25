import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ticketApi } from '../../features/Ticket/ticketAPI';
import { RootState } from '../../app/store';
import './TicketForm.css'; // Import the CSS file for custom styles
import { CircularProgress } from '@mui/material';
import contactsvg from '../../assets/contact.svg';

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
  const user_id = user ? user.id : null;

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
    <div className="background-container flex justify-center items-center h-screen">
      <div className="card max-w-4xl shadow-2xl bg-white flex flex-row items-center p-6 rounded-lg">
        <figure className="w-1/2 p-4">
          <img src={contactsvg} alt="Contact Us" className="w-full h-auto rounded-lg shadow-lg" />
        </figure>
        <div className="card-body w-1/2 p-6 bg-customBlueDarker rounded">
          <h2 className="card-title text-3xl font-bold mb-4 text-customBlueLight">Contact Us</h2>
          <form className="form-control" onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label text-lg text-customBlue">
                <span className="label-text text-xl text-customBlue">Subject</span>
              </label>
              <input
                type="text"
                name="subject"
                className="input bg-customBlueLight text-customBlueDarkest input-bordered p-2 rounded-lg border-gray-300"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control mb-4">
              <label className="label text-lg text-customBlue">
                <span className="label-text text-xl text-customBlue">Description</span>
              </label>
              <textarea
                name="description"
                className="textarea bg-customBlueLight text-customBlueDarkest textarea-bordered p-2 rounded-lg border-gray-300"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-customBlue text-customBlueDarkest w-full p-3 text-lg rounded-lg" type="submit" disabled={isCreating}>
                {isCreating ? <CircularProgress size={24} /> : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicketForm;
