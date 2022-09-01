import React from 'react';
import styles from './ErrorMessage.module.css';

type Props = {
  children: JSX.Element;
};

export const ErrorMessage = ({ children }: Props) => {
  return <div className={styles.error}>{children}</div>;
};
