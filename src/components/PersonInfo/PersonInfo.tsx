import React from 'react';
import type { Contact } from '../../types';

import styles from './PersonInfo.module.css';

type Props = {
  data: Contact;
  selected: boolean;
  onClick: VoidFunction;
};

export const PersonInfo = ({ data, selected, onClick }: Props) => {
  const { firstNameLastName, jobTitle, emailAddress } = data;

  return (
    <article
      className={`${styles.contact} ${
        selected ? styles['contact--selected'] : ''
      }`}
      onClick={onClick}
    >
      <div className={styles.name}>{firstNameLastName}</div>
      <div className={styles.job}>{jobTitle}</div>
      <div className={styles.email}>{emailAddress}</div>
    </article>
  );
};
