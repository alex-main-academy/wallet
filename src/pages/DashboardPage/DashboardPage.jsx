import Header from 'components/Header/Header';
import { Outlet } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default DashboardPage;
