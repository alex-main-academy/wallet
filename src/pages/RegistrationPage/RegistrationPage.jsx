import styles from './RegistrationPage.module.css';
import RegForm from './RegForm';

const RegistrationPage = () => {
  return (
    <div className={styles.registration_page}>
      <div className="container">
        <h1 className={styles.title}>Finance App</h1>
        <RegForm />
      </div>
    </div>
  );
};

export default RegistrationPage;
