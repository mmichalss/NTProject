import React from 'react';
import './App.css';
import LoginForm from './login-form/Login-form';
import HomePage from './home-page/Home-page';
import { Navigate, Route, Routes } from 'react-router-dom';
import BookPage from './book-page/Book-page';
import LoanPage from './loan-page/Loan-page';

function App() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />}>
        <Route path="books" element={<BookPage />} />
        <Route path="loans" element={<LoanPage />} />
      </Route>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;
