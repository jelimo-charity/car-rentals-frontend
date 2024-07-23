import React, { useState} from 'react';
import {  useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import {ClipLoader} from 'react-spinners'
import { bookingApi } from '../../../features/Booking/bookingApi';
import {loadStripe} from '@stripe/stripe-js'
import { locationApi } from '../../../features/locations/locationsAPi';
import { paymentsApi } from '../../../features/payments/paymentsAPI';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { TVehicle, TLocation } from '../../../Types/types';



const stripePromise = loadStripe(
  'pk_test_51PaQJMRoBeFmDhXSoPF0uTiMjmGk1aWwd34vuSiU4dAE4p0sXiNhGEAjSlJkf2pjSiL2bxAnY9SZ1jMj8vHZEmJA00wrWpQ56O'
)
interface bookForm {
  vehicle: TVehicle
}
const Cart: React.FC <bookForm>= ({vehicle}) => {


  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user.id)
  const [addBooking, {isLoading:isLoadingBooking}] = bookingApi.useAddbookingMutation()
  const {data:locations} = locationApi.useGetLocationsQuery()
  const [createPayment] = paymentsApi.useAddPaymentMutation()
  
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [locationId, setLocationId] = useState<number | undefined>(undefined);
  const [isPaymentLoading, setIsPaymentLoading] = useState<number | null>(null);
 
  const handleBooking = async () => {
    if (!startDate || !endDate || !locationId || !user || !vehicle) {
      toast.error('Please fill in all fields.');
      return;
    }

    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const rentalDays = end.diff(start, 'day');

    if (rentalDays <= 0) {
      toast.error('End date must be after start date');
      return;
    }

    const totalAmount = rentalDays * vehicle.rental_price;

    const bookingData = {
      
      user_id: user.id,
      vehicle_id: vehicle.id,
      location_id: locationId,
      booking_date: startDate,
      return_date: endDate,
      total_amount: totalAmount,
    };
   
    console.log("Booking Data:", bookingData);

    try {
      const newBooking = await addBooking(bookingData).unwrap();
      toast.success('Booking created successfully');
      
      // Initiate payment
      console.log(newBooking.id)
      handleMakePayment(newBooking.id, totalAmount);
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Error creating booking');
    }
  };

  const handleMakePayment = async (bookingId: number, amount: number) => {
    if (!bookingId) {
      console.error('Booking ID is missing');
      toast.error('Booking ID is missing');
      return;
    }
    setIsPaymentLoading(bookingId);
    try {
      const res = await createPayment({ booking_id: bookingId, total_amount: amount }).unwrap();
      toast.success('Payment initiated successfully');
      console.log('Payment response:', res);
      if (res.url) {
        window.location.href = res.url;  // Redirect to the Stripe checkout URL
      } else {
        const stripe = await stripePromise;
        if (stripe && res.transaction_id) {
          const { error } = await stripe.redirectToCheckout({ sessionId: res.transaction_id });
          if (error) {
            console.error('Error redirecting to checkout:', error);
            toast.error('Error redirecting to checkout');
          }else{
            //update booking status
            // await updateStatus({id: bookingId, status: 'Completed'}).unwrap(); 
          }
        }
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error('Error initiating payment');

      // await updateStatus({id: bookingId, status: 'Cancelled'}).unwrap();
    } finally {
      setIsPaymentLoading(null);
    }
  };

  return (
    <>
     
    <div className="p-4 ml-80 mt-10  bg-customBlueDarker max-w-xl rounded-lg shadow-md">
      <h2 className="text-2xl text-customBlueLight text-center font-semibold mb-4">Book {vehicle.manufacturer} {vehicle.model}</h2>
      <h2 className="text-2xl text-yellow-500 text-center font-semibold mb-4"> ${vehicle.rental_price}/hour </h2>
      <figure className="h-40 overflow-hidden">
                  <img
                    src={vehicle.image_url}
                    alt={`${vehicle.manufacturer} ${vehicle.model}`}
                    className="object-cover h-full w-full"
                  />
                </figure>
      <div className="mb-4">
        <label className="block text-customBlue  text-sm font-bold mb-2">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-customBlueDarkest bg-customBlueLight leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-customBlue text-sm font-bold mb-2">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-customBlueDarkest bg-customBlueLight leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-customBlue text text-sm font-bold mb-2">Location</label>
        <select
          value={locationId}
          onChange={(e) => setLocationId(Number(e.target.value))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-customBlueDarkest bg-customBlueLight leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select a location</option>
          {locations?.map((location: TLocation) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </div>
      {/* <div className="mb-4">
        <label className="block text-customBlue text text-sm font-bold mb-2">Vehicle</label>
        <div className="shadow appearance-none border rounded w-full py-2 px-3 text-yellow-500 leading-tight focus:outline-none focus:shadow-outline">
          {vehicle.manufacturer} {vehicle.model}
        </div>
      </div> */}
      {/* <div className="mb-4">
        <label className="block text-customBlue text text-sm font-bold mb-2">Rental Rate</label>
        <div className="shadow appearance-none border rounded w-full py-2 px-3 text-yellow-500 leading-tight focus:outline-none focus:shadow-outline">
          ${vehicle.rental_price} per day
        </div>
      </div> */}
      <button
        onClick={handleBooking}
        className="bg-customBlue hover:bg-blue-700 text-customBlueDarkest font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        disabled={isLoadingBooking || isPaymentLoading !== null}
      >
        {isLoadingBooking || isPaymentLoading !== null ? (
          <div className='flex items-center'>
            <ClipLoader size={24} color="white" />
            <span> Processing...</span>
          </div>
        ) : (
          "Book Now"
        )}
      </button>
    </div>
  </>
  );
};

export default Cart;
