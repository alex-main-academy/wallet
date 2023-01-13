import { Routes, Route } from 'react-router-dom';
import DashboardPage from 'pages/DashboardPage/DashboardPage';
import LoginPage from 'pages/LoginPage/LoginPage';
import RegistrationPage from 'pages/RegistrationPage/RegistrationPage';
import HomeTab from './HomeTab/HomeTab';
import DiagramTab from './DiagramTab/DiagramTab';
import Currency from './Currency/Currency';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refreshUser } from 'redux/auth/authOperations';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

export const App = () => {
  const dispatch = useDispatch();
  //для відображення потім шо сторінка загружається

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute restricted>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="registration"
          element={
            <PublicRoute restricted>
              <RegistrationPage />
            </PublicRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        >
          <Route index element={<HomeTab />} />
          <Route path="statistics" element={<DiagramTab />} />
          <Route path="currency" element={<Currency />} />
        </Route>
        <Route path="*" element={<>Error... this page is not found</>} />
      </Routes>
    </>
  );
};
