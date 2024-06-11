import { useCallback } from 'react';
import { useApi } from '../api/ApiProvider';
import { CreateLoanDto } from '../api/dto/loan/loan.dto';

export default function CreateLoan(data: CreateLoanDto) {
  const apiClient = useApi();

  const submit = useCallback(
    (data: CreateLoanDto, formik: any) => {
      apiClient.createLoan(data).then((response) => {
        if (response.success) {
          // snack bar or smth
        } else {
          // snack bar or smth
        }
      });
    },
    [apiClient],
  );
}
