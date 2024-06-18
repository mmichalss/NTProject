import { useCallback } from 'react';
import { useApi } from '../api/ApiProvider';
import React from 'react';
import {
  GetLoanDto,
  GetLoanPagesDto,
  GetWholeLoanDto,
} from '../api/dto/loan/loan.dto';
import { ClientResponse } from '../api/library-client';

export default function useLoans() {
  const apiClient = useApi();
  const [loans, setLoans] = React.useState<GetLoanDto[] | undefined>();

  const fetchLoans = useCallback(async () => {
    try {
      const response: ClientResponse<GetLoanPagesDto | undefined> =
        await apiClient.getAllLoans();
      if (response.success) {
        const loans: GetWholeLoanDto[] = response.data!!.loans;
        setLoans(
          loans.map(
            ({ id, book, loanDate, dueDate }) =>
              new GetLoanDto(
                id,
                book.title,
                book.author,
                new Date(loanDate).toISOString().split('T')[0],
                new Date(dueDate).toISOString().split('T')[0],
              ),
          ),
        );
      } else {
        console.log(response.status);
      }
    } catch (error) {
      //console.log(error);
    }
  }, [apiClient]);

  React.useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  return loans;
}
