import React, { useCallback } from 'react';
import { useApi } from '../api/ApiProvider';
import { GetUserDto } from '../api/dto/user/user.dto';
import { ClientResponse } from '../api/library-client';

export default function useGetMe() {
  const apiClient = useApi();
  const [me, setMe] = React.useState<GetUserDto | undefined>();

  const fetchMe = useCallback(async () => {
    try {
      if (
        apiClient.getUserRole() === 'ROLE_READER' ||
        apiClient.getUserRole() === 'ROLE_ADMIN'
      ) {
        const response: ClientResponse<GetUserDto | undefined> =
          await apiClient.getMe();

        if (response.success) {
          setMe(response.data);
        } else {
          console.log(response.status);
        }
      } else {
        setMe(undefined);
      }
    } catch (error) {
      console.log(error);
    }
  }, [apiClient]);

  React.useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return me;
}
