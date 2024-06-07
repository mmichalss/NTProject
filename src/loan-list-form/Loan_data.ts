import { useCallback } from 'react';
import { useApi } from '../api/ApiProvider';
import { ClientResponse } from '../api/library-client';
import React from 'react';
import { GetLoanDto, GetLoanPagesDto } from '../api/dto/loan/loan.dto';

export default function useLoans() {
  const apiClient = useApi();
  const [loans, setLoans] = React.useState<GetLoanDto[] | undefined>();

  const fetchLoans = useCallback(async () => {
    try {
      const response: ClientResponse<GetLoanPagesDto[] | undefined> =
        await apiClient.getAllLoans();
      if (response.success) {
        const result: GetLoanDto[] = [];
        for (const loans of response.data || []) {
          for (const loan of loans.loans) {
            result.push(
              new GetLoanDto(
                loan.id,
                loan.book.title,
                loan.book.author,
                loan.loanDate,
                loan.dueDate,
              ),
            );
          }
        }
        setLoans(result);
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
