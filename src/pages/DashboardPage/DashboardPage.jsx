import { Outlet } from 'react-router-dom';
import Balance from 'components/Balance/Balance';
import Header from 'components/Header/Header';
import Navigation from 'components/Navigation/Navigation';
import css from './DashboardPage.module.css';
import Loader from 'components/Loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { Suspense, useEffect } from 'react';
import { selectIsLoading } from 'redux/transactions/transactionsSelectors';
import { Currency } from 'components/Currency/Currency';
import Media from 'react-media';
import { fetchTransactions } from 'redux/transactions/transactionsOperations';
import { fetchTransactionCategories } from 'redux/transactions/transactionsOperations';

const DashboardPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTransactionCategories())
  }, [dispatch])


  const isLoading = useSelector(selectIsLoading);
  return (
    <section className={css.dashboard}>
      <div className={css.dashboard__wrapper}>
        <Header />
        <div className="container">
          <div className={css.dashboard__content}>
            <div className={css.dashboard__nav}>
              <div>
                <Navigation />
                <Balance />
              </div>
              <div className={css.dashboard__currency}>
                <Media query="(min-width:768px)" render={() => <Currency />} />
              </div>
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
