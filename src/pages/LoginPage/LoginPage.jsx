import styles from './LoginPage.module.css';
import LoginForm from './LoginForm';
import ButtonAddTransactions from 'components/ButtonAddTransactions/ButtonAddTransactions';

const LoginPage = () => {
  return (
    <div className={styles.registration_page}>
      <div className="container">
        <h1 className={styles.title}>Finance App</h1>

        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
