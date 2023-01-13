import styles from './LoginPage.module.css';
import LoginForm from './LoginForm';
import Loader from 'components/Loader/Loader';
import { useSelector } from 'react-redux';
import { Suspense } from 'react';
import { selectIsloadingLogin } from 'redux/auth/authSelectors';
import LanguageToggler from 'components/LanguageToggler/LanguageToggler';

const LoginPage = () => {
  const isLoading = useSelector(selectIsloadingLogin);
  return (
    <div className={styles.registration_page}>
      <LanguageToggler />
      <div className="container">
        <h1 className={styles.title}>Finance App</h1>
        <LoginForm />
        <Suspense fallback={<Loader />}></Suspense>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default LoginPage;
