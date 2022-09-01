import React, { useMemo, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';

import apiData from './api';
import { useFetch } from './hooks/useFetch';

import type { Contact } from './types';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage';
import { PersonInfo } from './components/PersonInfo';

import styles from './App.module.css';

const App = () => {
  const [selected, setSelected] = useState<Contact[]>([]);
  const { data, status, loadMore } = useFetch<Contact>(apiData);

  const contacts = useMemo(
    () => [...new Set([...selected, ...data])],
    [data, selected]
  );

  const onPersonInfoClick = (contact: Contact) => {
    setSelected((prevState) => {
      if (prevState.some((item) => item.id === contact.id)) {
        return prevState.filter((item) => item.id !== contact.id);
      }

      return [...prevState, contact];
    });
  };

  if (status === 'loading' && contacts.length === 0) {
    return (
      <div className={styles.center}>
        <Loader />
      </div>
    );
  }

  return (
    <main className={styles.app}>
      <section className={styles.selected}>
        Selected contacts: {selected.length}
      </section>

      <section>
        <Virtuoso
          className={styles.list}
          data={contacts}
          itemContent={(_index, personInfo) => (
            <PersonInfo
              data={personInfo}
              selected={selected.some((item) => item.id === personInfo.id)}
              onClick={() => onPersonInfoClick(personInfo)}
            />
          )}
        />

        <div className={styles.bottom}>
          {status === 'loading' && (
            <div className={styles.center}>
              <Loader size='small' />
            </div>
          )}

          {status === 'error' && (
            <ErrorMessage>
              <p>
                <span>Something went wrong, </span>
                <span onClick={loadMore} className={styles['try-again']}>
                  click to try again
                </span>
              </p>
            </ErrorMessage>
          )}

          {status === 'success' && (
            <button onClick={loadMore} className={styles.more}>
              Load more
            </button>
          )}
        </div>
      </section>
    </main>
  );
};

export default App;
