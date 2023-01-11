import { Outlet } from 'react-router-dom';
import Balance from 'components/Balance/Balance';
import Header from 'components/Header/Header';
import Navigation from 'components/Navigation/Navigation';
import css from './DashboardPage.module.css';
import ButtonAddTransactions from 'components/ButtonAddTransactions/ButtonAddTransactions';

const DashboardPage = () => {
  return (
    <section className={css.dashboard}>
      <Header />
      <div className="container">
        <Navigation />
        <Balance />
        <ButtonAddTransactions />
        <Outlet />
      </div>
    </section>
  );
};

export default DashboardPage;
