import styles from './LoginPage.module.css';
import { MdEmail } from 'react-icons/md';
import { AiFillLock } from 'react-icons/ai';
import { userSchema } from './user_validation';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/authOperations';
import { useAuth } from 'hooks/useAuth';
import { StyledLink } from './LoginPage.styled';

export default function LoginForm() {
  const { error } = useAuth();
  const dispatch = useDispatch();

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
        dispatch(
          logIn({
            email: values.email,
            password: values.password,
          })
        );
        resetForm();
      }}
    >
      {formik => (
        <Form>
          <div className={styles.form_wrapper}>
            <div className={styles.title_wrapper}>
              <img
                className={styles.wallet_img}
                src={require('../RegistrationPage/images/icon.png')}
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
                  className={styles.invalid_feedback}
                />
              </div>
              <button className={styles.register_btn} type="submit">
                Log in
              </button>
            </div>
            <StyledLink to="/registration">Register</StyledLink>
            {error && <p>{error}</p>}
          </div>
        </Form>
      )}
    </Formik>
  );
}
