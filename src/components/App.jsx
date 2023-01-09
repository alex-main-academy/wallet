import { Routes, Route } from 'react-router-dom';
import DashboardPage from 'pages/DashboardPage/DashboardPage';
import LoginPage from 'pages/LoginPage/LoginPage';
import RegistrationPage from 'pages/RegistrationPage/RegistrationPage';
import HomeTab from './HomeTab/HomeTab';
import DiagramTab from './DiagramTab/DiagramTab';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="dashboard" element={<DashboardPage />}>
          <Route index element={<HomeTab />} />
          <Route path="statistics" element={<DiagramTab />} />
        </Route>
        <Route path="*" element={<>Error... this page is not found</>} />
      </Routes>
    </>
  );
};
