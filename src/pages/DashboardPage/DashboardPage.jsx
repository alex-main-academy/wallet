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
import { Currency } from 'components/Currency/Currency';
const DashboardPage = () => {
  const isLoading = useSelector(selectIsLoading);
  return (
    <section className={css.dashboard}>
      <div className={css.dashboard__wrapper}>
        <Header />
        <div className="container">
          <div className={css.dashboard__content}>
            <div className={css.dashboard__nav}>
              <Navigation />
              <Balance />
              <Currency />
              <ButtonAddTransactions />
              <Suspense fallback={<Loader />}></Suspense>
            </div>
            <div className={css.dashboard__tab}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Loader />}
    </section>
  );
};

export default DashboardPage;
