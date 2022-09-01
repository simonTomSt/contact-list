import React, { useState } from 'react';

import apiData from './api';
import { PersonInfo } from './components/PersonInfo';
import { useFetch } from './hooks/useFetch';

import type { Contact } from './types';

function App() {
  const [selected, setSelected] = useState<Contact[]>([]);
  const { data, status, loadMore } = useFetch<Contact>(apiData);

  return (
    <div className='App'>
      <div className='selected'>Selected contacts: {selected.length}</div>
      <div className='list'>
        {data.map((personInfo) => (
          <PersonInfo
            key={personInfo.id}
            data={personInfo}
            selected={selected.some((item) => item.id === personInfo.id)}
            onClick={() => setSelected(selected)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
