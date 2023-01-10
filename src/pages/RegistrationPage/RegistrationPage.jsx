import styles from './RegistrationPage.module.css';
import { MdEmail } from 'react-icons/md';
import { AiFillLock } from 'react-icons/ai';
import { BsPersonFill } from 'react-icons/bs';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { useState } from 'react';
import { userSchema } from './user_validation';

const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = {
      email,
      password,
      confirm_password,
      name,
    };

    const isValid = await userSchema.isValid(formData);

    if (isValid) {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setName('');
    }
  };
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

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.input_wrapper}>
              <MdEmail className={styles.ico} />
              <input
                placeholder="E-mail"
                className={styles.input}
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.input_wrapper}>
              <AiFillLock className={styles.ico} />
              <input
                placeholder="Password"
                className={styles.input}
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <PasswordStrengthMeter password={password} />
            </div>
            <div className={styles.input_wrapper}>
              <AiFillLock className={styles.ico} />
              <input
                placeholder="Confirm password"
                className={styles.input}
                type="password"
                value={confirm_password}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className={styles.input_wrapper}>
              <BsPersonFill className={styles.ico} />
              <input
                placeholder="First name "
                className={styles.input}
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
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
