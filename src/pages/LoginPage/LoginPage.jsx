import styles from './LoginPage.module.css';

import { MdEmail } from 'react-icons/md';
import { AiFillLock } from 'react-icons/ai';
import ModalAddTransaction from 'components/ModalAddTransaction/ModalAddTransaction';
import ButtonAddTransactions from 'components/ButtonAddTransactions/ButtonAddTransactions';

const LoginPage = () => {
  return (
    <div className={styles.registration_page}>
      <div className="container">
        <h1 className={styles.title}>Finance App</h1>
        <div className={styles.form_wrapper}>
          <div className={styles.title_wrapper}>
            <img
              className={styles.wallet_img}
              src={require('../RegistrationPage/images/icon.png')}
              alt="wallet"
            />
            <h2 className={styles.form_title}>Wallet</h2>
          </div>

          <form className={styles.form}>
            <div className={styles.input_wrapper}>
              <MdEmail className={styles.ico} />
              <input
                placeholder="E-mail"
                className={styles.input}
                type="email"
              />
            </div>
            <div className={styles.input_wrapper}>
              <AiFillLock className={styles.ico} />
              <input
                placeholder="Password"
                className={styles.input}
                type="password"
              />
            </div>

            <button className={styles.register_btn}>Log in</button>
          </form>
          <button className={styles.login_btn}>Register</button>
        </div>
      </div>
<ModalAddTransaction/>
<ButtonAddTransactions/>
    </div>
  );
};

export default LoginPage;
