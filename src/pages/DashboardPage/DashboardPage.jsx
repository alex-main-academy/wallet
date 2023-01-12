import { Outlet } from 'react-router-dom';
import Balance from 'components/Balance/Balance';
import Header from 'components/Header/Header';
import Navigation from 'components/Navigation/Navigation';
import css from './DashboardPage.module.css';
import ButtonAddTransactions from 'components/ButtonAddTransactions/ButtonAddTransactions';
import Loader from 'components/Loader/Loader';
import { useSelector } from 'react-redux';
import { Suspense } from 'react';
import { selectIsLoading } from 'redux/transactions/transactionsSelectors';

const DashboardPage = () => {
  const isLoading = useSelector(selectIsLoading)
  return (
    <section className={css.dashboard}>
      <Header />
      <div className="container">
        <Navigation />
        <Balance />
        <ButtonAddTransactions />
        <Suspense fallback={<Loader />}></Suspense>
        <Outlet />
      </div>
      {isLoading && <Loader />}
    </section>
  );
};

export default DashboardPage;
