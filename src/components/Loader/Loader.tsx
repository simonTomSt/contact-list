import React from 'react';

import styles from './Loader.module.css';

type Props = {
  size?: 'large' | 'small';
};

export const Loader = ({ size = 'large' }: Props) => (
  <div className={`${styles.loader} ${styles[size]}`} />
);
