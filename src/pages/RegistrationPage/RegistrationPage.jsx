import styles from './RegistrationPage.module.css';

import { MdEmail } from 'react-icons/md';
import { AiFillLock } from 'react-icons/ai';
import { BsPersonFill } from 'react-icons/bs';

const RegistrationPage = () => {
  return (
    <div className={styles.registration_page}>
      <div className="container">
        <h1 className={styles.title}>Finance App</h1>
        <div className={styles.form_wrapper}>
          <div className={styles.title_wrapper}>
            <img
              className={styles.wallet_img}
              src={require('./images/icon.png')}
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
            <div className={styles.input_wrapper}>
              <AiFillLock className={styles.ico} />
              <input
                placeholder="Confirm password"
                className={styles.input}
                type="password"
              />
            </div>
            <div className={styles.input_wrapper}>
              <BsPersonFill className={styles.ico} />
              <input
                placeholder="First name "
                className={styles.input}
                type="text"
              />
            </div>
            <button className={styles.register_btn}>Register</button>
          </form>
          <button className={styles.login_btn}>Log in</button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
