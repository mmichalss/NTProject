import React, { useCallback } from 'react';
import { useApi } from './api/ApiProvider';
import { ClientResponse } from './api/library-client';

export default function useGetRole() {
  const apiClient = useApi();
  const [role, setRole] = React.useState<string>();

  const fetchRole = useCallback(async () => {
    try {
      const response: string = await apiClient.getUserRole();
      if (response) {
        setRole(response);
      } else {
        setRole('');
      }
    } catch (error) {
      console.log(error);
    }
  }, [apiClient]);
  React.useEffect(() => {
    fetchRole();
  }, [fetchRole]);

  return { role, fetchRole };
}
