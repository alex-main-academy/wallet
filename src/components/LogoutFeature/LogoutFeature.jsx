import styles from './LogoutFeature.module.css';
import React from 'react';
import { logOut } from 'redux/auth/authOperations';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import exitIcon from './images/exit-icon.png';

export default function LogoutFeature() {
  const dispatch = useDispatch(logOut);
  const [modalShown, setModalShown] = useState(false);

  const handleClick = () => {
    setModalShown(true);
  };
  return (
    <>
      <button onClick={handleClick} className={styles.logout_btn} type="button">
        <img src={exitIcon} alt="icon" />
        <span className={styles.btn_text}>Exit</span>
      </button>
      {modalShown && (
        <div className={styles.backdrop}>
          <div className={styles.modal}>
            <p>Do you really want to exit?</p>

            <button
              onClick={() => setModalShown(false)}
              className={styles.modal_btn}
              style={{
                marginBottom: 15,
                marginTop: 10,
                border: ' 1px solid #4a56e2',
                color: '#4a56e2',
              }}
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                dispatch(logOut());
                setModalShown(false);
              }}
              style={{ backgroundColor: '#24cca7', color: '#fff' }}
              className={styles.modal_btn}
              type="button"
            >
              Exit
            </button>
          </div>
        </div>
      )}
    </>
  );
}
