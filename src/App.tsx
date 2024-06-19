import React from 'react';
import './App.css';
import LoginForm from './login-form/Login-form';
import HomePage from './home-page/Home-page';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import BookPage from './book-page/Book-page';
import LoanPage from './loan-page/Loan-page';
import ApiProvider from './api/ApiProvider';
import UsersPage from './users_page/users_page';
import LogoutPage from './login-form/Logout-page';
import GlobalHomePage from './home-page/Global-home-page';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import BookPageAdmin from './book-page-admin/Book-page-admin';
import LoanAdminPage from './users_page/loan-page-admin/LoanAdminPage';
import LoanHistoryPage from './loan-page/loan-history-page/LoanHistoryPage';

function App() {
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <ApiProvider>
          <Routes>
            <Route path="/home" element={<GlobalHomePage />}>
              <Route path="" element={<HomePage />} />
              <Route path="books" element={<BookPage />} />
              <Route path="loans" element={<LoanPage />} />
              <Route path="loans_history" element={<LoanHistoryPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="users/loans/:userId" element={<LoanAdminPage />} />
              <Route path="logout" element={<LogoutPage />} />
              <Route path="books/admin" element={<BookPageAdmin />} />
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
