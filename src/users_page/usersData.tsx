import { useCallback } from 'react';
import { useApi } from '../api/ApiProvider';
import { GetUserDto } from '../api/dto/user/user.dto';
import { ClientResponse } from '../api/library-client';
import React from 'react';

export default function useUsersData() {
  const apiClient = useApi();
  const [users, setUsers] = React.useState<GetUserDto[] | undefined>();

  const fetchUsers = useCallback(async () => {
    try {
      const response: ClientResponse<GetUserDto[] | undefined> =
        await apiClient.getAllUsers();
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [apiClient]);

  React.useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, fetchUsers };
}
