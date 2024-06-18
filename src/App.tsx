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

function App() {
  return (
    <BrowserRouter>
      <ApiProvider>
        <Routes>
          <Route path="/home" element={<GlobalHomePage />}>
            <Route path="" element={<HomePage />} />
            <Route path="books" element={<BookPage />} />
            <Route path="loans" element={<LoanPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="logout" element={<LogoutPage />} />
          </Route>
          <Route path="/home/login" element={<LoginForm />} />
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </ApiProvider>
    </BrowserRouter>
  );
}

export default App;
