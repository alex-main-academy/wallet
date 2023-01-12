import zxcvbn from 'zxcvbn';
import styles from './RegistrationPage.module.css';

const PasswordStrengthMeter = ({ password }) => {
  const testResult = zxcvbn(password);
  const num = (testResult.score * 100) / 4;

  const changePassword = () => ({
    width: `${num}%`,
  });

  return (
    <>
      <div className={styles.progress}>
        <div className={styles.progress_bar} style={changePassword()}></div>
      </div>
    </>
  );
};

export default PasswordStrengthMeter;
