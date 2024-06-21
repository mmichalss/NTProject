import React from 'react';
import './App.css';
import LoginForm from './login-form/LoginForm';
import HomePage from './home-page/HomePage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import BookPage from './book-page/BookPage';
import LoanPage from './loan-page/LoanPage';
import ApiProvider, { useApi } from './api/ApiProvider';
import UsersPage from './users_page/usersPage';
import LogoutPage from './login-form/LogoutPage';
import GlobalHomePage from './home-page/GlobalHomePage';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import BookPageAdmin from './book-page-admin/BookPageAdmin';
import LoanAdminPage from './users_page/loan-page-admin/LoanAdminPage';
import LoanHistoryPage from './loan-page/loan-history-page/LoanHistoryPage';
import UserProfilePage from './profile-page/UserProfilePage';
import AccessDeniedPage from './errors_and_snackbars/AccessDeniedPage';

function App() {
  const apiClient = useApi();
  const role = apiClient.getUserRole();
  const readerAndAdmin = role === 'ROLE_READER' || role === 'ROLE_ADMIN';
  const adminOnly = role === 'ROLE_ADMIN';
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <ApiProvider>
          <Routes>
            <Route path="/home" element={<GlobalHomePage />}>
              <Route path="" element={<HomePage />} />
              <Route path="books" element={<BookPage />} />
              <Route path="logout" element={<LogoutPage />} />
              <Route
                path="profile"
                element={
                  readerAndAdmin ? <UserProfilePage /> : <AccessDeniedPage />
                }
              />
              <Route
                path="loans"
                element={readerAndAdmin ? <LoanPage /> : <AccessDeniedPage />}
              />
              <Route
                path="loans_history"
                element={
                  readerAndAdmin ? <LoanHistoryPage /> : <AccessDeniedPage />
                }
              />
              <Route
                path="users"
                element={adminOnly ? <UsersPage /> : <AccessDeniedPage />}
              />
              <Route
                path="users/loans/:userId"
                element={adminOnly ? <LoanAdminPage /> : <AccessDeniedPage />}
              />
              <Route
                path="books/admin"
                element={adminOnly ? <BookPageAdmin /> : <AccessDeniedPage />}
              />
            </Route>
            <Route path="/home/login" element={<LoginForm />} />
            <Route path="/" element={<Navigate to="home" />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </ApiProvider>
      </I18nextProvider>
    </BrowserRouter>
  );
}

export default App;
