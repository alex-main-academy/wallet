import styles from './RegistrationPage.module.css';
import RegForm from './RegForm';
import Loader from 'components/Loader/Loader';
import { useSelector } from 'react-redux';
import { Suspense } from 'react';
import { selectIsloadingLogin } from 'redux/auth/authSelectors';
import LanguageToggler from 'components/LanguageToggler/LanguageToggler';
import translation from '../../assets/translation/register.json';

const RegistrationPage = () => {
  const isLoading = useSelector(selectIsloadingLogin);
  return (
    <div className={styles.registration_page}>
      <LanguageToggler />
      <div className="container">
        <h1 className={styles.title}>{translation['2'].title}</h1>
        <RegForm />
        <Suspense fallback={<Loader />}></Suspense>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default RegistrationPage;
