import React, { useState } from 'react';
import styles from './RegistrationPage.module.css';
import { MdEmail } from 'react-icons/md';
import { AiFillLock } from 'react-icons/ai';
import { BsPersonFill } from 'react-icons/bs';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { userSchema } from './user_validation';
import { Formik, Field, Form, ErrorMessage } from 'formik';

export default function RegForm() {
  const handleChange = ({ target }) => {
    if (target.name === 'password') {
      setPassword(target.value);
    }
  };
  const [password, setPassword] = useState('');
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirm_password: '',
        name: '',
      }}
      validationSchema={userSchema}
      onSubmit={(values, { resetForm }) => {
        console.log(values);
        resetForm();
      }}
    >
      {formik => (
        <Form onChange={handleChange}>
          <div className={styles.form_wrapper}>
            <div className={styles.title_wrapper}>
              <img
                className={styles.wallet_img}
                src={require('./images/icon.png')}
                alt="wallet"
              />
              <h2 className={styles.form_title}>Wallet</h2>
            </div>

            <div className={styles.form}>
              <div className={styles.input_wrapper}>
                <MdEmail className={styles.ico} />
                <Field
                  name="email"
                  placeholder="E-mail"
                  className={styles.input}
                  type="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.invalid_feedback}
                />
              </div>
              <div className={styles.input_wrapper}>
                <AiFillLock className={styles.ico} />
                <Field
                  name="password"
                  placeholder="Password"
                  className={styles.input}
                  type="password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.invalid_feedback_password}
                />

                <PasswordStrengthMeter password={password} />
              </div>
              <div className={styles.input_wrapper}>
                <AiFillLock className={styles.ico} />
                <Field
                  name="confirm_password"
                  placeholder="Confirm password"
                  className={styles.input}
                  type="password"
                />
                <ErrorMessage
                  name="confirm_password"
                  component="div"
                  className={styles.invalid_feedback}
                />
              </div>
              <div className={styles.input_wrapper}>
                <BsPersonFill className={styles.ico} />
                <Field
                  name="name"
                  placeholder="First name "
                  className={styles.input}
                  type="text"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={styles.invalid_feedback}
                />
              </div>
              <button className={styles.register_btn} type="submit">
                Register
              </button>
            </div>
            <button className={styles.login_btn} type="button">
              Log in
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
