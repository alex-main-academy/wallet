import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './LanguageToggler.module.css';
import { setLanguage } from 'redux/translation/translationSlice';
import { translationSelector } from 'redux/translation/translationSelectors';

export default function LanguageToggler() {
  const language = useSelector(translationSelector);
  const dispatch = useDispatch();
  const values = [
    { id: '1', text: 'EN' },
    {
      id: '2',
      text: 'UA',
    },
  ];

  return (
    <div className={styles.wrapper}>
      {values.map(item => (
        <button
          key={item.id}
          onClick={() => {
            dispatch(setLanguage(item.id));
          }}
          className={styles.btn}
          style={{ color: language === item.id && '#24cca7' }}
        >
          {item.text}
        </button>
      ))}
    </div>
  );
}
