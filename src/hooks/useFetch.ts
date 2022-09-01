import { useCallback, useEffect, useState } from 'react';

type Status = 'success' | 'error' | 'loading';

export const useFetch = <T>(callback: () => Promise<Array<T>>) => {
  const [data, setData] = useState<Array<T>>([]);
  const [status, setStatus] = useState<Status>('loading');

  const fetchData = useCallback(async () => {
    try {
      const response = await callback();

      setData((prevState) => [...prevState, ...response]);
      setStatus('success');
    } catch (e) {
      console.log(e);
      setStatus('error');
    }
  }, [callback, setStatus]);

  const loadMore = () => {
    setStatus('loading');
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, status, loadMore };
};
