import styles from './RegistrationPage.module.css';
import RegForm from './RegForm';
import Loader from 'components/Loader/Loader';
import { useSelector } from 'react-redux';
import { Suspense } from 'react';
import { selectIsloadingLogin } from 'redux/auth/authSelectors';

const RegistrationPage = () => {
  const isLoading = useSelector(selectIsloadingLogin)
  return (
    <div className={styles.registration_page}>
      <div className="container">
        <h1 className={styles.title}>Finance App</h1>
        <RegForm />
        <Suspense fallback={<Loader />}></Suspense>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default RegistrationPage;
