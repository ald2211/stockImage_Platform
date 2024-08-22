import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/privateRoutes/ProtectedRoute';
import AuthRoute from './components/privateRoutes/AuthRoute';
import ResetPasswordPage from './pages/ResetPasswordPage';

const App = () => {

  return (
    <Routes>
          <Route element={<AuthRoute />}>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
           
            <Route path="/resetPassword" element={<ResetPasswordPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" />} />
        
    </Routes>
  );
};

export default App;
