import { GetLoansReturnedPagesDto } from '../../api/dto/loan/loan.dto';
import { useState, useCallback } from 'react';
import { useApi } from '../../api/ApiProvider';
const useLoansReturned = () => {
  const [data, setData] = useState<GetLoansReturnedPagesDto | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const apiClient = useApi();

  const fetchLoans = useCallback(
    async (page: number, rowsPerPage: number) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.getAllLoansReturnedUsers(
          page,
          rowsPerPage,
        );
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch loans');
      } finally {
        setLoading(false);
      }
    },
    [apiClient],
  );

  return { data, fetchLoans, loading, error };
};

export default useLoansReturned;
