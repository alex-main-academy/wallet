import styles from './LoginPage.module.css';
import { MdEmail } from 'react-icons/md';
import { AiFillLock } from 'react-icons/ai';
import { userSchema } from './user_validation';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from 'redux/auth/authOperations';
import { useAuth } from 'hooks/useAuth';
import { StyledLink } from './LoginPage.styled';
import translation from '../../assets/translation/register.json';
import { translationSelector } from 'redux/translation/translationSelectors';

export default function LoginForm() {
  const language = useSelector(translationSelector);
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
              <h2 className={styles.form_title}>
                {translation[language].form_title}
              </h2>
            </div>

            <div className={styles.form}>
              <div className={styles.input_wrapper}>
                <MdEmail className={styles.ico} />
                <Field
                  name="email"
                  placeholder={translation[language].email}
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
                  placeholder={translation[language].password}
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
                {translation[language].login}
              </button>
            </div>
            <StyledLink to="/registration">
              {translation[language].register}
            </StyledLink>
            {error && <p>{error}</p>}
          </div>
        </Form>
      )}
    </Formik>
  );
}
