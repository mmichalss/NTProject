import { useState, useCallback } from 'react';
import axios from 'axios';
import { GetLoanPagesDto } from '../api/dto/loan/loan.dto';
import { useApi } from '../api/ApiProvider';

const useLoans = () => {
  const [data, setData] = useState<GetLoanPagesDto | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const apiClient = useApi();

  const fetchLoans = useCallback(
    async (page: number, rowsPerPage: number) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.getAllLoansUsers(page, rowsPerPage);
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

export default useLoans;
