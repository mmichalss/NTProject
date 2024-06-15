import { useCallback, useEffect, useMemo, useState } from 'react';
import { useApi } from '../../api/ApiProvider';
import { CreateLoanDto } from '../../api/dto/loan/loan.dto';
import { GetUserDto } from '../../api/dto/user/user.dto';
import React from 'react';
import { Button } from '@mui/material';
import { Formik } from 'formik';
import useGetMe from '../../users_page/getMe';
import { Navigate, useNavigate } from 'react-router-dom';

export default function CreateLoan({
  selected,
  userId,
}: {
  selected: readonly number[];
  userId: number | undefined;
}) {
  const apiClient = useApi();
  const userRole = apiClient.getUserRole();
  const navigate = useNavigate();

  const loanData = useMemo(() => {
    return selected.map((bookId) => {
      const loan = new CreateLoanDto();
      if (userId === undefined) {
        console.log('User id not passed');
      }
      loan.userId = userId;
      loan.bookId = bookId;
      const today = new Date();
      const thirtyDaysFromNow = new Date(
        today.getTime() + 30 * 24 * 60 * 60 * 1000,
      );
      const formattedDate = new Date(
        thirtyDaysFromNow.getTime() -
          thirtyDaysFromNow.getTimezoneOffset() * 60000,
      )
        .toISOString()
        .split('T')[0];
      loan.dueDate = formattedDate;
      console.log(loan.dueDate);
      return loan;
    });
  }, [userId, selected]);

  const handleSubmit = useCallback(
    (loans: CreateLoanDto[]) => {
      if (userId === undefined) {
        navigate('/login');
        return;
      }
      loans.forEach((loan) => {
        apiClient.createLoan(loan);
      });
    },
    [apiClient, navigate, userId],
  );

  return (
    <Formik onSubmit={handleSubmit} initialValues={loanData}>
      {(formik: any) => (
        <form
          id="create-loan"
          className="Create-loan"
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <Button variant="outlined" type="submit" disabled={!userId}>
            Borrow Selected
          </Button>
        </form>
      )}
    </Formik>
  );
}
