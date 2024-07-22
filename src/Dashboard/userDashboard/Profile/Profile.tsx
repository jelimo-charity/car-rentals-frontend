import React, { useEffect, useState } from 'react';
import { TUsers } from '../../../Types/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { usersApi } from '../../../features/Users/usersApi';
import { toast } from 'react-toastify';



const Profile: React.FC = () => {

  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user ? user.id : null;

  const { data: userData, error: userError, isLoading: isUserLoading } = usersApi.useGetUserQuery(userId);
  const [updateUser] = usersApi.useUpdateUserMutation();

  const [email, setEmail] = useState(user?.email || '');
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [contactPhone, setContactPhone] = useState(user?.contact_phone || '');
  const [address, setAddress] = useState(user?.address || '');

  useEffect(() => {
      if (userData) {
          setEmail(userData.email);
          setFullName(userData.full_name);
          setContactPhone(userData.contact_phone);
          setAddress(userData.address);
      }
  }, [userData]);

const handleSave = async(e: React.FormEvent) => {
  e.preventDefault();
  const updatedUser: Partial<TUsers> = {
    email,
    full_name: fullName,
    contact_phone: contactPhone,
    address,
};

try {
    if (userId) {
        await updateUser({ id: userId, ...updatedUser }).unwrap();
        toast.success('User updated successfully!');
    } else {
        toast.error('User ID is missing.');
    }
} catch (error) {
    console.error('Failed to update user:', error);
    toast.error('Failed to update user.');
}

}

  if (isUserLoading) return <div>Loading...</div>;
  if (userError) return <div>Error loading user data</div>

  
  return (
    <div className="p-4 bg-customBlueDarker rounded-lg shadow-md">
    <h2 className="text-3xl text-customBlueLight font-semibold mb-4">User Profile</h2>
    <form onSubmit={handleSave} className="space-y-4 b">
        <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-customBlue">
                Full Name
            </label>
            <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 p-2 block w-full border text-customBlueDarkest border-customBlueDarkest bg-customBlueLight rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        </div>
        <div>
            <label htmlFor="email" className="block text-sm font-medium  text-customBlue">
                Email
            </label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 block w-full border text-customBlueDarkest border-customBlueDarkest bg-customBlueLight  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        </div>
        <div>
            <label htmlFor="contactPhone" className="block text-sm font-medium  text-customBlue">
                Contact Phone
            </label>
            <input
                type="text"
                id="contactPhone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="mt-1 p-2 block w-full border text-customBlueDarkest border-customBlueDarkest bg-customBlueLight rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        </div>
        <div>
            <label htmlFor="address" className="block text-customBlue text-sm font-medium  ">
                Address
            </label>
            <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 p-2 block w-full border text-customBlueDarkest border-customBlueDarkest bg-customBlueLight rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        </div>
        <div>
           
           
          
        </div>
        <div className="text-right">
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Save
            </button>
        </div>
    </form>
</div>
  );
};

export default Profile;
