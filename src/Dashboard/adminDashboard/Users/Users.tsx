import React from 'react';
import { Card, CardContent, Typography,Button } from '@mui/material';
import { usersApi } from '../../../features/Users/usersApi';
import {toast} from 'react-toastify';
import { TUsers } from '../../../Types/types';
 
 
 
 
const ManageUsers: React.FC = () => {
  const {data: usersData = [], refetch} = usersApi.useGetUsersQuery();
  const [deleteUser] = usersApi.useDeleteUserMutation();
 console.log(usersData)
 
const handleDeleteUser = async (user_id: number) => {
  try {
    await deleteUser(user_id).unwrap();
    refetch();
    toast.success('User deleted successfully');
  } catch (error) {
    console.error("Failed to delete user:", error);
    toast.error('Failed to delete user');
  }
}
  return (
    <div className="p-4">
      <Typography variant="h4" className='text-yellow-500' gutterBottom> Users List</Typography>
      <Card>
        <CardContent>
          {/* <Typography variant="h6">User List</Typography> */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {usersData.map((user: TUsers) => (
              <Card key={user.id} className="flex flex-col">
                <CardContent>  
                <Typography variant="h6" className="text-customBlueDarker">{user.full_name}</Typography>
                  <Typography variant="body2" className="text-customBlueDarkest">{user.email}</Typography>
                  <Typography variant="body2" className="text-customBlueDarkest">{user.contact_phone}</Typography>
                  <Typography variant="body2" className="text-customBlueDarkest">{user.address}</Typography>
                  {/* <Typography variant="body2" className="text-gray-700">{user.role}</Typography> */}
                  <div className="flex justify-between mt-4">
                    <Button variant='contained'  className='bg-red-500' onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
 
export default ManageUsers;