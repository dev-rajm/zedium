import axios from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';

export const useFetch = (endpoint: string, key: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${BACKEND_URL}/api/v1/${endpoint}`);
      setData(res.data[key]);
      setLoading(false);
    };

    fetchData();
  }, [endpoint, key]);

  return { loading, data };
};
