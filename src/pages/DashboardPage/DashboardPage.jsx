import Header from 'components/Header/Header';
import Navigation from 'components/Navigation/Navigation';
import { Outlet } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Navigation />
        <Outlet />
      </div>
    </>
  );
};

export default DashboardPage;
