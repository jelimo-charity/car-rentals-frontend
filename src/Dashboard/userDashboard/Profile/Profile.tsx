import React, { useEffect } from 'react';
import { profileApi } from '../../../features/Profile/profileApi';
import { TUsers } from '../../../Types/types';

const Profile: React.FC = () => {
  const { data: userProfile, error, isLoading } = profileApi.useGetUserProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = profileApi.useUpdateUserProfileMutation();

  useEffect(() => {
    // Example: Fetch user profile on component mount
    // This will trigger the GET request defined in useGetUserProfileQuery hook
  }, []);

  const handleUpdateProfile = async (updatedData: Partial<TUsers>) => {
    try {
      await updateProfile(updatedData).unwrap();
      // Handle success, e.g., show success message
    } catch (error) {
      // Handle error, e.g., show error message
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {/* Display profile data */}
      <h2>User Profile</h2>
      {userProfile && (
        <div>
          <p>Name: {userProfile.full_name}</p>
          <p>Email: {userProfile.email}</p>
          <p>Contact_Phone: {userProfile.contact_phone}</p>
          <p>Address: {userProfile.address}</p>



        </div>
      )}

      {/* Example form for updating profile */}
      <form onSubmit={(e) => {
        e.preventDefault();
        handleUpdateProfile({ /* Updated profile data */ });
      }}>
        {/* Form fields for updating profile */}
        <button type="submit" disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
